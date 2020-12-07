const router = require('express').Router()
const Controller = require('../controllers/MovieController')

router.post('/', Controller.createMovie) 
router.get('/:id', Controller.findMovieById)
router.put('/:id', Controller.updateMovie)
router.delete('/:id', Controller.deleteMovie)

module.exports = router