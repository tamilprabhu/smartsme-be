FROM node:20-alpine

WORKDIR /home/smartsme-be/app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY app.js ./
COPY bin ./bin
COPY public ./public
COPY views ./views
COPY routes ./routes
COPY services ./services
COPY models ./models
COPY middlewares ./middlewares
COPY utils ./utils
COPY constants ./constants
COPY config ./config
COPY db ./db
COPY storage ./storage
COPY .env ./.env
COPY www ./www

RUN mkdir -p logs

# Container listens on 8080
EXPOSE 8080

# Start Express app
CMD ["node", "./bin/www"]
