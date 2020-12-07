import React from 'react';
import { Card, Icon, Image, Label, Dropdown } from 'semantic-ui-react';

import { EditForm } from './'

const CardComponent = ({data}) => {
  const removeTag = (tag) => {
    console.log(`tag ${tag} removed from movie with ID ${data._id}` );
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
              <EditForm itemData={{id: data._id, type: data.__typename}}/>
              <Dropdown.Item icon='trash' text='Delete'/>
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