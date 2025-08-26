# Stage 1: build Vue
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: nginx для статики
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Кастомный конфиг, чтобы SPA fallback работал:
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
