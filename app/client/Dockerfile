FROM --platform=linux/x86_64 node:19

WORKDIR /client

ARG NEXT_PUBLIC_SERVER_URL

COPY . .
RUN npm i

RUN NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL npm run build

RUN NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL npm run export

CMD npm run start

EXPOSE 3000