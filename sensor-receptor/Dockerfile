FROM node:16
WORKDIR /sensor-receptor/app
COPY package.json .
RUN npm install
COPY . .
CMD npm start
