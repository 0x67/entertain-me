const router = require('express').Router()
const MovieRouter = require('./MovieRouter')
const SeriesRouter = require('./SeriesRouter')
const Controller = require('../controllers/Controller')

router.get('/', Controller.getAllData)

router.use('/movies', MovieRouter)
router.use('/series', SeriesRouter)

module.exports = router