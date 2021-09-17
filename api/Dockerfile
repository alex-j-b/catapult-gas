FROM node:latest
WORKDIR /api/app
COPY package.json .
RUN npm install
COPY . .
CMD npm start
