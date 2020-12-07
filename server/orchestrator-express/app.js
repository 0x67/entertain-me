const express = require('express')
const cors = require('cors')
const router = require('./routers/index')

const port = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', router)

app.listen(port, () => {
  console.log(`Orchestrator-redis started on http://localhost:${port}/`);
})