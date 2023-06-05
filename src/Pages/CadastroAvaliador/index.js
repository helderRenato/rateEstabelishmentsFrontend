import React, { useEffect } from "react";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css"

//Import of Images
import coolStars from "../../assets/cool_stars.svg"
import Footer from "../../Components/Footer";


import axios from 'axios';

const App = () => {
  useEffect(() => {
    document.addEventListener('deviceready', onDeviceReady, false);
  }, []);

  const onDeviceReady = () => {
    const formulario = document.getElementById('formulario');

    if (formulario) {
      formulario.addEventListener('submit', handleSubmit);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    axios({
      method: 'POST',
      // Por aqui o sitio onde por o utilizador
      url: 'http://localhost:3000/avaliador',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return(
    <>
        <NavBar></NavBar>
        <div className={style.container}>
            <div className={style.content}>
                <form id="formulario" method="post">
                    <label htmlFor="username">Username*</label>
                    <input type={"username"} id="username"></input>

                    <label htmlFor="email">Email*</label>
                    <input type={"email"} id="email" placeholder="Insira aqui o seu email"></input>

                    <label htmlFor="password">Password*</label>
                    <input type={"password"} id="password"></input>

                    <button type={"submit"} className={style.criarContaButton}>Criar Conta</button>
                    
                </form>
            </div>
        </div>
        <Footer></Footer>
    </>
)
};

export default App;







