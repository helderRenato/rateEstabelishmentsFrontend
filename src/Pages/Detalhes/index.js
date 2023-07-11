import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css";
import Footer from "../../Components/Footer";
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { Rating } from '@mui/material';

const App = () => {

    //variavel que guarda os valores obtidos do GET Request
    const [datat, setDatat] = useState([]);
    //vaiavel que guarda o texto do comentario
    const [commen, setCommen] = useState([]);
    //variavel que guarda o estado do popup
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    //variavel que funciona como flag pra saber se o user ja avaliou o estabelecimento
    const [hasRated, setHasRated] = useState(false);
    //variavel que guarda o valor da avaliacao do user ao estabelecimento
    const [rate, setRate] = useState(false);
    //variavel que funciona como flag pra saber se o user ja comentou o estabelecimento
    const [aux, setAux] = useState(false);

    //guardar no objeto coment a userFK, o texto e a establishmentFK
    const coment = {
        UserFK: localStorage.getItem('user'),
        Text: commen,
        EstablishmentFK: localStorage.getItem('Estab'),
    }

    //guardar no objeto rateU a userFK e Stars
    const rateU = {
        UserFK: localStorage.getItem('user'),
        Stars: rate
    }

    //função que calcula a média das ratings do estabelecimento
    const rati = () => {
        let sum = 0;
        if (datat && datat.listRatings && datat.listRatings.length > 0) {
            datat.listRatings.forEach((rating) => {
                sum += rating.stars;
            });
            const average = sum / datat.listRatings.length;
            //console.log("Average:", average);
            return average;
        }
        return 0; //
    };

    //buscar establishment
    const handleSubmit = () => {
        //event.preventDefault();
        axios({
            method: 'GET',
            url: `https://localhost:7045/api/establishmentapi/get/${localStorage.getItem("Estab")}`,
            headers: { 'Content-Type': 'application/json' },
            params: {
                id: localStorage.getItem("Estab"),
            }
        })
            .then((response) => {
                //alert(response.data);
                console.log(response.data);
                setDatat(response.data);

                const userRating = response.data.listRatings.find(rating => rating.userFK.toString() == localStorage.getItem("user"));
                setHasRated(userRating !== undefined);

                const userComment = response.data.listComments.find(comment => comment.userFK.toString() == localStorage.getItem("user"));
                setAux(userComment !== undefined);

                
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    }



    //comentar
    const handleSubmit2 = (event) => {
        console.log("erro:", datat.listComments);

        event.preventDefault();
        axios({
            method: 'POST',
            //url pra comentar
            url: 'https://localhost:7045/api/commentapi/comment',
            data: coment,
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                //alert(response.data);
                console.log(response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    }

    //avaliar
    const handleSubmit3 = (event) => {
        event.preventDefault();

        axios({
            method: 'POST',
            //url pra avaliar
            url: 'https://localhost:7045/api/ratingapi/rating/' + localStorage.getItem('Estab'),
            data: rateU,
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                //alert(response.data);
                console.log(response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    }

    //apagar
    const handleSubmit5 = async (event, idte) => {
        event.preventDefault();
        
        try {
          await axios.delete(`https://localhost:7045/api/commentapi/deleteComment/${idte}`, {
            headers: { 'Content-Type': 'application/json' },
          });
          console.log('Comment deleted successfully');
          window.location.reload();
        } catch (error) {
          console.error('Error deleting comment:', error);
          alert('Failed to delete comment');
        }
      };

    const handlePopupOpen = () => {
        setIsPopupOpen(true);
    }

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    }

    useEffect(() => {
        handleSubmit();
    }, []);

    

    const convertEnumTypeToString=() =>{
        if(datat.typeEstablishment == 0){
            return "Restaurante"
        }else if(datat.typeEstablishment == 1){
            return "Café"
        }else if(datat.typeEstablishment == 2){
            return "Bar"
        }else{
            return "Hotel"
        }
    }
    return (
        <>
            <NavBar></NavBar>
            <div className={style.container}>
                <div className={style.content}>

                    <Carousel variant="dark">
                        {datat.listPhotos && datat.listPhotos.length > 0 && datat.listPhotos.map(photo => (
                            <Carousel.Item>
                                <img className="d-block w-100" src={`https://localhost:7045/Photos/User/${photo.name}`} height={"300px"}></img>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <p><strong>Nome: </strong>{datat.name}</p>
                    <p><strong>Email: </strong>{datat.email}</p>
                    <p><strong>Nº de telemóvel: </strong>{datat.phone}</p>
                    <p><strong>Endereço: </strong>{datat.address}</p>
                    <p><strong>Cidade: </strong>{datat.city}</p>
                    <p><strong>Tipo de estabelecimento: </strong>{convertEnumTypeToString()}</p>

                    <div>



                        <div className={style.rating}>
                            <strong>Avaliação geral: </strong>
                            {datat.listRatings ? (
                                <>
                                    <Rating name="size-large" value={rati()} size="large" readOnly />
                                    <strong>({datat.listRatings.length})</strong>
                                </>
                            ) : (
                                <span>No ratings yet</span>
                            )}
                        </div>

                        {!hasRated && (
                            <>
                                <input value={rate} onChange={(evt) => { setRate(evt.target.value) }}></input>
                                <button name="ratingButton" className="btn btn-primary" onClick={(evt) => handleSubmit3(evt)} >Avaliar</button>
                            </>
                        )}
                    </div>

                    {isPopupOpen && (
                        <div className={style.popupContainer}>
                            <div className={style.popupContent}>
                                <form onSubmit={handleSubmit2}>
                                    <label><strong>O seu comentário: </strong></label>
                                    <input value={commen} onChange={(evt) => { setCommen(evt.target.value) }}></input>
                                    <button className="btn btn-primary" type="submit">Enviar</button>
                                    <button className="btn btn-primary" margin-top="10" onClick={handlePopupClose}>Fechar</button>
                                </form>
                            </div>
                        </div>
                    )}

                    <div>
                        {datat.listComments && datat.listComments.length > 0 &&
                            datat.listComments.map((Comment) => {

                                if (
                                    Comment.userFK && Comment.userFK == localStorage.getItem("user")
                                ) {
                                    return (
                                        <div key={Comment.id}>
                                            <p><strong>Username: </strong>{Comment.userFK}</p>
                                            <p><strong>Comentário: </strong>{Comment.text}</p>

                                            <button className="btn btn-primary" onClick={(evt) => handleSubmit5(evt, Comment.id)}>Apagar</button>
                                        </div>
                                    );
                                }

                                else {
                                    return (
                                        <div key={Comment.id}>
                                            <p><strong>Username: </strong>{Comment.userFK}</p>
                                            <p><strong>Comentário: </strong>{Comment.text}</p>
                                        </div>
                                    );
                                }
                            })}

                        {datat.listComments && datat.listComments.length > 0 && !aux &&

                            <button name="teste" className="btn btn-primary" onClick={handlePopupOpen}>
                                Add Comment
                            </button>

                        }
                        {!datat.listComments || datat.listComments.length == 0 &&

                            <button name="teste" className="btn btn-primary" onClick={handlePopupOpen}>
                                Add Comment
                            </button>
                        }

                    </div>
                </div>
            </div>
            <Footer></Footer>

        </>
    )
}

export default App;