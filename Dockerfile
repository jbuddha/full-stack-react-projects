FROM node:20 AS build
ARG VITE_BACKEND_URL=http://localhost:3001/api/v1

WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build
FROM nginx AS final
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
WORKDIR /usr/share/nginx/html
COPY --from=build /build/dist/client .
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]