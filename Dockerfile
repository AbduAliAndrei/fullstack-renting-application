FROM node:12 

WORKDIR /

ENV PORT 8080 
ENV PATH node_modules/.bin:$PATH
EXPOSE 8080 

COPY package*.json ./ 

RUN npm i 


# RUN npm install --silent

# copy local src code to the container 
COPY . . 

# next serve 
# RUN npm run serve

#  next build 
RUN npm run build

# next start 
# RUN npm run start

# build "cross-env NODE_ENV=development && nodemon server/index.ts" 
# RUN npm run dev

# start the service 
CMD ["npm" ,"start"]