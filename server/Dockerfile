FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
# COPY mysql2 ./node_modules/
CMD ["npm", "run", "start"]