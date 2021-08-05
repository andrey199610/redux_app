import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getSignUpSlice, reset } from '../../reduxToolkit/SignUpSlice'
import { Redirect } from 'react-router-dom'

const regular =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validated, setValidated] = useState(false)
  const { loading, error, success } = useSelector((state) => state.signup)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validated) {
      dispatch(getSignUpSlice({ email, name, password }))
    }
  }

  const validationEmail = (email) => {
    if (email.length >= 8 && regular.test(email)) {
      return true
    }
    return false
  }

  const validationName = (name) => {
    if (name.length >= 6) {
      return true
    }
    return false
  }

  const validationPassword = (password) => {
    if (password.length >= 6 && password.length <= 10) {
      return true
    }
    return false
  }

  const formValidaton = () => {
    if (
      validationEmail(email) &&
      validationPassword(password) &&
      validationName(name)
    ) {
      setValidated(true)
    } else {
      setValidated(false)
    }
  }

  useEffect(() => {
    formValidaton()
    return () => {
      dispatch(reset())
    }
  })

  if (success) {
    return <Redirect to="/signin" />
  }

  if (!loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '40px',
      }}
    >
      <h1 style={{ marginBottom: '20px' }}>Sign Up</h1>
      <h5 style={{ color: 'red' }}>{error ? error : null}</h5>
      <Form style={{ width: '50%' }} validated={true}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
            minLength={8}
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="Name"
            placeholder="Enter Name"
            minLength={6}
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            minLength={6}
            maxLength={10}
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
          disabled={!validated}
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}
