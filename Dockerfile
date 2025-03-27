# build stage
FROM node:hydrogen-alpine3.21 as build-stage

WORKDIR /app

COPY package.json .

COPY *.lock .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build || exit 0

# production stage
FROM node:hydrogen-alpine3.21 as production-stage

COPY --from=build-stage /app/dist /app

COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

# RUN npm install --production
RUN npm install

RUN npm install pm2 -g

EXPOSE 3000

CMD [ "pm2-runtime", "/app/dist/app.js" ]