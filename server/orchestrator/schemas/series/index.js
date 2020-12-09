const axios = require('axios')

const seriesURL = process.env.seriesURL || 'http://localhost:5002/series'

const QuerySeries = {
  series: async () => {
    try {
      const { data } = await axios.get(seriesURL)

      return data
      
    } catch (err) {
      console.log(err);
    }
  },
  seriesByID: async (_, args) => {
    try {
      const { _id } =  args
      const { data } = await axios.get(`${seriesURL}/${_id}`)

      return data
    } catch (err) {
      console.log(err);
    }
  },
}

const MutationSeries = {
  addSeries: async (_, args) => {
    try {
      const { title, overview, poster_path, tags} = args.data
      let popularity = parseFloat(args.data.popularity)

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

      return data
    } catch (err) {
      console.log(err);
    }
  },

  updateSeries: async(_, args) => {
    try {
      const { title, overview, poster_path, tags} = args.data
      const { _id } = args
      let popularity = parseFloat(args.data.popularity)

      const { data } = await axios({
        method: 'PUT',
        url: `${seriesURL}/${_id}`,
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

  deleteSeries: async(_, args) => {
    try {
      const { _id } = args

      const { data } = await axios({
        method: 'DELETE',
        url: `${seriesURL}/${_id}`,
      })

      return data
    } catch (err) {
      console.log(err);
    }
  },

  deleteTags: async(_, args) => {
    try {
      const { _id } = args
      const { tags } = args.data

      const { data } = await axios({
        method: 'PATCH',
        url: `${seriesURL}/${_id}`,
        data: {tags}
      })

      return data
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { QuerySeries, MutationSeries }