import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { signin } from '../../reduxToolkit/SignUpSlice'
import { useDispatch, useSelector } from 'react-redux'

const regular =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validated, setValidated] = useState(false)
  const { auth } = useSelector((state) => state.signup)
  const dispatch = useDispatch()
  const history = useHistory()

  const SignIn = async (e) => {
    e.preventDefault()
    if (validated) {
      const login = await axios.post(
        `https://nodejs-test-api-blog.herokuapp.com/api/v1/auth`,
        { email: email, password: password }
      )
      const token = login.data.token
      if (token) {
        dispatch(signin(true))
        localStorage.setItem('email', email)
        localStorage.setItem('token', token)
        setEmail('')
        setPassword('')
        history.push('/post')
      }
    }
  }

  const validationEmail = (email) => {
    if (email.length >= 8 && regular.test(email)) {
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
    if (validationEmail(email) && validationPassword(password)) {
      setValidated(true)
    } else {
      setValidated(false)
    }
  }
  useEffect(() => {
    formValidaton()
  })

  const logout = () => {
    dispatch(signin(false))
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    history.push('/signin')
  }

  if (auth) {
    return (
      <div>
        <h1>Congratulations {localStorage.getItem('email')}</h1>
        <Button onClick={logout}>Logout</Button>
      </div>
    )
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
      <h1 style={{ marginBottom: '20px' }}>Sign In</h1>
      <Form style={{ width: '50%' }} validated={true}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            minLength={6}
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
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
            required
            minLength={6}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={!validated}
          onClick={(e) => SignIn(e)}
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}
