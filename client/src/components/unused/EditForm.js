// WIP Using LazyQuery, to fetch data based on type then display it in Modal, masih bingung

import React, { useState } from 'react'
import { Modal, Button, Dropdown, Form, Input } from 'semantic-ui-react'
import { gql, useLazyQuery } from '@apollo/client';

// Kalo misal yg edit tapi nggak fetch ulang dari server dikurangi nggak kak nilainya? Pake props aja
const EditForm = ({itemData}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [newData, setNewData] = useState()

  const getMovie = gql `
    query movieById($id: ID) {
      movie(_id: $id) {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
    }
  `

  const getSeries = gql `
    query seriesById($id: ID) {
      seriesByID(_id: $id) {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
    }
  `
  
  const [fetchMovies, { called: callMovie, loading: loadMovie, data: dataMovie }] = useLazyQuery(getMovie, {
    variables: {
      id: itemData.id
    },
    fetchPolicy: 'network-only'
  })

  const [fetchSeries, { called: callSeries, loading: loadSeries, data: dataSeries }] = useLazyQuery(getSeries, {
    variables: {
      id: itemData.id
    },
    fetchPolicy: 'network-only'
  }) 

  const editData = (value) => {
    if(value === 'Series') {
      console.log('wkwk');
      fetchSeries()
    }
    
    if (value === 'Movies') {
      fetchMovies()
      // TODO: Change to transition effect
      // setTimeout(() => {
      //   setNewData(dataMovie.movie)
      // }, 1000)
    }
    
    setIsOpen(true)
  }

  const editButton = () => {
    if(itemData.type === 'Series') {
      return (
        <Dropdown.Item icon='edit' text='Edit' onClick={() => editData(itemData.type)}/>
      )
    }
    if(itemData.type === 'Movies') {
      return (
        <Dropdown.Item icon='edit' text='Edit' onClick={() => editData(itemData.type)}/>
      )
    }
  }

  if (callMovie & loadMovie || callSeries & loadSeries) return <p>Loading ....</p>
  
  if (!callMovie || !callSeries) return (
    <>
    {editButton()}
    {/* <Dropdown.Item icon='edit' text='Edit' onClick={() => setIsOpen(true)}/> */}
    </>
  )

  if(dataMovie) {
    console.log(dataMovie);
  } 

  if(dataSeries){
    console.log(dataSeries);
  }
  console.log(dataSeries);
  return (
    <>
      {editButton()}
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
                <Input type='text' placeholder='Title' />

                <label>Overview</label>
                <Input type='text' placeholder='Overview' />

                <label>Image</label>
                <Input type='url' placeholder='Image Link' />

                <label>Rating</label>
                <Input type='number' placeholder='Rating' />
                
                <label>Tag</label>
                <Input type='text' placeholder='Tags' />

              </Form.Field>
            </Form>
            {/* <p>{JSON.stringify(data)}</p> */}
          </Modal.Content>
        <Modal.Actions>
            <Button negative onClick={() => setIsOpen(false)}>
              No
            </Button>
            <Button positive onClick={() => setIsOpen(false)}>
              Yes
            </Button>
          </Modal.Actions>
      </Modal>
    </>
  )
}

export default EditForm