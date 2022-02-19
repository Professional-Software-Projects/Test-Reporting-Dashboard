FROM node:16

WORKDIR /server

# install dependencies from both package.json and package-lock.json
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]

