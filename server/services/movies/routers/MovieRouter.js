const MovieController = require('../controllers/MovieController')

const router = require('express').Router()

router.get('/', MovieController.getAllMovies)
router.post('/', MovieController.createMovie)
router.get('/:id', MovieController.findMovieById)
router.put('/:id', MovieController.updateMovie)
router.delete('/:id', MovieController.deleteMovie)
router.patch('/:id', MovieController.deleteTags)

module.exports = router