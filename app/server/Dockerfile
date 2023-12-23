FROM --platform=linux/x86_64 node:16

WORKDIR /server

COPY . .
RUN npm i

CMD npm run generate && npm run migrate:prod && npm run start:prod

EXPOSE 5000