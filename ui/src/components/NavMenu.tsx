import React, {Dispatch, useState} from 'react';
import {connect} from "react-redux";
import {Link, NavLink, Redirect} from 'react-router-dom';
import {User} from "../models/user";
import axios from "axios";
import {setUser} from "../redux/actions/setUserAction";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

const NavMenu = (props: any) => {
    const logout = async () => {
        await axios.post('logout');
        props.setUser(null);
    }

    let menu;

    if (props.user?.id) {
        menu = (
            <div className="col-md-3 text-end">
                <Link to={'/rankings'} className="btn me-2">Rankings</Link>
                <Link to={'/stats'} className="btn me-2">Stats</Link>
                <a href="#" className="btn btn-outline-primary me-2"
                   onClick={logout}
                >Logout</a>
                <Link to={'/profile'} className="btn btn-primary">{props.user.first_name} {props.user.last_name}</Link>
            </div>
        )
    } else {
        menu = (
            <>
           
             <div className="col-md-3 text-end">
               
                 <Link to={'/login'} className="btn btn-outline-primary me-2">Войти</Link>
                 <Link to={'/register'} className="btn btn-primary">Регистрация</Link> 
             </div>
             </>
        )
    }

    return (

        <div className="container">       
             <header
                className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0"> 
                <Navbar.Brand href="/">E_Витрина</Navbar.Brand>
                <NavDropdown
                      title="Каталог"
                      id={`offcanvasNavbarDropdown-expand`}
                    >
                      <NavDropdown.Item href="#action3">Часы</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Ботинки
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Услуги
                      </NavDropdown.Item>
                    </NavDropdown>

                <Nav className="justify-content-end flex-grow-1 pe-3">

                    <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Найти"
                    />
                    <Link to={'/search'} className="btn btn-primary my-2">Найти</Link>
                  </Form>
                  <Nav.Link href="#action1">Новинки</Nav.Link>
                    <Nav.Link href="#action2">Акции</Nav.Link>

                  </Nav>
                  
                </ul>

                {menu}
            </header> 
        </div>
    );
};

export default connect(
    (state: { user: User }) => ({
        user: state.user
    }),
    (dispatch: Dispatch<any>) => ({
        setUser: (user: User) => dispatch(setUser(user))
    })
)(NavMenu);
