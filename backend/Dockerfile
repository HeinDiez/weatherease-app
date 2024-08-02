FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN rm -rf node_modules
RUN npm install
RUN npm install -g nodemon ts-node
COPY . .

RUN ls -l node_modules/@types
EXPOSE 4000
CMD ["nodemon", "--exec", "ts-node", "src/index.ts"]