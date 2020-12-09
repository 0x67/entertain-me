import React from 'react';
import { Card, Icon, Image, Label, Dropdown } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/client';
import EditMovieForm from './EditMovieForm'

import { GET_DATA, DELETE_MOVIES, GET_FAVORITES, DELETE_MOVIE_TAG } from '../../config/graphql/queries'
import client from '../../config/graphql/client'

const CardComponent = ({data}) => {
  const removeTag = (tags) => {
    deleteTag({
      variables: {
        id: data._id,
        data: {tags}
      }
    })
    refetch()
  }

  const deleteItem = () => {
    deleteData({
      variables: {
        id: data._id
      }
    })
    refetch()
  }

  const { refetch } = useQuery(GET_DATA)

  const [deleteData] = useMutation(DELETE_MOVIES)
  const [deleteTag] = useMutation(DELETE_MOVIE_TAG)

  const addToFavorite = (data) => {
    const { favorites: cacheFavorites } = client.readQuery({
      query: GET_FAVORITES
    })
    
    client.writeQuery({
      query: GET_FAVORITES,
      data: {
        favorites: [...cacheFavorites, data]
      }
    })
  }
  
  return (
    <Card centered>
      <Image src={data.poster_path} size="medium" wrapped ui={false} />
      <Card.Content>
        <Card.Header>{data.title}</Card.Header>
        <Card.Meta>
          <span className='text'>Rating: {data.popularity}/10</span>
          {/* <Rating maxRating={10} rating={movie.popularity} disabled /> */}
        </Card.Meta>
        <Card.Description>
          Review: {`\n  ${data.overview}`}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>
          Tag:
        </p>
        
        <Dropdown
            icon='setting'
            floating
            labeled
            className='icon'
            pointing='bottom right'
          >
            <Dropdown.Menu>
              <Dropdown.Header icon='settings' content='Options'/>
              {/* {checkFavorite()} */}
              <Dropdown.Item icon='star' text='Mark as Favorites' onClick={() => addToFavorite(data)}/>
              <EditMovieForm data={data}/>
              <Dropdown.Item icon='trash' text='Delete' onClick={() => deleteItem()}/>
            </Dropdown.Menu>
          </Dropdown>

        {
          data.tags.map((tag, index) => {
            return (
              <Label key={index} as='a' size="medium" >
                {tag}
                <Icon name='delete' onClick={() => removeTag(tag)}/>
              </Label>
            )
          })
        }
      </Card.Content>
    </Card>
  )
}

export default CardComponent