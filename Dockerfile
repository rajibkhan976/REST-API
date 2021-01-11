FROM node:12-alpine
 WORKDIR /rest-api
 COPY . .
 RUN npm install --production
 CMD ["node", "src/index.js"]