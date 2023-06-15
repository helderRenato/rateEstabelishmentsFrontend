import React, { useState } from 'react';
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

export default function NavBar(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
        <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
            <Container>

                {/*Logo */}
                <Navbar.Brand href="/">
                    <img src={logo} height="20px"></img>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/avaliar">Avaliar</Nav.Link>
                    <Nav.Link href="#pricing">Sobre Nós</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="#memes" className={style.signup} onClick={handleShow}>SignUP</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>

            {/*Modal of SignUp */}
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