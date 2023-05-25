FROM node:14

WORKDIR /

COPY ../package.json .

COPY src ./src

RUN npm i

EXPOSE 3333

CMD ["npm", "start"]