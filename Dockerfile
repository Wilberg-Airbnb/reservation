FROM node:14

WORKDIR /Users/samjohnson/Documents/hrfiles/airbrb/reservation

COPY package.json ./

RUN npm install

COPY ./ ./