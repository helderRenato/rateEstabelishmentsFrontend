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

  const handleSubmit = (event) => {
    event.preventDefault();
    //const formData = new FormData();
    //formData.append('Email', email);
    //formData.append('Password', password);
    //formData.append('Username', username);
    
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
        alert(response.data);
      })
      .catch((error) => {
        console.error(error.response.data);
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
                    <input type={"username"} id="username" value={username} onChange={(evt) => { setUsername(evt.target.value) }}></input>

                    <label htmlFor="email">Email*</label>
                    <input type={"email"} id="email" value={email} onChange={(evt) => { setEmail(evt.target.value) }} placeholder="Insira aqui o seu email"></input>

                    <label htmlFor="password">Password*</label>
                    <input type={"password"} id="password" value={password} onChange={(evt) => { setPassword(evt.target.value) }}></input>

                    <button type={"submit"} onClick={(evt) => handleSubmit(evt)} className={style.criarContaButton}>Criar Conta</button>
                    
                </form>
            </div>
        </div>
        <Footer></Footer>
    </>
)
};

export default App;







