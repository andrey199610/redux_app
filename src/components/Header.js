import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default function Header() {
  return (
    <Navbar className="pt-3 pb-3" bg="dark" variant="dark" expand="sm">
      <Navbar.Brand>Logo </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <LinkContainer exact to="/">
            <Nav.Link>Post</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/Works">
            <Nav.Link>Sign Up</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
