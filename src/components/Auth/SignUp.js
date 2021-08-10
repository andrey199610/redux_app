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

// import React, { useState } from 'react'
// import { useFormik } from 'formik'
// import * as Yup from 'yup'
// import axios from 'axios'

// export default function SignUp() {
//   const [error, setError] = useState(null)
//   const [focus, setFocus] = useState(true)

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       name: '',
//     },

//     validationSchema: Yup.object({
//       email: Yup.string().email('Invalid email address').required('Required'),
//       password: Yup.string()
//         .min(5, 'Must be 5 characters or less')
//         .max(15, 'Must be 15 characters or less')
//         .required('Required'),
//       name: Yup.string()
//         .min(3, 'Must be 3 characters or less')
//         .max(15, 'Must be 15 characters or less')
//         .required('Required'),
//     }),

//     onSubmit: async (values) => {
//       try {
//         await axios.post(
//           'https://nodejs-test-api-blog.herokuapp.com/api/v1/users',
//           values
//         )
//         console.log(formik)
//         formik.handleReset()
//         setError(null)
//       } catch (error) {
//         console.log(formik)
//         setError(error.response.data.error)
//         formik.isValid = false
//         console.log((formik.isValid = false))
//       }
//     },
//   })
//   console.log(formik.isValid)
//   return (
//     <form
//       onSubmit={formik.handleSubmit}
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         maxWidth: '300px',
//         margin: 'auto',
//         marginTop: '200px',
//       }}
//     >
//       <h1 style={{ textAlign: 'center' }}>Sign UP</h1>
//       <h3 style={{ color: 'red', textAlign: 'center' }}>{error}</h3>
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           marginBottom: '20px',
//         }}
//       >
//         <label htmlFor="email">Email Address</label>
//         <input
//           style={{ padding: '6px' }}
//           id="email"
//           name="email"
//           type="email"
//           onClick={() => setFocus(true)}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.email}
//         />
//         {formik.touched.email && formik.errors.email ? (
//           <div style={{ color: 'red' }}>{formik.errors.email}</div>
//         ) : null}
//       </div>
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           marginBottom: '20px',
//         }}
//       >
//         <label htmlFor="password">Password</label>
//         <input
//           style={{ padding: '6px' }}
//           id="password"
//           name="password"
//           type="password"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.password}
//         />
//         {formik.touched.password && formik.errors.password ? (
//           <div style={{ color: 'red' }}>{formik.errors.password}</div>
//         ) : null}
//       </div>
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           marginBottom: '20px',
//         }}
//       >
//         <label htmlFor="firstName">Name</label>
//         <input
//           style={{ padding: '6px' }}
//           id="name"
//           name="name"
//           type="text"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.name}
//         />
//         {formik.touched.name && formik.errors.name ? (
//           <div style={{ color: 'red' }}>{formik.errors.name}</div>
//         ) : null}
//       </div>
//       <button
//         type="submit"
//         style={{ padding: '6px' }}
//         disabled={!(formik.isValid && formik.dirty)}
//       >
//         Submit
//       </button>
