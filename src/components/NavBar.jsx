import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import './style.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function NavBar({setEmail}) { 
  const navigate = useNavigate();
  const email = localStorage.getItem("email")
  return (
    <Navbar bg="dark" expand="lg" className='ps-2 pe-2 pt-3 pb-3'>
      <Container fluid>
          <Link to="/" className='text-decoration-none'><Navbar.Brand className='fs-3 ps-3 pe-3 rounded fw-bold pb-2 pt-1' id='logo'>Speenghar Rest.</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="navbarScroll" className='navbar-toggler-icon' />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          > 
            <Link to="/" className='text-white fs-5 rounded me-3 ps-2 pe-2 fw-bold nav-link'>Home</Link>
          {
            email=="admin@gmail.com" && <Link to="/dashboard" className='text-white fs-5 rounded me-3 ps-2 pe-2 fw-bold nav-link'>Dashboard</Link>
          } 
            
          </Nav>
          {
            email && <Link to="cart" className='text-white ps-3 pe-3 p-2 border border-white rounded fs-5 rounded me-3 ps-2 pe-2 fw-bold nav-link'>Cart 🛒</Link>
          }
          
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 p-2  mt-1"
              aria-label="Search"
            />
            <Button variant="outline-warning mt-1">Search</Button>
          </Form>
          {
            !email ?
            <div className='ms-3 me-3 mt-1'>
              <Button variant="primary" className='ms-2 me-2 text-white' onClick={()=>navigate('sign-in')}>Sign in</Button>
              <Button variant='outline-primary' onClick={()=>navigate("register")}>Register</Button>
            </div> :
            <div>
              <Button variant='danger' className='bg-danger text-white p-2 rounded ms-2' onClick={()=>{localStorage.clear(); setEmail(""); navigate("../sign-in")}}>Sign Out</Button>
            </div>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

