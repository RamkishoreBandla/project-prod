import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Routes,Route, Link } from 'react-router-dom';
import Home from './Home';
import DynamicInputFields from './DynamicInput';
function Navigation() {



  return (
    <>
    
    <Navbar sticky='top' bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/home"
        >Graph Test Path Coverage</Navbar.Brand>
        <Nav className="me-auto">
        <Nav.Link as={Link} to="/home" style={{color:'white'}}>Home</Nav.Link>
          <Nav.Link as={Link} style={{color:'white'}} to="/tool">Tool</Nav.Link>
          
        </Nav>
      </Container>
    </Navbar>
    
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tool" element={<DynamicInputFields />} />
    </Routes>
    </>
  )
}

export default Navigation;