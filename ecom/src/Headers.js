import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';


const Headers = () => {
  return (
    <div>

   <Navbar bg="dark">
        <Container>
          <Navbar.Brand href="#home"><NavLink to='/cart'>Cart</NavLink></Navbar.Brand>
        </Container>
      </Navbar>

    
     
    </div>
  )
}

export default Headers