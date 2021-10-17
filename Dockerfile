FROM node:12

WORKDIR /usr/src

ENV PORT 8080
ENV HOST 0.0.0.0

COPY package*.json ./

RUN npm install --only=production

# copy local next code to the container
COPY . .

# build prod app
RUN npm run build

# start the service
CMD npm start
