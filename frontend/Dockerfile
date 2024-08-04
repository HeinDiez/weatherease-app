FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN rm -rf node_modules
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]