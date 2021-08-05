import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { signin, updateUser } from '../reduxToolkit/SignUpSlice'

export default function Header() {
  const dispatch = useDispatch()
  const { auth } = useSelector((state) => state.signup)

  const logout = () => {
    localStorage.removeItem('token')
    dispatch(signin(false))
    dispatch(updateUser(null))
    localStorage.removeItem('currentuser')
  }

  return (
    <Navbar
      sticky="top"
      className="pt-3 pb-3"
      bg="dark"
      variant="dark"
      expand="sm"
    >
      <Navbar.Brand style={{ paddingLeft: '40px' }}>Logo </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        style={{ marginRight: '20px' }}
      />
      <Navbar.Collapse className="justify-content-end">
        <Nav className="align-items-center">
          {auth ? (
            <>
              <LinkContainer to="/createpost">
                <Nav.Link>Create</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/profile">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
            </>
          ) : null}
          <LinkContainer to="/post">
            <Nav.Link>Post</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/signup">
            <Nav.Link>Sign Up</Nav.Link>
          </LinkContainer>

          {auth ? (
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          ) : (
            <LinkContainer to="/signin">
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
