import React from "react";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css"

//Import of Images
import coolStars from "../../assets/cool_stars.svg"
import Footer from "../../Components/Footer";


import { useEffect } from 'react';
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
        <div className={style.apresentation}>
            <div className={style.aprentationImg}>
                <img src={coolStars} height="100%"></img>
            </div>
            <div className={style.aprentationText}>
                <p>Descubra o que os outros estão<br/>
                a falar sobre os seus<br/>
                <span className={style.aprentationText_span1}>estabelecimentos</span> favoritos:<br/>
                compartilhe as suas <span className={style.aprentationText_span2}>experiências</span> e avalie os<br/>
                lugares que você já visitou!<br/></p>
                <a href="/avaliador" className={style.cadastroButton}>Cadastre-se</a>
            </div>
        </div>

        <div className={style.apresentationForEstabelishments}>
            <div className={style.aprentationTextForEstabelishments}>
                Junte-se à nossa comunidade e crie já a sua conta para deixar<br/>
                o seu estabelecimento aberto ao feedback dos seus clientes.
            </div>
            <div>
                <a href="/estabelecimento" className={style.cadastroButton}>Cadastre-se</a>
            </div>
        </div>

        <Footer></Footer>
    </>
)
};

export default App;

    
