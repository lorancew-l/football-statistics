FROM node:14.18.1-buster as dev

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
