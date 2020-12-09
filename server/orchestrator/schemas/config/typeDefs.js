const { gql } = require('apollo-server');

const typeDefs = gql`
  type Movies {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Query {
    movies: [Movies]
    series: [Series]
    movie(_id:ID): Movies
    seriesByID(_id:ID): Series
  }

  input dataMovie {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]
  }

  input dataSeries {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]
  }

  input dataTag {
    tags: String!
  }

  type Mutation {
    addMovie(
      data: dataMovie
    ):Movies
    updateMovie(_id:ID, data: dataMovie):Movies
    deleteMovie(_id:ID):Movies
    deleteMovieTag(_id:ID, data: dataTag):Movies

    addSeries(
      data: dataSeries
    ):Series
    updateSeries(_id:ID, data: dataSeries):Series
    deleteSeries(_id:ID):Series
    deleteSeriesTag(_id:ID, data: dataTag):Series
  }
`;

module.exports = typeDefs