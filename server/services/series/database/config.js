const { MongoClient } = require('mongodb')

// Comment conditionally to connect to mongodb

// const url = 'mongodb://localhost:27017' // when running directly on windows/linux/mac
const url = 'mongodb://host.docker.internal:27017' // when running inside docker container

const dbName = 'EntertainMe'

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true})

const connect = async () => await client.connect()
connect()

const db = client.db(dbName)

module.exports = db