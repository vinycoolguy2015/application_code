FROM node:lts-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm install && npm i -g typescript && tsc
USER node
EXPOSE 3000
CMD [ "node", "." ]


