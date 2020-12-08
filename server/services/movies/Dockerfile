FROM node:12-alpine
WORKDIR /movies
COPY . .
RUN npm install
EXPOSE 5001
CMD ["node", "app.js"]