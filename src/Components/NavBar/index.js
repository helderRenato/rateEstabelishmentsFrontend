import React, { useState, useEffect } from 'react';
import style from "./style.module.css"

//Import of Images
import logo from "../../assets/logo.svg"
import coolStars from "../../assets/cool_stars.svg"

//Import React Bootstrap Items
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const [show, setShow] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status

    useEffect(() => {
        // Check if user is logged in
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user); // Set isLoggedIn to true if user exists in local storage
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const nav = useNavigate();

    const handleLogout = () => {
        // Handle logout logic
        localStorage.removeItem('user'); // Remove user from local storage
        localStorage.removeItem('type'); 
        localStorage.removeItem('Estab');
        setIsLoggedIn(false); // Set isLoggedIn to false
        nav("/");
    };

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
                <Container>
                    {/* Logo */}
                    <Navbar.Brand href="/">
                        <img src={logo} height="20px" alt="Logo" />
                    </Navbar.Brand>
                    
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/avaliar">Avaliar</Nav.Link>
                            <Nav.Link href="/sobrenos">Sobre Nós</Nav.Link>
                        </Nav>
                        <Nav>
                            {!isLoggedIn && (
                                <>
                                    <Nav.Link href="/login">Login Como Utilizador</Nav.Link>
                                    <Nav.Link href="/loginEst">Login Como Estabelecimento</Nav.Link>
                                </>
                            )}
                            {isLoggedIn && (
                                <>
                                    
                                    <Button variant="link" className={style.logout} onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </>
                            )}
                            {!isLoggedIn && (
                                <Nav.Link href="#memes" className={style.signup} onClick={handleShow}>
                                    SignUP
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Modal of SignUp */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className={style.decisao}>
                        <a href='/avaliador' className={style.cadastro}>Cadastre-se como avaliador</a>
                        <a href='/estabelecimento' className={style.cadastro}>Cadastre-se como estabelecimento</a>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}