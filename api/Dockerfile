FROM node:16
WORKDIR /api/app
COPY package.json .
RUN npm install
COPY . .
# RUN apt-get update && apt-get install nano
CMD npm start
