FROM node:16.15.1

WORKDIR /app

RUN chmod 777 /app

USER root

COPY "package.json" .

RUN npm install

COPY . .

RUN npm install -g typescript

RUN sh -c tsc 

EXPOSE 8000

CMD npx prisma migrate dev --name init && \
    node build.js && \
    npm run start

