const express = require('express')
const cors = require('cors')
const router = require('./routers')

const port = process.env.PORT || 5001

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', router)

app.listen(port, () => {
  console.log(`Service/movies started on http://localhost:${port}/movies`);
})