import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css"
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import { Rating } from "@mui/material";

//Import of Images
import coolStars from "../../assets/cool_stars.svg"
import Footer from "../../Components/Footer";
import { useState } from "react";

import axios from 'axios';

export default function Home(){
    const [show, setShow] = useState(false);
    const [photo, setPhoto] = useState([])
    const [est, setEst] = useState({})
    const [photos, setPhotos] = useState([])
    const type = localStorage.getItem("type")
    const user = localStorage.getItem("user")
    const [distritos, setDistritos] = useState([])
    const [ratings, setRatings] = useState([])
    const [comments, setComments] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //Variaveis que servem de auxiliares para editarem os dados do estabelecimento
    const [name, setName] = useState(null);
    const [city, setCity] = useState(null);
    const [address, setAddress] = useState(null);
    const [typeestablishment, setTypeEstablishment] = useState(null);
    const [phone, setPhone] = useState(null);

    const [response, setResponse] = useState("") //Variavel utilizada para responder aos comentarios dos utilizador
    const history = useNavigate()
    
    const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberRegex = /^(91|92|93|96)\d{7}$/;
        return phoneNumberRegex.test(phoneNumber);
      };
      
    //Esta função vai servir para converter o tipo enum que vem da api a string
    function convertEnumTypeToString(){
        if(est.typeEstablishment == 0){
            return "Restaurante"
        }else if(est.typeEstablishment == 1){
            return "Café"
        }else if(est.typeEstablishment == 2){
            return "Bar"
        }else{
            return "Hotel"
        }
    }

    function redirectToAvaliar(){
        history("/avaliar")
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
                alert("Fotografia adicionada com sucesso")
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
                alert("Foto eliminada com sucesso!")
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


    }

    async function getEstablishment(){
        axios({
            method: 'GET',
            url: `https://localhost:7045/api/establishmentapi/get/${user}`,
        })
            .then((response) => {
                setEst(response.data)
                setPhotos(response.data.listPhotos) //Aproveitar e retirar já as fotos do estabelecimento
                setRatings(response.data.listRatings)
                setComments(response.data.listComments)
            })
            .catch((error) => {
                console.error(error.response.data);
            });   
    }

    async function fetchDistritos() {
        const response = await fetch("https://json.geoapi.pt/distritos")
        const data = response.json()

        return data
    }

    async function getDistritos() {
        const data = await fetchDistritos()
        setDistritos(data)
    }

    async function editarEstablishment(){

        if(!validatePhoneNumber(phone)){
            alert("Por Favor insira um nº de telemóvel válido")
            return
        }
        const formData = new FormData();
        formData.append('Email', est.email);
        formData.append('Password', est.password);
        formData.append('Name', name == undefined ? est.name : name);
        formData.append('City', city == undefined ? est.city : city);
        formData.append('Address', address == undefined ? est.address : address);
        formData.append('TypeEstablishment', typeestablishment ==  undefined ? est.typeEstablishment : typeestablishment);
        formData.append('File', new File([""], "filename"));
        formData.append('Phone', phone == undefined ? est.phone : phone);

        console.log()
        axios({
            method: 'POST',
            url: `https://localhost:7045/api/establishmentapi/edit/${user}`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then((response) => {
                alert("Os dados do estabelecimento foram alterados com sucesso")
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
            
    }

  

    //Função que vai calcular a media de stars que o estabelecimento recebeu
    function getRatingMedia(){
        var media = 0

        ratings.forEach(rating => {
            media += rating.stars
        });

        media = media / ratings.length

        return Math.ceil(media)
    }

    //Função responsável para responder aos comentários dos utilizadores 
    async function answer(id){
        const obj  = {
            response: response, 
            text: "", 
            UserFK: 0, 
            EstablishmentFK: 0
        }

        axios({
            method: 'POST',
            url: `https://localhost:7045/api/commentapi/answer/${id}`,
            data: obj,
            headers: { 'Content-Type': 'application/json'  },
        })
            .then((response) => {
                setEst(response.data)
                window.location.reload() 
            })
            .catch((error) => {
                alert(error.response.data);
            });  
        
    }

    //Função responsável para eliminar a resposta 
    async function eliminarResposta(id){
        axios({
            method: 'DELETE',
            url: `https://localhost:7045/api/commentapi/deleteanswer/${id}`,
        })
            .then((response) => {
                alert("Comentário eliminado com sucesso")
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
        
    }

    //Buscar os dados do utilizador
    async function denuciarComment(id){
        axios({
            method: 'POST',
            url: `https://localhost:7045/api/commentapi/denunciar/${id}`,
        })
            .then((response) => {
                alert("Comentário denunciado")
            })
            .catch((error) => {
                console.log(error.response.data)
            });  
    }

    useEffect(() => {
        if(localStorage.getItem("type") == 1){
            redirectToAvaliar()
        }   

        getEstablishment()
        getDistritos()
            //Atribuir os valores padrão as variáveis de auxilio 
        setName(est.name)
        setCity(est.city)
        setAddress(est.address)
        setTypeEstablishment(est.typeEstablishment)
        setPhone(est.phone)

       
    }, [])
    
    return(
        <>
            <NavBar></NavBar>
            {
                (localStorage.getItem("type") == 2)   ? (
                    //Se o utilizador estiver autenticado vamos a apresentar uma página especial para cada 
                    <div>
                        <div className="container">
                            <div className="row">
                                <div>
                                    <h1>{est.name}</h1>
                                    <Carousel variant="dark">
                                        
                                        {photos.map(photo => (
                                            <Carousel.Item>
                                                <img className="d-block w-100" src={`https://localhost:7045/Photos/User/${photo.name}`}height={"300px"}></img>
                                                <Carousel.Caption>
                                                    <button className="d-block" onClick={() => deletePhoto(photo.id)}>Eliminar</button>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                    
                                    
                                    <div className={style.addPhoto}>
                                        <form onSubmit={addPhoto}>
                                            <div className="form-group">
                                                <input type="file" className="form-control" onChange={event => setPhoto(event.target.files[0])}></input>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Adicionar Fotografia</button>
                                        </form>
                                    </div>
                                    
                                    <h1>Dados do estabelecimento</h1>
                                    <div className={style.dados}>
                                        <p><strong>Endereço: </strong>{est.address}</p>
                                        <p><strong>Cidade: </strong>{est.city}</p>
                                        <p><strong>Nº de telemóvel: </strong>{est.phone}</p>
                                        <p><strong>Tipo de estabelecimento: </strong>{convertEnumTypeToString()}</p>
                                        <button type="submit" className="btn btn-primary" onClick={handleShow}>Editar Dados</button>
                                    </div>
                                    
                                </div>
                                <div>
                                    <h1>Avaliações</h1>
                                    <div className={style.rating}>
                                        <strong>Avaliação geral: </strong>
                                        <Rating name="size-large" value={getRatingMedia()} size="large" readOnly/>
                                        <strong>({ratings.length})</strong>
                                        
                                    </div>
                                    
                                    <h4>Comentários</h4>
                                    <div className={style.comments}>
                                        {comments.map(comment => (
                                            <div className={style.comment}>
                                                <div>
                                                    <p><strong>Username: </strong>{}</p>
                                                    <p>{comment.text}</p>
                                                    
                                                </div>

                                                {/*Só aparece a resposta caso o comentário tiver a resposta */}
                                               { comment.response ? (
                                                    <div className={style.answer}>
                                                        <strong>Resposta: </strong>{comment.response}<br/>
                                                        <button onClick={() => eliminarResposta(comment.id)}>Eliminar Resposta</button>
                                                    </div>
                                               ) : (
                                                    <form>
                                                        <div className="form-group">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col-sm">
                                                                        <input type={"text"} className="form-control" onChange={event => setResponse(event.target.value)}></input>
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        <button type="submit" className="btn btn-primary" onClick={() => answer(comment.id)}>Responder</button>   
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        <button onClick={() => denuciarComment(comment.id)}>Denunciar</button>  
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                               )}
                                                
                                                <div>
                                                   
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                <form onSubmit={editarEstablishment}>
                    <div className="form-group">
                        <label for="nome">Nome</label>
                        <input type="text" className="form-control" id="nome" required defaultValue={est.name}  onChange={(evt) => { setName(evt.target.value) }}/>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlSelect1">Distrito</label>
                        <select className="form-control" value={city} defaultValue={est.city} required onChange={(evt) => { setCity(evt.target.value)}}>
                            <optgroup>
                                    {distritos.map(distritos => {
                                        return <option key={distritos.distrito}>{distritos.distrito}</option>
                                    }
                                    )}
                            </optgroup>
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="end">Endereço:</label>
                        <input type="text" className="form-control" required id="end" defaultValue={est.address}  onChange={(evt) => { setAddress(evt.target.value) }}/>
                    </div>
                    <div className="form-group">
                        <label for="phone">Telémovel:</label>
                        <input type="text" className="form-control" required id="phone" defaultValue={est.phone}  onChange={(evt) => { setPhone(evt.target.value) }}/>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlSelect2">Tipo de Estabelecimento</label>
                        <select className="form-control" value={typeestablishment} defaultValue={est.typeEstablishment} required onChange={(evt) => { setTypeEstablishment(evt.target.value) }}>
                                    <optgroup>
                                        <option value={0}>Restaurante</option>
                                        <option value={1}>Café</option>
                                        <option value={2}>Bar</option>
                                        <option value={3}>Hotel</option>
                                    </optgroup>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">Editar</button>
                </form>
                </Modal.Body>
            </Modal>
        </>
    )
}