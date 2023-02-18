import Link from "next/link";
import React from "react"
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" expand="md" variant="dark">
        <Container fluid>
          <Link href="/" passHref>
            <Navbar.Brand>お茶の葉</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link href="/posts" passHref legacyBehavior>
                <Nav.Link><i className="bi bi-pencil-square" /> Posts</Nav.Link>
              </Link>
              <Link href="/about" passHref legacyBehavior>
                <Nav.Link><i className="bi bi-info-square" /> About</Nav.Link>
              </Link>
            </Nav>

            <div className="d-flex">
              <Nav.Link href="https://twitter.com/I_am_Ochappa" target="_blank" rel='noopener noreferrer nofollow' aria-label="Twitter" className="p-0 mx-2" style={{ color: "white" }}>
                <i className="bi bi-twitter" style={{ fontSize: "30px" }} />
              </Nav.Link>
              <Nav.Link href="https://github.com/ocha98" target="_blank" rel='noopener noreferrer nofollow' aria-label="GitHub" className="p-0 mx-2" style={{ color: "white" }}>
                <i className="bi bi-github" style={{ fontSize: "30px" }} />
              </Nav.Link>
            </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header