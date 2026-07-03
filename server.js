/* Static file server + guestbook REST API, backed by a JSON file on disk.
   Kept dependency-free (Node builtins only) so the Docker image stays small. */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, 'data');
const DATA_FILE = path.join(DATA_DIR, 'guestbook.json');
const PORT = process.env.PORT || 80;
const MAX_BODY_BYTES = 20 * 1024;
const MAX_FIELD_LEN = { name: 80, role: 80, message: 2000 };
/* Fixed admin password gating guestbook deletion — enforced here so a
   direct API call can't bypass the client's password prompt. */
const ADMIN_PASSWORD = '1233';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

function ensureDataFile() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');
}

function readEntries() {
  ensureDataFile();
  try {
    var parsed = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

/* Serialize writes so two near-simultaneous requests can't interleave and
   corrupt the file (fs has no atomic read-modify-write for JSON). */
var writeChain = Promise.resolve();
function writeEntries(entries) {
  writeChain = writeChain.then(function () {
    return new Promise(function (resolve, reject) {
      var tmp = DATA_FILE + '.tmp';
      fs.writeFile(tmp, JSON.stringify(entries, null, 2), function (err) {
        if (err) return reject(err);
        fs.rename(tmp, DATA_FILE, function (err2) { err2 ? reject(err2) : resolve(); });
      });
    });
  });
  return writeChain;
}

function sanitize(value, maxLen) {
  return String(value == null ? '' : value).trim().slice(0, maxLen);
}

function sendJSON(res, status, body) {
  if (body == null) { res.writeHead(status); res.end(); return; }
  var data = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(data)
  });
  res.end(data);
}

function readJSONBody(req) {
  return new Promise(function (resolve, reject) {
    var chunks = [];
    var size = 0;
    req.on('data', function (chunk) {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) { reject(new Error('payload too large')); req.destroy(); return; }
      chunks.push(chunk);
    });
    req.on('end', function () {
      if (!chunks.length) return resolve({});
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function serveStatic(req, res, urlPath) {
  var rel = urlPath === '/' ? '/index.html' : urlPath;
  rel = path.normalize(rel).replace(/^([.]{2}[/\\])+/, '');
  var full = path.join(ROOT, rel);
  if (!full.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.readFile(full, function (err, data) {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Not found'); return; }
    var ext = path.extname(full).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

async function handleGuestbookList(req, res) {
  var entries = readEntries().sort(function (a, b) {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
  sendJSON(res, 200, entries);
}

async function handleGuestbookCreate(req, res) {
  var body;
  try { body = await readJSONBody(req); } catch (e) { return sendJSON(res, 400, { error: 'bad request' }); }
  var name = sanitize(body.name, MAX_FIELD_LEN.name);
  var role = sanitize(body.role, MAX_FIELD_LEN.role) || 'Visitor';
  var message = sanitize(body.message, MAX_FIELD_LEN.message);
  if (!name || !message) return sendJSON(res, 400, { error: 'name and message are required' });

  var entries = readEntries();
  var entry = { id: crypto.randomUUID(), name: name, role: role, message: message, timestamp: new Date().toISOString() };
  entries.unshift(entry);
  await writeEntries(entries);
  sendJSON(res, 201, entry);
}

async function handleGuestbookUpdate(req, res, id) {
  var body;
  try { body = await readJSONBody(req); } catch (e) { return sendJSON(res, 400, { error: 'bad request' }); }
  var name = sanitize(body.name, MAX_FIELD_LEN.name);
  var role = sanitize(body.role, MAX_FIELD_LEN.role) || 'Visitor';
  var message = sanitize(body.message, MAX_FIELD_LEN.message);
  if (!name || !message) return sendJSON(res, 400, { error: 'name and message are required' });

  var entries = readEntries();
  var idx = entries.findIndex(function (e) { return e.id === id; });
  if (idx === -1) return sendJSON(res, 404, { error: 'not found' });
  entries[idx] = Object.assign({}, entries[idx], { name: name, role: role, message: message });
  await writeEntries(entries);
  sendJSON(res, 200, entries[idx]);
}

async function handleGuestbookDelete(req, res, id) {
  if (req.headers['x-guestbook-password'] !== ADMIN_PASSWORD) {
    return sendJSON(res, 401, { error: 'invalid password' });
  }
  var entries = readEntries();
  var idx = entries.findIndex(function (e) { return e.id === id; });
  if (idx === -1) return sendJSON(res, 404, { error: 'not found' });
  entries.splice(idx, 1);
  await writeEntries(entries);
  sendJSON(res, 204, null);
}

var server = http.createServer(function (req, res) {
  var url = new URL(req.url, 'http://localhost');
  var p = url.pathname;

  function fail500(err) {
    console.error(err);
    sendJSON(res, 500, { error: 'internal error' });
  }

  if (p === '/api/guestbook' && req.method === 'GET') return handleGuestbookList(req, res).catch(fail500);
  if (p === '/api/guestbook' && req.method === 'POST') return handleGuestbookCreate(req, res).catch(fail500);

  var idMatch = p.match(/^\/api\/guestbook\/([^/]+)$/);
  if (idMatch) {
    var id = decodeURIComponent(idMatch[1]);
    if (req.method === 'PUT') return handleGuestbookUpdate(req, res, id).catch(fail500);
    if (req.method === 'DELETE') return handleGuestbookDelete(req, res, id).catch(fail500);
  }

  if (p.startsWith('/api/')) return sendJSON(res, 404, { error: 'not found' });

  if (req.method === 'GET' || req.method === 'HEAD') return serveStatic(req, res, p);

  sendJSON(res, 405, { error: 'method not allowed' });
});

server.listen(PORT, function () {
  console.log('ipseforma-portfolio listening on port ' + PORT + ' (data: ' + DATA_FILE + ')');
});
