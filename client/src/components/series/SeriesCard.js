import React from 'react';
import { Card, Icon, Image, Label, Dropdown } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/client';
import EditSeriesForm from './EditSeriesForm'
import { GET_DATA, DELETE_SERIES } from '../../config/graphql/queries'


const CardComponent = ({data}) => {
  const removeTag = (tag) => {
    console.log(`tag ${tag} removed from movie with ID ${data._id}` );
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

  const [deleteData] = useMutation(DELETE_SERIES)

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
              <Dropdown.Item icon='star' text='Mark as Favorites'/>
              <EditSeriesForm data={data}/>
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