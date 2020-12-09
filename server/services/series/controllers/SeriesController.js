const Model = require('../database/models/TV_Series')

class SeriesController {
  static async getAllSeries(req, res) {
    try {
      const series = await Model.fetchAllSeries()

      res.status(200).json(series)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async createSeries(req, res) {
    try {
      const {title, overview, poster_path, tags} = req.body
      let popularity = parseFloat(req.body.popularity)
      // let tags = req.body.tags.split(" ")
      
      const { ops } = await Model.createSeries({title, overview, poster_path, popularity, tags})

      res.status(201).json(ops[0])
    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  }

  static async findSeriesById(req, res) {
    try {
      const {id} = req.params
      const movie = await Model.findSeriesById(id)

      res.status(200).json(movie)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async updateSeries(req, res) {
    try {
      const {id} = req.params
      const {title, overview, poster_path, tags} = req.body
      let popularity = parseFloat(req.body.popularity)
      // let tags = req.body.tags.split(" ")

      const {value} = await Model.updateSeries(id, {title, overview, poster_path, popularity, tags})

      res.status(201).json(value)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async deleteSeries(req, res) {
    try {
      const {id} = req.params
      
      const series = await Model.deleteSeries(id)
      
      res.status(201).json({message: 'TV Series successfully deleted.'})
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async deleteTags(req, res) {
    try {
      const { id } = req.params

      const { tags } = req.body

      const { value } = await Model.removeTags(id, tags)

      res.status(201).json(value)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports =  SeriesController