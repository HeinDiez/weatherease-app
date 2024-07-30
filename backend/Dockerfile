FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 4000
CMD ["nodemon", "--watch", ".", "--ext", "js,json", "--exec", "node", "index.js"]