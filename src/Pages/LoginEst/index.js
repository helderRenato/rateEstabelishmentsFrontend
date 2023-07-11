import React, { useState, useMemo, useEffect } from "react";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css"

//Import of Images
import Footer from "../../Components/Footer";
import axios from 'axios';

import { useNavigate } from "react-router-dom";


const App = () => {

    const validateEmail = (email) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
      };
    
      const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberRegex = /^(91|92|93|96)\d{7}$/;
        return phoneNumberRegex.test(phoneNumber);
      };
    
      const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/;
        return passwordRegex.test(password);
      };
    const handleSubmit = (event) => {
        event.preventDefault();
        //const formData = new FormData();
        //formData.append('Email', email);
        //formData.append('Password', password);
        //formData.append('Username', username);

        if(!validatePassword(password)){
            alert("A password deve ter pelo menos 8 caractéres ,conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito e um carácter especial")
            return
        }

        const user = {
            Email: email,
            Password: password,
        }

        axios({
            method: 'POST',
            
            url: 'https://localhost:7045/api/establishmentapi/login',
            data: user,
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                setUser(response.data);
                localStorage.setItem('user', response.data.id);
                localStorage.setItem('type', '2');
                
                console.log(response.data);
                nav("/");
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data)
                  } else if (error.request) {
                    console.log(error.request);
                  } else {
                    console.log('Error', error);
                  }
            });
    };

    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [user, setUser] = useState(null);
    const nav = useNavigate();

    return (
        <>
            <NavBar></NavBar>

            <div className={style.container}>
                <div className={style.content}>
                    <form id="formulario" method="get" onSubmit={(evt) => handleSubmit(evt)}>

                        <label htmlFor="email">Email*</label>
                        <input type={"email"} id="email" value={email} onChange={(evt) => { setEmail(evt.target.value) }} placeholder="Insira aqui o seu email"></input>

                        <label htmlFor="password">Password*</label>
                        <input type={"password"} id="password" value={password} onChange={(evt) => { setPassword(evt.target.value) }}></input>

                        <a href="/resetpass/2">Esqueceu-se da password</a>
                        <button type={"submit"} className={style.iniciarSessaoButton}>Iniciar Sessão</button>

                    </form>
                </div>
            </div>

            <Footer></Footer>
        </>
    )

};

export default App;

