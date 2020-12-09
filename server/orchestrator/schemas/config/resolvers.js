const { QueryMovie, MutationMovie } = require('../movies/index')
const { QuerySeries, MutationSeries } = require('../series/index')

const resolvers = { 
  Query: {
    movies: QueryMovie.movies,
    movie: QueryMovie.movie,
    series: QuerySeries.series,
    seriesByID: QuerySeries.seriesByID,
  },
  Mutation: {
    addMovie: MutationMovie.addMovie,
    updateMovie: MutationMovie.updateMovie,
    deleteMovie: MutationMovie.deleteMovie,
    deleteMovieTag: MutationMovie.deleteTags,
    
    addSeries: MutationSeries.addSeries,
    updateSeries: MutationSeries.updateSeries,
    deleteSeries: MutationSeries.deleteSeries,
    deleteSeriesTag: MutationSeries.deleteTags
  }
}

module.exports = resolvers