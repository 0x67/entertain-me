FROM node:12-alpine
WORKDIR /orchestrator
COPY . .
RUN npm install
EXPOSE 4000
CMD ["node", "app.js"]