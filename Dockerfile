FROM nginx:mainline-alpine-slim AS runtime
COPY . /usr/share/nginx/html
EXPOSE 80
