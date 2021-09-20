FROM node:16
WORKDIR /dashboard/app
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci
COPY --chown=node:node . .
CMD npm start
