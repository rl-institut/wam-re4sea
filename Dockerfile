FROM node:16 as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .