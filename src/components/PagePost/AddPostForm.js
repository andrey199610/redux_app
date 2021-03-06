import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from '../../reduxToolkit/PostSlice'
import { useHistory } from 'react-router-dom'

const initialState = {
  title: '',
  fullText: '',
  description: '',
}

const AddPostForm = () => {
  const { auth } = useSelector((state) => state.signup)
  const [createpost, setCreatepost] = useState(initialState)
  const { addPostError } = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleChange = (e) => {
    setCreatepost((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSavePostClicked = (e) => {
    e.preventDefault()
    if (auth && createpost.fullText.length > 20 && !addPostError) {
      dispatch(addNewPost(createpost))
      setCreatepost(initialState)
      history.push('/post')
    }
  }

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Create new Post</h3>
      <Form style={{ width: '50%', margin: 'auto' }} validated={true}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="title"
            type="text"
            placeholder="Enter email"
            minLength={5}
            required
            value={createpost.title}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>fullText</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="fullText"
            type="text"
            placeholder="Enter Name"
            minLength={21}
            required
            value={createpost.fullText}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>description</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={createpost.description}
            name="description"
            type="text"
            placeholder="description"
            minLength={5}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={onSavePostClicked}>
          Submit
        </Button>
      </Form>
    </div>
  )
}
export default AddPostForm
