FROM node:22.11.0-alpine AS build
ENV NODE_OPTIONS="--max-old-space-size=1024"
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.27.3-alpine
COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
