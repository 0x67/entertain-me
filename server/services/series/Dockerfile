FROM node:12-alpine
WORKDIR /series
COPY . .
RUN npm install
EXPOSE 5002
CMD ["node", "app.js"]