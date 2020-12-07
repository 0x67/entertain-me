const router = require('express').Router()
const Controller = require('../controllers/SeriesController')

router.post('/', Controller.createSeries) 
router.get('/:id', Controller.findSeriesById)
router.put('/:id', Controller.updateSeries)
router.delete('/:id', Controller.deleteSeries)

module.exports = router