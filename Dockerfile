FROM node:12

WORKDIR /

COPY package*.json ./

RUN npm install

# copy local src code to the container
COPY . .


ENV PORT 8080

EXPOSE 8080
# build prod app
RUN npm run build

# start the service
CMD ["npm" ,"start"]
