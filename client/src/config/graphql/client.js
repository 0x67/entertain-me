import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_FAVORITES } from './queries'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

client.writeQuery({
  query: GET_FAVORITES,
  data: {
    favorites: []
  }
})

export default client