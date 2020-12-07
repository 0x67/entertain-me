import { gql } from '@apollo/client'

export const GET_DATA = gql `
query allData {
  movies {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
  series {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
` 

export const DELETE_MOVIES = gql `
  mutation deleteData ($id: ID) {
    deleteMovie(_id:$id) {
      _id
    }
  }
`

export const DELETE_SERIES = gql `
  mutation deleteData ($id: ID) {
    deleteSeries(_id:$id) {
      _id
    }
  }
`

export const EDIT_MOVIE = gql `
  mutation editData($id: ID, $data: dataMovie) {
    updateMovie(_id: $id, data: $data) {
      _id
    }
  }
`
export const EDIT_SERIES = gql `
  mutation editData($id: ID, $data: dataSeries) {
    updateSeries(_id: $id, data: $data) {
      _id
    }
  }
`

export const GET_FAVORITES = gql `
  query getFavorites {
    favorites {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`