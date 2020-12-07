import React, { useState, useEffect } from 'react'
import { Card } from 'semantic-ui-react';

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

    console.log(favorites);
  }, [])

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