import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css"

//Import of Images
import coolStars from "../../assets/cool_stars.svg"
import Footer from "../../Components/Footer";
import { useState } from "react";

import axios from 'axios';

export default function Home(){
    const [photo, setPhoto] = useState([])
    const [photos, setPhotos] = useState([])
    const type = localStorage.getItem("type")
    const user = localStorage.getItem("user")
    const history = useNavigate()
    
    function redirectToAvaliar(){
        history("/avaliar")
    }

    async function getPhotos(){
        axios({
            method: 'GET',
            url: `https://localhost:7045/api/establishmentapi/getphotos/${user}`,
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                setPhotos(response.data)
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    }

    async function addPhoto(){
        const formData = new FormData();
        formData.append('foto', photo);

        axios({
            method: 'POST',
            // Por aqui o sitio onde por o estabelecimento
            url: `https://localhost:7045/api/establishmentapi/addphoto/${user}`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error.response.data);
            });        
        window.location.reload()
    }

    async function deletePhoto(id){
        const formData = new FormData();
        formData.append('idEstablishment', user);
        axios({
            method: 'DELETE',
            // Por aqui o sitio onde por o estabelecimento
            url: `https://localhost:7045/api/establishmentapi/deletephoto/${id}`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error.response.data);
            });   

            window.location.reload()
    }
    useEffect(() => {
        if(localStorage.getItem("type") == 1){
            redirectToAvaliar()
        }   
        getPhotos()
        console.log(photos)
    }, [])
    return(
        <>
            <NavBar></NavBar>
            {
                (localStorage.getItem("type") == 2)   ? (
                    //Se o utilizador estiver autenticado vamos a apresentar uma página especial para cada 
                    <div>
                        <h1>Fotografias</h1>
                        <div className={style.photos}>
                            {photos.map(photo => (
                                <div>
                                    <img src={`https://localhost:7045/Photos/User/${photo.name}`} width={"200px"} height={"200px"}></img>
                                    <button onClick={() => deletePhoto(photo.id)}>Eliminar</button>
                                </div>
                            ))}
                        </div>

                        <form method="post" onSubmit={addPhoto}>
                            <input type="file" onChange={event => setPhoto(event.target.files[0])}></input>
                            <button type={"submit"}>Submeter</button>
                        </form>
                    </div>
                ) : (
                    <div>
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
                    </div>
                )
            }

            

            <Footer></Footer>
        </>
    )
}