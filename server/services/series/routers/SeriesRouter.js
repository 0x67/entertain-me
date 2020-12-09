const SeriesController = require('../controllers/SeriesController')

const router = require('express').Router()

router.get('/', SeriesController.getAllSeries)
router.post('/', SeriesController.createSeries)
router.get('/:id', SeriesController.findSeriesById)
router.put('/:id', SeriesController.updateSeries)
router.delete('/:id', SeriesController.deleteSeries)
router.patch('/:id', SeriesController.deleteTags)

module.exports = router