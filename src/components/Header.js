import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import {Link} from "react-router-dom";

class Header extends Component {

    render(){
        let search = ''
        if(this.props.isSearch)
            search = <Form  inline>
                        <FormControl id='search_input' style={{width:'70%'}} type="text" placeholder="Search" className="mr-sm-2" />
                        <Button id='search_button'  variant="outline-light">Search</Button>
                    </Form>
            return(
                <Navbar expand="lg" collapseOnSelect bg="primary" variant="dark">
                    <Navbar.Brand href="/">Pokemons</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse style={{justifyContent:'flex-end'}}  id="responsive-navbar-nav">
                        <Nav className="mr-auto" >
                            <Link className='nav-link' to="/">Home</Link>
                            <Link className='nav-link' to="/items">Items</Link> 
                        </Nav>
                        {search}
                    </Navbar.Collapse>
                </Navbar>  
            )
        }
    }

export default Header;