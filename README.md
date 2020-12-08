# entertain-me

## Docker Image for Orchestrator and Services

Link to download the images instead of building it yourself will follow. Still getting trouble pushing to Docker repo.

1. In folder `/orchestrator` run `docker build -t orchestrator .` Note the period `.`
2. In folder `/services/movies` run `docker build -t service-movies .`
3. In folder `/services/series` run `docker build -t service-series .`
4. Now in project `root` folder run `docker-compose -f docker-compose.yml up` to start all images in the same network container. To shut down run `docker-compose -f docker-compose.yml down`
5. Finally, in `/client` folder run `npm start`


## Week-2 Day 4

- Challenge Pagi
  - kerjakan di folder `server/monolith`
- SIANG: 
  - pisahkan app yang kalian buat tadi pagi menjadi arsitektur microservice:
  - orchestrator: kerjakan di folder `server/orchestrator-express` berupa aplikasi express.js PORT 5000
  - service movies: kerjakan di folder `server/services/movies` berupa aplikasi express.js PORT 5001
  - service series: kerjakan di folder `server/services/series` berupa aplikasi express.js PORT 5002

## Week-2 Day 5

- Challenge Pagi:
  - kerjakan di folder `server/orchestrator`, aplikasi berupa apollo server (atau digabung dengan express) PORT 5000
  - kerjakan di folder `server/services/movies`, aplikasi berupa express PORT 5001
  - kerjakan di folder `server/services/series`, aplikasi berupa express PORT 5002
- Challenge Siang:
  - kerjakan di folder `client`, aplikasi berupa react + apollo client 

## Week-3 Day 1

- lanjut kerjakan di folder `client`


## Folder Structure
- client
- server
  - monolith
  - orchestrator-express
  - orchestrator
  - services
    - movies
    - series
  
