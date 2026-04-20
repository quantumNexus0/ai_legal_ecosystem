# client/nyaya-ai/Dockerfile — Serve static vanilla-JS site with nginx
FROM nginx:alpine

# Copy all static files (index.html, app.js, styles.css, etc.)
COPY . /usr/share/nginx/html

# Replace placeholders with actual URLs at build time
ARG VITE_API_URL=http://localhost:8000
ARG VITE_PLATFORM_URL=http://localhost:5173
RUN sed -i "s|__VITE_API_URL__|$VITE_API_URL|g" /usr/share/nginx/html/app.js && \
    sed -i "s|__VITE_API_URL__|$VITE_API_URL|g" /usr/share/nginx/html/src/lib/api.ts && \
    sed -i "s|__VITE_PLATFORM_URL__|$VITE_PLATFORM_URL|g" /usr/share/nginx/html/index.html

# Minimal nginx config for a single-page static site
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Allow direct hash-based navigation (#analyze, #docs, #refs) \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Cache static assets \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    gzip on; \
    gzip_types text/plain text/css application/javascript application/json image/svg+xml; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
