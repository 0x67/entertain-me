const axios = require('axios')
const redis = require('../config/redis')

const movieURL = 'http://localhost:5001/movies'
const seriesURL = 'http://localhost:5002/series'

class Controller {
  static async getAllData(req, res) {
    try {
      const cache = await redis.get('cache')
  
      if(cache) {
        res.status(200).json(JSON.parse(cache))
      } else {
        const moviesData = await axios.get(movieURL)
        const seriesData = await axios.get(seriesURL)
  
        const data = {
          movies: moviesData.data,
          series: seriesData.data
        }

        const cache = await redis.set('cache', JSON.stringify(data), 'EX', 300)
        
        res.status(200).json(data)
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  }
}

module.exports = Controller