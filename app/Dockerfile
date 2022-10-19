FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY server/package*.json server/
RUN npm run install-server

COPY client/package*.json client/
RUN npm run install-client

COPY client/ client/
COPY server/ server/

CMD ["npm", "run", "start"]

EXPOSE 4000