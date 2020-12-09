import React, { useState } from 'react'
import { Modal, Button, Dropdown, Form, Input, Icon, Message } from 'semantic-ui-react'
import { gql, useMutation, useQuery } from '@apollo/client';
import { Formik } from 'formik'
import * as yup from 'yup'
import * as isEmpty from 'lodash.isempty'

const AddForm = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState('')

  const [newData, setData] = useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: 0,
    tags: []
  })

  const [dropdownTags, setDropdownTags] = useState(
    [
      { key: 0, text: 'chick flick', value: 'chick flick'},
      { key: 1, text: 'action', value: 'action' },
      { key: 2, text: 'fantasy', value: 'fantasy' },
      { key: 3, text: 'anime', value: 'anime' },
      { key: 4, text: 'horror', value: 'horror' },
      { key: 5, text: 'thriller', value: 'thriller' },
      { key: 6, text: 'mystery', value: 'mystery' },
      { key: 7, text: 'drama', value: 'drama' },
      { key: 8, text: 'romance', value: 'romance' },
      { key: 9, text: 'comedy', value: 'comedy' },
      { key: 10, text: 'documentary', value: 'documentary' },
    ]
  )

  const types = [
    { key: 1, text: 'Movies', value: 'Movies' },
    { key: 2, text: 'Series', value: 'Series' },
  ]

  const setTypes = (_, {value}) => {
    setType(value)
  }

  const setTags = (_, {value}) => {
    setData({
      ...newData,
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

  const clearForm = () => {
    setData({
      title: '',
      overview: '',
      poster_path: '',
      popularity: 0,
      tags: []
    })
    setIsOpen(false)
  }

  const NEW_MOVIE = gql `
    mutation AddMovie($data: dataMovie) {
      addMovie(data: $data) {
        _id
      }
    }
  `

  const NEW_SERIES = gql `
    mutation AddSeries($data: dataSeries) {
      addSeries(data: $data) {
        _id
      }
    }
  `

  const [addMovie] = useMutation(NEW_MOVIE)
  const [addSeries] = useMutation(NEW_SERIES)

  const GET_DATA = gql `
    query allData {
      movies {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
      series {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
    }
  `
  const { refetch } = useQuery(GET_DATA)

  return (
    <>
    <Button icon='plus' onClick={() => setIsOpen(true)}/>
    
    <Formik
      initialValues={{
        title: '',
        overview: '',
        poster_path: '',
        popularity: '',
      }}
      validationSchema={yup.object().shape({
        title: yup
          .string()
          .required('Title cannot be empty.'),
        overview: yup
          .string()
          .required('Overview cannot be empty.'),
        poster_path: yup
          .string()
          .required('Image link cannot be empty.'),
        popularity: yup
          .number()
          .min(0, 'Popularity cannot lower than 0.')
          .max(10, 'Popularity cannot exceed 10.')
          .required('Popularity cannot be empty.'),
      })}

      onSubmit={(values, actions) => {
        const submitData = {
          title: values.title,
          overview: values.overview,
          poster_path: values.poster_path,
          popularity: values.popularity,
          tags: newData.tags
        }
    
        console.log(type);
        console.log(submitData);
        if(type === 'Movies') {
          addMovie({
            variables: {
              data: submitData
            }
          })
          refetch()
        } else if (type === 'Series') {
          addSeries({
            variables: {
              data: submitData
            }
          })
          refetch()
        }
        
        setTimeout(() => {
          setIsOpen(false)
        }, 1000)
      }}

      render={({
        values,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        dirty,
        setFieldValue
      }) => (
        <Modal
        size='tiny'
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        >
        <Modal.Header>Add New Movie/Series to your Collection</Modal.Header>
        <Modal.Content scrolling>
          {errors.title && <Message error content={errors.title}/>}
          {errors.overview && <Message error content={errors.overview}/>}
          {errors.poster_path && <Message error content={errors.poster_path}/>}
          {errors.popularity && <Message error content={errors.popularity}/>}
          {console.log(errors)}
          <Form>
            <Form.Field required>
              <label>Title</label>
              <Input 
                value={values.title} 
                type='text' 
                name='title' 
                placeholder='Title' 
                onChange={handleChange} 
                error={errors.title !== undefined}
              />
              <small>Movie title.</small>

              <label>Overview</label>
              <Input 
                value={values.overview} 
                type='text' 
                name='overview' 
                placeholder='Overview' 
                onChange={handleChange} 
                error={errors.overview !== undefined}
              />
              <small>Your review.</small>

              <label>Image</label>
              <Input 
                value={values.poster_path} 
                type='url' 
                name='poster_path' 
                placeholder='Image Link' 
                onChange={handleChange} 
                error={errors.poster_path !== undefined}/>
              <small>Link to an image.</small>

              <label>Rating</label>
              <Input 
                value={values.popularity} 
                type='number' 
                name='popularity' 
                placeholder='Rating' 
                onChange={handleChange} 
                error={errors.popularity !== undefined}
              />
              <small>Ranging from 1 to 10.</small>

              <label>Type</label>
              <Dropdown clearable options={types} selection onChange={setTypes}/>
              <small>Is it a movie or a series?</small>

              <label>Tags</label> 
              <Dropdown search selection multiple allowAdditions fluid options={dropdownTags} onChange={setTags} onAddItem={newTag}/>
              <small>Not finding your own tags? You can add your own by typing on the textbox!</small>
              
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => clearForm()}>
            <Icon name='cancel' />
            Cancel
          </Button>

          <Button 
          positive 
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting || !isEmpty(errors) || isEmpty(newData.tags) || !type || !dirty}>
            <Icon name='save' />
            Save
          </Button>
        </Modal.Actions>
      </Modal>
      )}
    />
    </>
  )
}

export default AddForm