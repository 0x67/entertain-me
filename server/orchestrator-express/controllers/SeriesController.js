const axios = require('axios')
const redis = require('../config/redis')

const seriesURL = 'http://localhost:5002/series'

class SeriesController {
  static async createSeries(req, res) {
    try {
      const {title, overview, poster_path, tags} = req.body
      let popularity = parseFloat(req.body.popularity)

      const { data } = await axios({
        method: 'POST',
        url: seriesURL,
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

  static async findSeriesById(req, res) {
    try {
      const {id} = req.params

      const { data } = await axios.get(`${seriesURL}/${id}`)

      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async updateSeries(req, res) {
    try {
      const {id} = req.params
      const {title, overview, poster_path, tags} = req.body
      let popularity = parseFloat(req.body.popularity)

      const { data } = await axios({
        method: 'PUT',
        url: `${seriesURL}/${id}`,
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

  static async deleteSeries(req, res) {
    try {
      const {id} = req.params
      
      const movie = await axios({
        method: 'DELETE',
        url: `${seriesURL}/${id}`
      })

      redis.del('cache')
      res.status(201).json({message: 'Movie successfully deleted.'})
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = SeriesController