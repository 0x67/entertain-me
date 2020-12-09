import React, { useState, useEffect } from 'react'
import { Card, Message } from 'semantic-ui-react';

import client from '../config/graphql/client'
import { GET_FAVORITES } from '../config/graphql/queries'

import { Navbar, FavoriteCard } from '../components'

const Favorite = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const { favorites: cacheFavorites } = client.readQuery({
      query: GET_FAVORITES
    })

    setFavorites(cacheFavorites)
  }, [])

  if(favorites.length === 0) {
    return (
      <>
      <div style={{
      }} className="ui container">
        <Navbar/>

        <Message
          header='Uh oh!'
          content='You currently have no favorited movies/series. You can add them from Homepage, then you can comeback here to view them.'
        />
      </div>
    </>
    )
  }
  return (
    <>
      <div style={{
      }} className="ui container">
        <Navbar/>

        <Card.Group itemsPerRow={4} >
          {
           favorites.map(favorite => {
              return (
                <FavoriteCard key={favorite.id} data={favorite}/>
              )
            })
          }
        </Card.Group>
      </div>
    </>
  )
}

export default Favorite