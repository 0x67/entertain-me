import React from 'react'
import { Card, Icon, Image, Label, Dropdown } from 'semantic-ui-react';

const FavoriteCard = ({data}) => {
  return (
    <Card key={data.id} centered>
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
              <Dropdown.Item icon='trash' text='Delete from Favorites'/>
            </Dropdown.Menu>
          </Dropdown>

        {
          data.tags.map((tag, index) => {
            return (
              <Label key={index} as='a' size="medium" >
                {tag}
                <Icon name='delete' />
              </Label>
            )
          })
        }
      </Card.Content>
    </Card>
  )
}

export default FavoriteCard