const axios = require('axios')
const redis = require('../config/redis')

const movieURL = 'http://localhost:5001/movies'

class MovieController {
  static async createMovie(req, res) {
    try {
      const {title, overview, poster_path, tags} = req.body
      let popularity = parseFloat(req.body.popularity)

      const { data } = await axios({
        method: 'POST',
        url: movieURL,
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags
        }
      })

      redis.del('cache')
      res.status(201).json(data)
    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  }

  static async findMovieById(req, res) {
    try {
      const {id} = req.params

      const { data } = await axios.get(`${movieURL}/${id}`)

      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async updateMovie(req, res) {
    try {
      const {id} = req.params
      const {title, overview, poster_path, tags} = req.body
      let popularity = parseFloat(req.body.popularity)

      const { data } = await axios({
        method: 'PUT',
        url: `${movieURL}/${id}`,
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags
        }
      })

      redis.del('cache')
      res.status(201).json(data)
    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  }

  static async deleteMovie(req, res) {
    try {
      const {id} = req.params
      
      const movie = await axios({
        method: 'DELETE',
        url: `${movieURL}/${id}`
      })

      redis.del('cache')
      res.status(201).json({message: 'Movie successfully deleted.'})
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = MovieController