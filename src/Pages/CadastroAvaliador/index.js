import React, { useState, useMemo, useEffect } from "react";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css"

//Import of Images
import coolStars from "../../assets/cool_stars.svg"
import Footer from "../../Components/Footer";


import axios from 'axios';

const App = () => {
  
  /*useEffect(() => {
    document.addEventListener('deviceready', onDeviceReady, false);
  }, []);

  const onDeviceReady = () => {
    const formulario = document.getElementById('formulario');

    if (formulario) {
      formulario.addEventListener('submit', handleSubmit);
    }
  };*/
  
  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };
  const validateUsername = (username) => {
    const usernameRegex = /^[a-z]+(?:\d{1})?$/
    return usernameRegex.test(username);
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
    
    if(!validateEmail(email)){
      alert("Email Inválido")
      return
    }else if(!validatePassword(password)){
        alert("A password deve ter pelo menos 8 caractéres ,conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito e um carácter especial")
        return
    }else if(!validateUsername(username)){
      alert("Username  deve ter todas as letras minúsculas e opcionalmente 1 numero no fim")
      return
    }

    const user = {
      Email: email,
      Password: password,
      Username: username
    }

    axios({
      method: 'POST',
      // Por aqui o sitio onde por o utilizador
      url: 'https://localhost:7045/api/userapi/register',
      data: user,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        alert("Utilizador Criado com sucesso")
        window.location.reload()
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

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);

  return(
    <>
        <NavBar></NavBar>
        <div className={style.container}>
            <div className={style.content}>
                <form id="formulario" method="post">
                    <label htmlFor="username">Username*</label>
                    <input type={"username"} id="username" value={username} required onChange={(evt) => { setUsername(evt.target.value) }}></input>

                    <label htmlFor="email">Email*</label>
                    <input type={"email"} id="email" value={email} required onChange={(evt) => { setEmail(evt.target.value) }} placeholder="Insira aqui o seu email"></input>

                    <label htmlFor="password">Password*</label>
                    <input type={"password"} id="password" value={password} required onChange={(evt) => { setPassword(evt.target.value) }}></input>

                    <button type={"submit"} onClick={(evt) => handleSubmit(evt)} className={style.criarContaButton}>Criar Conta</button>
                    
                </form>
            </div>
        </div>
        <Footer></Footer>
    </>
)
};

export default App;







