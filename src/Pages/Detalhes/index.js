import React, { useState } from "react";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css";
import Footer from "../../Components/Footer";
import axios from 'axios';

const DistritoModel = {
    distrito: "",
    codigoine: ""
}

const App = () => {
    const [datat, setDatat] = useState([]);
    const [commen, setCommen] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [hasRated, setHasRated] = useState(false);
    const [rate, setRate] = useState(false);

    const coment = {
        User: localStorage.getItem('user'),
        Text: commen,
    }

    const rateU = {
        User: localStorage.getItem('user').id,
        Stars: rate
    }

    const rati = () => {
        let sum = 0;
        datat.listRating.forEach((rating) => {
            sum += rating.stars;
        });
        const average = sum / datat.listRating.length;
        return average;
    }

    //buscar establishment
    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'GET',
            url: 'https://localhost:7045/api/establishmentapi/getData',
            headers: { 'Content-Type': 'application/json' },
            params: {
                id: localStorage.getItem("Estab"),
            }
        })
            .then((response) => {
                alert(response.data);
                console.log(response.data);
                setDatat(response.data);
                const userRating = datat.listRating.find(rating => rating.User.Id === localStorage.getItem("user"));
                if (userRating) {
                    setHasRated(true);
                } else {
                    setHasRated(false);
                }
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    }

    //comentar
    const handleSubmit2 = (event) => {
        event.preventDefault();
        axios({
            method: 'POST',
            //url pra comentar
            url: 'https://localhost:7045/api/commentapi/answer/' + localStorage.getItem('user').id,
            data: coment,
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                alert(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    }

    //avaliar
    const handleSubmit3 = (event) => {
        event.preventDefault();
        // Implement your logic to handle the rating process here
        axios({
            method: 'POST',
            //url pra avaliar
            url: 'https://localhost:7045/api/ratingapi/rating/' + localStorage.getItem('establishment').id,
            data: rateU,
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                alert(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    }

    //editar
    const handleSubmit4 = (event) => {
        event.preventDefault();

    }

    //apagar
    const handleSubmit5 = (event) => {
        event.preventDefault();
        axios({
            method: 'Delete',
            // url pra apagar
            url: 'https://localhost:7045/api/commentapi/deleteAnswer/' + localStorage.getItem('establishment').id,
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                alert(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    }

    const handlePopupOpen = () => {
        setIsPopupOpen(true);
    }

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    }

    return (
        <>
            <NavBar></NavBar>
            <div className={style.container}>
                <div className={style.content}>
                    <button onClick={handleSubmit}>teste</button>
                    <p>{datat.name}</p>
                    <p>{datat.email}</p>
                    <p>{datat.phone}</p>
                    <p>{datat.address}</p>
                    <p>{datat.city}</p>
                    <p>{datat.typeestablishment}</p>

                    <div>
                        {datat.listRating.map((rating) => (
                            <p>Avaliação: {rati()}</p>
                        ))}
                        {!hasRated && (
                            <>
                                <input value={rate} onChange={(evt) => { setRate(evt.target.value) }}></input>
                                <button name="ratingButton" onClick={(evt) => handleSubmit3(evt)} >Rate</button>
                            </>
                        )}
                    </div>

                    <div>
                        {datat.listComment && datat.listComment.map((comment) => {
                            if (comment.User.Id === localStorage.getItem("user")) {
                                return (
                                    <React.Fragment key={comment.Id}>
                                        <p>{comment.User.Username}</p>
                                        <p>{comment.Text}</p>
                                        <button onClick={(evt) => handleSubmit4(evt)}>Editar</button>
                                        <button onClick={(evt) => handleSubmit5(evt)}>Apagar</button>
                                    </React.Fragment>
                                );
                            } else {
                                return (
                                    <React.Fragment key={comment.Id}>
                                        <p>{comment.User.Username}</p>
                                        <p>{comment.Text}</p>
                                    </React.Fragment>
                                );
                            }
                        })}
                        {!datat.listComment || !datat.listComment.some(comment => comment.User.Id === localStorage.getItem("user")) && (
                            <button name="teste" onClick={handlePopupOpen}>Add Comment</button>
                        )}
                    </div>
                </div>
            </div>
            <Footer></Footer>
            {isPopupOpen && (
                <div className={style.popupContainer}>
                    <div className={style.popupContent}>
                        <form onSubmit={handleSubmit2}>
                            <label>O seu comentário:</label>
                            <input value={commen} onChange={(evt) => { setCommen(evt.target.value) }}></input>
                            <button type="submit">Enviar</button>
                            <button onClick={handlePopupClose}>Fechar</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default App;