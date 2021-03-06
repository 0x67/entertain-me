const Model = require('../database/models/Movie')

class MovieController {
  static async getAllMovies(req, res) {
    try {
      const movies = await Model.fetchAllMovies()

      res.status(200).json(movies)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async createMovie(req, res) {
    try {
      const {title, overview, poster_path, tags} = req.body
      let popularity = parseFloat(req.body.popularity)

      const { ops } = await Model.createMovie({title, overview, poster_path, popularity, tags})

      res.status(201).json(ops[0])
    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  }

  static async findMovieById(req, res) {
    try {
      const {id} = req.params
      const movie = await Model.findMovieById(id)

      res.status(200).json(movie)
    } catch (err) {
      
    }
  }

  static async updateMovie(req, res) {
    try {
      const {id} = req.params
      const {title, overview, poster_path, tags} = req.body

      const {value} = await Model.updateMovie(id, {title, overview, poster_path, tags})

      res.status(201).json(value)
    } catch (err) {
      
    }
  }

  static async deleteMovie(req, res) {
    try {
      const {id} = req.params
      
      const movie = await Model.deleteMovie(id)
      
      res.status(201).json({message: 'Movie successfully deleted.'})
    } catch (err) {
      
    }
  }
}

module.exports =  MovieController