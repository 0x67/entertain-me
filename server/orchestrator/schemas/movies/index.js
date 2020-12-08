const axios = require('axios')

const moviesURL = process.env.moviesURL || 'http://localhost:5001/movies'
// const moviesURL = 'gateway.docker.internal:5001/movies'
// const moviesURL = '172.18.0.1:5001/movies'

const QueryMovie = {
  movies: async () => {
    try {
      const { data } = await axios.get(moviesURL)

      return data
      
    } catch (err) {
      console.log(err);
    }
  },
  movie: async (_, args) => {
    try {
      const { _id } =  args
      const { data } = await axios.get(`${moviesURL}/${_id}`)

      return data
    } catch (err) {
      console.log(err);
    }
  },
}

const MutationMovie = {
  addMovie: async (_, args) => {
    try {
      const { title, overview, poster_path, tags} = args.data
      let popularity = parseFloat(args.data.popularity)

      const { data } = await axios({
        method: 'POST',
        url: moviesURL,
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags
        }
      })

      return data
    } catch (err) {
      console.log(err);
    }
  },

  updateMovie: async(_, args) => {
    try {
      const { title, overview, poster_path, tags} = args.data
      const { _id } = args
      let popularity = parseFloat(args.data.popularity)

      const { data } = await axios({
        method: 'PUT',
        url: `${moviesURL}/${_id}`,
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags
        }
      })

      return data
    } catch (err) {
      console.log(err);
    }
  },

  deleteMovie: async(_, args) => {
    try {
      const { _id } = args

      console.log( _id);
      const { data } = await axios({
        method: 'DELETE',
        url: `${moviesURL}/${_id}`,
      })

      return data
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { QueryMovie, MutationMovie }