FROM node:10

WORKDIR /Users/samjohnson/Documents/hrfiles/airbrb/reservation

COPY ./ ./

RUN npm install