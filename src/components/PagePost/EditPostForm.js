import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updatePostState, updatePost } from '../../reduxToolkit/PostSlice'
import { useHistory } from 'react-router-dom'

const EditPostForm = ({ match }) => {
  const history = useHistory()
  const { postId } = match.params
  const post = useSelector((state) =>
    state.posts.posts.find((post) => post._id === postId)
  )
  const initialState = {
    title: post?.title,
    fullText: post?.fullText,
    description: post?.description,
  }

  const [updatepoststate, setUpdatepoststate] = useState(initialState)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setUpdatepoststate({
      ...updatepoststate,
      [e.target.name]: e.target.value,
    })
  }

  const onEditPostClicked = (e) => {
    e.preventDefault()
    dispatch(updatePostState({ postId, updatepoststate }))
    dispatch(updatePost({ postId, updatepoststate }))
    history.push('/post')
  }

  return (
    <div>
      <h3 style={{ textAlign: 'center', marginTop: '50px' }}>Edit Post</h3>
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
            value={updatepoststate.title}
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
            value={updatepoststate.fullText}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>description</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={updatepoststate.description}
            name="description"
            type="text"
            placeholder="description"
            minLength={5}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={onEditPostClicked}>
          Submit
        </Button>
      </Form>
    </div>
  )
}
export default EditPostForm
