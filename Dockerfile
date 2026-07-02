FROM node:20-alpine AS runtime
WORKDIR /app
COPY index.html style.css app.js server.js ./
COPY assets ./assets
RUN mkdir -p data
ENV PORT=80
EXPOSE 80
CMD ["node", "server.js"]
