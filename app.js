/* Jinwoo Jeon — Portfolio: i18n, guestbook, scroll-reveal motion */
(function () {
  'use strict';

  /* ---------- i18n ---------- */
  var T = {
    en: {
      navAbout: 'About', navCareer: 'Career', navProjects: 'Projects', navSkills: 'Skills', navGuestbook: 'Guestbook',
      badge: 'OPEN TO OPPORTUNITIES',
      heroHead: 'Forecasting the energy of tomorrow.',
      heroSub1: 'M.S. student', heroSub2: 'researching AI for the renewable energy transition.',
      scroll: 'SCROLL ↓',
      sec1: '01 — ABOUT & VISION', sec2: '02 — CAREER JOURNEY', sec3: '03 — PROJECTS', sec4: '04 — SKILL ARCHITECTURE', sec5: '05 — GUESTBOOK',
      aboutHead: 'Advancing the renewable energy transition with reliable AI.',
      aboutBody: 'Renewables make the grid clean but unpredictable. My research makes it predictable again — with models that respect the privacy of the homes they learn from. Trained in renewable energy engineering, seasoned in industry AI, now researching at the Graduate School of Data Science, Kyungpook National University.',
      r1t: 'Energy with AI', r1d: 'Load & generation forecasting for the grid',
      r2t: 'Time-series Forecasting', r2d: 'Sequence models for demand & net-load',
      r3t: 'Federated Learning', r3d: 'Training on data that never leaves home',
      r4t: 'Knowledge Graph', r4d: 'GNNs & GraphRAG over structured knowledge',
      careerHead: 'Grounded in energy engineering, advancing toward energy intelligence.',
      c1date: '2025.03 — PRESENT', c1t: 'M.S. in Data Science', c1o: 'Graduate School of Data Science, Kyungpook National University', c1d: 'Researching time-series forecasting, federated learning and knowledge graphs for power systems.',
      c2date: '2024.07 — 2025.10', c2t: 'AI Engineer', c2o: 'Smart-factory AI solutions company', c2d: 'Built and shipped AI solutions for manufacturing — models that had to work outside the lab.',
      c3date: '— 2025.02', c3t: 'B.S. in New & Renewable Energy Engineering', c3o: 'Kyungpook National University', c3d: 'Where the question started: how does a renewable grid stay reliable?',
      badgeKIIE: 'KIIE SPRING CONF.', badgeResearch: 'RESEARCH', badgeService: 'SERVICE',
      projRound: 'Federated household-level peak-load forecasting — learning from each home’s electricity data without collecting it on a central server.',
      projV2G: 'Net-load forecasting for Vehicle-to-Grid environments, combining adaptive-adjacency GNNs with SUMO traffic simulation.',
      projPhil: 'A philosophy knowledge graph built from Stanford Encyclopedia of Philosophy articles — served with GNNs and GraphRAG.',
      s1t: 'Data & Modeling', s1s: 'ML · DL · Time-series',
      s2t: 'Software Engineering', s2s: 'Python · DBMS · Deployment',
      s3t: 'Research Toolkit', s3s: 'Methods proven in projects',
      skillDataDesc: 'From modeling to validation — forecasting architectures, deep learning design, experiment management.',
      skillSwDesc: 'Engineering that turns research into services — data pipelines, database design, deployment.',
      skillToolDesc: 'Methods proven in my projects — privacy-preserving training, graph retrieval, traffic simulation.',
      utils: 'UTILITIES',
      gbHead: 'Sign the guestbook.',
      gbSub: 'Say hello, leave feedback, or just mark your visit — everything is welcome.',
      gbNotice: 'Local preview mode — entries are saved in this browser only. Served from a personal server, this switches to server storage automatically.',
      phName: 'Name *',
      phRole: 'Affiliation / role (optional)',
      phMsg: 'Message *',
      btnSign: 'Sign →',
      gbThanks: 'Thanks for signing — your entry is live.',
      gbEmpty: 'The guestbook is empty — be the first to sign.',
      footHead: 'Let’s build a happier, cleaner world.',
      btnEdit: 'Edit', btnDelete: 'Delete', confirmDel: 'Sure?',
      btnSave: 'Save', btnCancel: 'Cancel',
      err_required: 'Please fill in your name and message.',
      err_server: 'Couldn’t reach the server. Please try again.'
    },
    ko: {
      navAbout: '소개', navCareer: '여정', navProjects: '프로젝트', navSkills: '스킬', navGuestbook: '방명록',
      badge: '채용 · 협업 환영',
      heroHead: '내일의 에너지를 예측합니다.',
      heroSub1: '재생에너지 전환을 위해', heroSub2: 'AI를 연구하는 석사과정 대학원생입니다.',
      scroll: '스크롤 ↓',
      sec1: '01 — 소개와 비전', sec2: '02 — 커리어 여정', sec3: '03 — 프로젝트', sec4: '04 — 스킬 아키텍처', sec5: '05 — 방명록',
      aboutHead: '신뢰할 수 있는 AI로 재생에너지 전환을 앞당깁니다.',
      aboutBody: '재생에너지는 전력망을 깨끗하게 만들지만, 예측을 어렵게 합니다. 제 연구는 각 가정의 프라이버시를 지키는 모델로 전력망을 다시 예측 가능하게 만듭니다. 신재생에너지공학을 전공하고 산업 현장에서 AI를 다진 뒤, 지금은 경북대학교 데이터사이언스대학원에서 연구하고 있습니다.',
      r1t: '에너지 × AI', r1d: '전력망 부하 · 발전량 예측',
      r2t: '시계열 예측', r2d: '수요 · 넷로드 시퀀스 모델',
      r3t: '연합학습', r3d: '데이터를 집 밖으로 보내지 않는 학습',
      r4t: '지식그래프', r4d: '구조화된 지식 위의 GNN · GraphRAG',
      careerHead: '에너지공학에서 출발해, 에너지 인텔리전스로 나아갑니다.',
      c1date: '2025.03 — 현재', c1t: '데이터사이언스 석사과정', c1o: '경북대학교 데이터사이언스대학원', c1d: '전력 시스템을 위한 시계열 예측, 연합학습, 지식그래프를 연구합니다.',
      c2date: '2024.07 — 2025.10', c2t: 'AI 엔지니어', c2o: '스마트팩토리 AI 솔루션 기업', c2d: '제조 현장에 AI 솔루션을 구축·배포 — 연구실 밖에서 작동해야 하는 모델을 만들었습니다.',
      c3date: '— 2025.02', c3t: '신재생에너지공학 학사', c3o: '경북대학교', c3d: '질문이 시작된 곳 — 재생에너지 전력망은 어떻게 안정적일 수 있을까?',
      badgeKIIE: 'KIIE 춘계학술대회', badgeResearch: '연구', badgeService: '서비스',
      projRound: '연합학습 기반 가구 단위 피크부하 예측. 각 가정의 전력 데이터를 중앙 서버로 모으지 않고 학습하는 프레임워크.',
      projV2G: 'GNN의 적응형 인접행렬과 SUMO 시뮬레이션을 활용한 V2G(Vehicle-to-Grid) 환경 넷로드 예측 연구.',
      projPhil: 'SEP(스탠퍼드 철학 백과) 아티클로 구축한 철학 지식그래프. GNN과 GraphRAG로 서비스 구축.',
      s1t: '데이터 · 모델링', s1s: 'ML · DL · 시계열',
      s2t: '소프트웨어 엔지니어링', s2s: 'Python · DBMS · 배포',
      s3t: '리서치 툴킷', s3s: '프로젝트로 검증한 방법론',
      skillDataDesc: '모델링부터 검증까지 — 시계열 예측, 딥러닝 아키텍처 설계, 실험 관리.',
      skillSwDesc: '연구를 서비스로 옮기는 엔지니어링 — 데이터 파이프라인, DB 설계, 배포.',
      skillToolDesc: '프로젝트에서 검증한 방법론 — 프라이버시 보존 학습, 그래프 검색, 교통 시뮬레이션.',
      utils: '유틸리티',
      gbHead: '방명록을 남겨주세요.',
      gbSub: '인사, 피드백, 아니면 그냥 지나가다 들른 흔적 — 무엇이든 환영합니다.',
      gbNotice: '지금은 로컬 미리보기 모드예요 — 이 브라우저에만 저장됩니다. 개인 서버에서 서빙하면 자동으로 서버 저장으로 전환됩니다.',
      phName: '이름 *',
      phRole: '소속/역할 (선택)',
      phMsg: '메시지 *',
      btnSign: '남기기 →',
      gbThanks: '남겨주셔서 감사합니다 — 방명록에 등록됐어요.',
      gbEmpty: '아직 방명록이 비어 있어요. 첫 번째로 남겨보세요.',
      footHead: '더 행복하고 깨끗한 세상을 함께 만들어요.',
      btnEdit: '수정', btnDelete: '삭제', confirmDel: '정말 삭제?',
      btnSave: '저장', btnCancel: '취소',
      err_required: '이름과 메시지를 입력해주세요.',
      err_server: '서버 연결에 실패했어요. 잠시 후 다시 시도해주세요.'
    }
  };

  var lang = 'en';
  try {
    var saved = localStorage.getItem('jw_lang');
    if (saved === 'ko' || saved === 'en') lang = saved;
  } catch (e) {}

  var langBtn = document.getElementById('langToggle');

  function applyLang() {
    var t = T[lang];
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] != null) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-ph');
      if (t[key] != null) el.placeholder = t[key];
    });
    langBtn.textContent = lang === 'en' ? '한국어' : 'English';
    if (gbErrorCode) gbErrorEl.textContent = t['err_' + gbErrorCode] || '';
    renderEntries();
  }

  langBtn.addEventListener('click', function () {
    lang = lang === 'en' ? 'ko' : 'en';
    try { localStorage.setItem('jw_lang', lang); } catch (e) {}
    applyLang();
  });

  /* ---------- Guestbook ---------- */
  var entries = [];
  var mode = 'local';
  var gbErrorCode = '';
  var successTimer = null;
  var gbForm = document.getElementById('gbForm');
  var gbName = document.getElementById('gbName');
  var gbRole = document.getElementById('gbRole');
  var gbMsg = document.getElementById('gbMsg');
  var gbErrorEl = document.getElementById('gbError');
  var gbSuccessEl = document.getElementById('gbSuccess');
  var gbNotice = document.getElementById('gbNotice');
  var gbEntries = document.getElementById('gbEntries');
  var gbEmpty = document.getElementById('gbEmpty');

  function readLocal() {
    try { return JSON.parse(localStorage.getItem('jw_guestbook') || '[]'); } catch (e) { return []; }
  }

  function fmtWhen(ts) {
    if (!ts) return '';
    var d = new Date(ts);
    if (isNaN(d)) return '';
    return d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getDate()).padStart(2, '0');
  }

  var editIdx = -1;
  var armedDelIdx = -1;
  var armTimer = null;

  function persistLocal() {
    if (mode !== 'local') return;
    try { localStorage.setItem('jw_guestbook', JSON.stringify(entries)); } catch (e) {}
  }

  function removeEntry(idx) {
    var en = entries[idx];
    function done() {
      entries.splice(idx, 1);
      if (editIdx === idx) editIdx = -1;
      setError('');
      persistLocal();
      renderEntries();
    }
    if (mode === 'server') {
      fetch('/api/guestbook/' + encodeURIComponent(en.id), { method: 'DELETE' })
        .then(function (res) { if (!res.ok) throw new Error('fail'); done(); })
        .catch(function () { setError('server'); });
    } else {
      done();
    }
  }

  function updateEntry(idx, name, role, message) {
    var en = entries[idx];
    var patch = { name: name, role: role, message: message };
    function done() {
      entries[idx] = Object.assign({}, en, patch);
      editIdx = -1;
      setError('');
      persistLocal();
      renderEntries();
    }
    if (mode === 'server') {
      fetch('/api/guestbook/' + encodeURIComponent(en.id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch)
      })
        .then(function (res) { if (!res.ok) throw new Error('fail'); done(); })
        .catch(function () { setError('server'); });
    } else {
      done();
    }
  }

  function makeInput(tag, className, value, placeholder) {
    var el = document.createElement(tag);
    el.className = className;
    el.value = value;
    el.placeholder = placeholder;
    if (tag === 'textarea') el.rows = 3;
    return el;
  }

  function renderEntries() {
    var t = T[lang];
    gbEntries.querySelectorAll('.gb-entry').forEach(function (el) { el.remove(); });
    gbEmpty.hidden = entries.length > 0;
    entries.forEach(function (en, idx) {
      var card = document.createElement('div');
      card.className = 'gb-entry';

      if (idx === editIdx) {
        var form = document.createElement('div');
        form.className = 'gb-entry__form';
        var nameIn = makeInput('input', 'gb__input gb__input--sm', en.name || '', t.phName);
        var roleIn = makeInput('input', 'gb__input gb__input--sm', en.role || '', t.phRole);
        var msgIn = makeInput('textarea', 'gb__input gb__input--sm gb__textarea', en.message || '', t.phMsg);
        var btns = document.createElement('div');
        btns.className = 'gb-entry__btns';
        var saveBtn = document.createElement('button');
        saveBtn.type = 'button';
        saveBtn.className = 'gb-entry__save';
        saveBtn.textContent = t.btnSave;
        saveBtn.addEventListener('click', function () {
          var name = (nameIn.value || '').trim();
          var role = (roleIn.value || '').trim() || 'Visitor';
          var message = (msgIn.value || '').trim();
          if (!name || !message) { setError('required'); return; }
          updateEntry(idx, name, role, message);
        });
        var cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'gb-entry__cancel';
        cancelBtn.textContent = t.btnCancel;
        cancelBtn.addEventListener('click', function () {
          editIdx = -1;
          setError('');
          renderEntries();
        });
        btns.appendChild(saveBtn);
        btns.appendChild(cancelBtn);
        form.appendChild(nameIn);
        form.appendChild(roleIn);
        form.appendChild(msgIn);
        form.appendChild(btns);
        card.appendChild(form);
        gbEntries.appendChild(card);
        return;
      }

      var top = document.createElement('div');
      top.className = 'gb-entry__top';
      var name = document.createElement('span');
      name.className = 'gb-entry__name';
      name.textContent = en.name || '';
      var when = document.createElement('span');
      when.className = 'gb-entry__when';
      when.textContent = fmtWhen(en.timestamp || en.createdAt || en.date);
      top.appendChild(name);
      top.appendChild(when);
      var role = document.createElement('div');
      role.className = 'gb-entry__role';
      role.textContent = en.role || 'Visitor';
      var msg = document.createElement('div');
      msg.className = 'gb-entry__msg';
      msg.textContent = en.message || '';

      var actions = document.createElement('div');
      actions.className = 'gb-entry__actions';
      var editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'gb-entry__act';
      editBtn.textContent = t.btnEdit;
      editBtn.addEventListener('click', function () {
        editIdx = idx;
        armedDelIdx = -1;
        setError('');
        renderEntries();
      });
      var delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'gb-entry__act gb-entry__act--danger' + (idx === armedDelIdx ? ' gb-entry__act--armed' : '');
      delBtn.textContent = idx === armedDelIdx ? t.confirmDel : t.btnDelete;
      delBtn.addEventListener('click', function () {
        if (armedDelIdx === idx) {
          clearTimeout(armTimer);
          armedDelIdx = -1;
          removeEntry(idx);
        } else {
          armedDelIdx = idx;
          renderEntries();
          clearTimeout(armTimer);
          armTimer = setTimeout(function () {
            armedDelIdx = -1;
            renderEntries();
          }, 3000);
        }
      });
      actions.appendChild(editBtn);
      actions.appendChild(delBtn);

      card.appendChild(top);
      card.appendChild(role);
      card.appendChild(msg);
      card.appendChild(actions);
      gbEntries.appendChild(card);
    });
  }

  function setError(code) {
    gbErrorCode = code;
    if (code) {
      gbErrorEl.textContent = T[lang]['err_' + code] || '';
      gbErrorEl.hidden = false;
    } else {
      gbErrorEl.hidden = true;
    }
  }

  function loadEntries() {
    fetch('/api/guestbook')
      .then(function (res) {
        var ct = res.headers.get('content-type') || '';
        if (!res.ok || ct.indexOf('application/json') === -1) throw new Error('no server');
        return res.json();
      })
      .then(function (data) {
        entries = Array.isArray(data) ? data : [];
        mode = 'server';
      })
      .catch(function () {
        entries = readLocal();
        mode = 'local';
      })
      .then(function () {
        gbNotice.hidden = mode !== 'local';
        renderEntries();
      });
  }

  gbForm.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var name = (gbName.value || '').trim();
    var role = (gbRole.value || '').trim() || 'Visitor';
    var message = (gbMsg.value || '').trim();
    if (!name || !message) {
      setError('required');
      gbSuccessEl.hidden = true;
      return;
    }
    var entry = { name: name, role: role, message: message, timestamp: new Date().toISOString() };

    function done() {
      editIdx = -1;
      armedDelIdx = -1;
      setError('');
      gbSuccessEl.hidden = false;
      gbName.value = '';
      gbRole.value = '';
      gbMsg.value = '';
      renderEntries();
      clearTimeout(successTimer);
      successTimer = setTimeout(function () { gbSuccessEl.hidden = true; }, 3000);
    }

    if (mode === 'server') {
      fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, role: role, message: message })
      })
        .then(function (res) {
          if (!res.ok) throw new Error('fail');
          return res.json();
        })
        .then(function (saved) {
          entries.unshift(saved);
          done();
        })
        .catch(function () {
          setError('server');
          gbSuccessEl.hidden = true;
        });
    } else {
      entries.unshift(entry);
      try { localStorage.setItem('jw_guestbook', JSON.stringify(entries)); } catch (e) {}
      done();
    }
  });

  /* ---------- Scroll-reveal motion ---------- */
  function setupMotion() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    var targets = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    var bars = Array.prototype.slice.call(document.querySelectorAll('.meter__fill'));
    var vh = window.innerHeight;

    targets.forEach(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.85) return;
      el.dataset.rv = '1';
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
    });
    bars.forEach(function (b) {
      b.dataset.barw = b.style.width || '0%';
      if (b.getBoundingClientRect().top < vh * 0.85) return;
      b.dataset.bar = '1';
      b.style.width = '0%';
    });

    var i = 0;
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (ent) {
        if (!ent.isIntersecting) return;
        var el = ent.target;
        if (el.dataset.bar) {
          el.style.transition = 'width 1s cubic-bezier(.2,.7,.3,1) .25s';
          el.style.width = el.dataset.barw;
        } else {
          var d = (i % 3) * 0.12;
          el.style.transition = 'opacity .7s ease ' + d + 's, transform .7s cubic-bezier(.2,.7,.3,1) ' + d + 's';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          i++;
        }
        io.unobserve(el);
      });
    }, { threshold: 0.12 });

    targets.forEach(function (el) { if (el.dataset.rv) io.observe(el); });
    bars.forEach(function (b) { if (b.dataset.bar) io.observe(b); });

    /* Safety net: IO can miss elements already in view after fast scrolls or
       anchor jumps — force-reveal anything visible on scroll and once after 2s. */
    function revealVisible() {
      var limit = window.innerHeight * 0.92;
      document.querySelectorAll('[data-rv]').forEach(function (el) {
        if (el.style.opacity === '0' && el.getBoundingClientRect().top < limit) {
          el.style.transition = 'opacity .7s ease, transform .7s cubic-bezier(.2,.7,.3,1)';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
      document.querySelectorAll('[data-bar]').forEach(function (b) {
        if (b.style.width === '0%' && b.getBoundingClientRect().top < limit) {
          b.style.transition = 'width 1s cubic-bezier(.2,.7,.3,1) .25s';
          b.style.width = b.dataset.barw || '';
        }
      });
    }
    window.addEventListener('scroll', revealVisible, { passive: true });
    setTimeout(revealVisible, 2000);
  }

  /* ---------- Init ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
  applyLang();
  loadEntries();
  setupMotion();
})();
