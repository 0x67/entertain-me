import React from 'react';
import { useQuery } from '@apollo/client';
import { Card } from 'semantic-ui-react';
import { AddForm, MovieCard, SeriesCard, Navbar } from '../components';
import { GET_DATA } from '../config/graphql/queries'

const Home = () => {
  const { loading, error, data } = useQuery(GET_DATA)

  if(loading) {
    return (
      <h1>Loading ...</h1>
    )
  }

  if(error) {
    return (
      <h1>{error.message}</h1>
    )
  }

  return (
    <>
      <div style={{
      }} className="ui container">
        
        <Navbar/>
        <div>
          <h1>Movie Data</h1>
          <AddForm/>
          <Card.Group itemsPerRow={4} >
            {
              data.movies.map(movie => {
                return (
                  <MovieCard key={movie.id} data={movie}/>
                  // <CardComponent key={movie.id} data={movie}/>
                )
              })
            }
          </Card.Group>
          
          <h1>Series Data</h1>
          <Card.Group itemsPerRow={4} >
            {
              data.series.map(series => {
                return (
                  <SeriesCard key={series.id} data={series}/>
                  // <CardComponent key={series.id} data={series}/>
                )
              })
            }
          </Card.Group>
        </div>
      
      </div>
    </>
  )
}

export default Home