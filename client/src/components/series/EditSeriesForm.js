import React, { useState, useEffect } from 'react'
import { Modal, Button, Dropdown, Form, Input, Icon } from 'semantic-ui-react'
import { useMutation, useQuery } from '@apollo/client';
import { GET_DATA, EDIT_SERIES } from '../../config/graphql/queries'

const EditSeriesForm = ({data}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const [dropdownTags, setDropdownTags] = useState([])

  const { refetch } = useQuery(GET_DATA)

  useEffect(() => {
    setEditData({
      title: data.title,
      overview: data.overview,
      poster_path: data.poster_path,
      popularity: data.popularity,
      tags: data.tags
    })

    const editTags = data.tags.map((tag, idx) => (
      {
        key: idx,
        text: tag,
        value: tag
      }
    ))
    
    setDropdownTags(editTags)
  }, [])
  
  const handleInput = (_, {name, value}) => {
    if(name === 'popularity') {
      value = Number(value)
    }

    setEditData({
      ...editData,
      [name]: value
    })
  }

  const setTags = (_, {value}) => {
    setEditData({
      ...editData,
      tags: value
    })

  }

  const newTag = (_, {value}) => {
    const newTags = {
      key: dropdownTags.length + 1,
      text: value,
      value: value
    }

    const newDropdownTags = dropdownTags.concat(newTags)
    setDropdownTags(newDropdownTags)
  }
  const submitData = () => {
    updateData({
      variables: {
        id: data._id,
        data: editData
      }
    })
    refetch()
    setIsOpen(false)
  }

  console.log(editData);
  const [updateData] = useMutation(EDIT_SERIES)
  
  return (
    <>
      <Dropdown.Item icon='edit' text='Edit' onClick={() => setIsOpen(true)}/>
      <Modal
        size='tiny'
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
      >
        <Modal.Header>Edit</Modal.Header>
        <Modal.Content>
            <Form>
              <Form.Field required>
                <label>Title</label>
                <Input value={editData.title} type='text' name='title' placeholder='Title' onChange={handleInput} />
                <small>Movie title.</small>

                <label>Overview</label>
                <Input value={editData.overview} type='text' name='overview' placeholder='Overview' onChange={handleInput} fluid/>
                <small>Your review.</small>

                <label>Image</label>
                <Input value={editData.poster_path} type='url' name='poster_path' placeholder='Image Link' onChange={handleInput} />
                <small>Link to an image.</small>

                <label>Rating</label>
                <Input value={editData.popularity} type='number' name='popularity' placeholder='Rating' onChange={handleInput} />
                <small>Ranging from 1 to 10.</small>
                  
                <label>Tag</label>
                <Dropdown defaultValue={data.tags} search selection multiple allowAdditions fluid options={dropdownTags} onChange={setTags} onAddItem={newTag}/>
                <small>Each tag is separated by comma.</small>

              </Form.Field>
            </Form>
          </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setIsOpen(false)}>
            <Icon name='cancel' />
            Cancel
          </Button>
          <Button positive onClick={() => submitData()}>
            <Icon name='save' />
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default EditSeriesForm