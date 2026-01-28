# Étape 1 : Build de l'application
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npx ng build

# Étape 2 : Serveur web pour la production
FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/front/browser /usr/share/nginx/html

EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
