const db = require('../config')
const series = db.collection('TV_Series')
const { ObjectID } = require('mongodb')

class SeriesModel {
  static fetchAllSeries() {
    return series.find().toArray()
  }

  static createSeries(seriesData) {
    return series.insertOne(seriesData)
  }

  static findSeriesById(id) {
    return series.findOne({ _id: ObjectID(id) })
  }

  static updateSeries(id, updatedData) {
    return series.findOneAndUpdate({ _id: ObjectID(id)}, {$set: updatedData}, {returnOriginal: false })
    // return series.updateOne({ _id: ObjectID(id)}, {$set: updatedData})
  }

  static deleteSeries(id) {
    return series.deleteOne({_id: ObjectID(id)})
  }
}


module.exports = SeriesModel
