FROM --platform=linux/amd64 node:19

WORKDIR /server

COPY . .
RUN npm i

CMD npm run migrate:dev && npm run start:prod

EXPOSE 5000