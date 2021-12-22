FROM node:12-alpine

WORKDIR /app/server-api-gateway

COPY ./package.json ./

RUN yarn

COPY ./ ./

RUN ls

# Run in development mode
CMD [ "yarn", "run", "dev" ]