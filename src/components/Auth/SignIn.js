import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from '../../plugins/axios'
import { useHistory } from 'react-router-dom'
import { signin, updateUser } from '../../reduxToolkit/SignUpSlice'
import { useDispatch } from 'react-redux'

const regular =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validated, setValidated] = useState('')
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()

  const SignIn = async (e) => {
    e.preventDefault()
    try {
      if (validated) {
        const login = await axios.post(`/auth`, {
          email: email,
          password: password,
        })
        const token = login.data.token
        addTokenLocal(token)
        currentUserFetch()
      }
    } catch (e) {
      setError(e.response.data.error)
    }
  }

  const currentUserFetch = async () => {
    if (validated) {
      const user = await axios.get(`/auth/user`)
      return dispatch(updateUser(user.data))
    }
  }

  const addTokenLocal = (token) => {
    if (token) {
      dispatch(signin(true))
      localStorage.setItem('token', token)
      setEmail('')
      setPassword('')
      history.push('/profile')
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
      <h5 style={{ color: 'red' }}>{error ? error : null}</h5>
      <Form style={{ width: '50%' }} validated={true}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            minLength={6}
            maxLength={20}
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
            maxLength={12}
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
