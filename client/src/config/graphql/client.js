import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_FAVORITES } from './queries'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

client.writeQuery({
  query: GET_FAVORITES,
  data: {
    favorites: [
      {
        overview: "TESTSTAST",
        popularity: 8.9,
        poster_path: "https://upload.wikimedia.org/wikipedia/en/thumb/2/23/The_Witcher_Title_Card.png/375px-The_Witcher_Title_Card.png",
        tags: ["action", "fantasy"],
        title: "TEST",
        __typename: "Movies",
        _id: "5fcc22a733161e51dceefd9e"
      }
    ]
  }
})

export default client