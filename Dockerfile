FROM node:14-alpine
EXPOSE 3000
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
ENTRYPOINT [ "npm", "start" ]