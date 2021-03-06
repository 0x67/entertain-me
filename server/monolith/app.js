const express = require('express')
const router = require('./routers')

const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', router)

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
})