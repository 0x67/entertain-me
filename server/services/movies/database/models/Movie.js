const db = require('../config')
const movie = db.collection('Movies')
const { ObjectID } = require('mongodb')

class MovieModel {
  static fetchAllMovies() {
    return movie.find().toArray()
  }

  static createMovie(movieData) {
    return movie.insertOne(movieData)
  }

  static findMovieById(id) {
    return movie.findOne({
      _id: ObjectID(id)
    })
  }

  static updateMovie(id, updatedData) {
    return movie.findOneAndUpdate({ _id: ObjectID(id)}, {$set: updatedData}, {returnOriginal: false})
  }

  static deleteMovie(id) {
    return movie.deleteOne({_id: ObjectID(id)})
  }
}


module.exports = MovieModel
