import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css";
import Footer from "../../Components/Footer";
import axios from 'axios';

const App = () => {
    const [datat, setDatat] = useState([]);
    const [commen, setCommen] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [hasRated, setHasRated] = useState(false);
    const [rate, setRate] = useState(false);

    const coment = {
        UserFK: localStorage.getItem('user'),
        Text: commen,
        EstablishmentFK: localStorage.getItem('Estab'),
    }

    const rateU = {
        UserFK: localStorage.getItem('user'),
        Stars: rate
    }

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
        return 0; // Return 0 as the default average when there are no ratings
    };

    //buscar establishment
    const handleSubmit = () => {
        //event.preventDefault();
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

        axios({
            method: 'POST',
            //url pra avaliar
            url: 'https://localhost:7045/api/ratingapi/rating/' + localStorage.getItem('Estab'),
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
            url: 'https://localhost:7045/api/commentapi/deleteAnswer/' + localStorage.getItem('estab'),
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

    useEffect(() => {
        handleSubmit();
    }, []);


    return (
        <>
            <NavBar></NavBar>
            <div className={style.container}>
                <div className={style.content}>
                    <p>{datat.name}</p>
                    <p>{datat.email}</p>
                    <p>{datat.phone}</p>
                    <p>{datat.address}</p>
                    <p>{datat.city}</p>
                    <p>{datat.typeestablishment}</p>

                    <div>

                        <p>Avaliação: {rati()}</p>

                        {!hasRated && (
                            <>
                                <input value={rate} onChange={(evt) => { setRate(evt.target.value) }}></input>
                                <button name="ratingButton" onClick={(evt) => handleSubmit3(evt)} >Rate</button>
                            </>
                        )}
                    </div>
                    
                    <div>
                        {datat.listComments &&
                            datat.listComments.map((Comment) => {
                                if (
                                    Comment.userFK && Comment.userFK === localStorage.getItem("user")
                                ) {
                                    return (
                                        <React.Fragment key={Comment.id}>
                                            <p>{Comment.userFK}</p>
                                            <p>{Comment.text}</p>
                                            <button onClick={(evt) => handleSubmit4(evt)}>Editar</button>
                                            <button onClick={(evt) => handleSubmit5(evt)}>Apagar</button>
                                        </React.Fragment>
                                    );
                                } else {
                                    return (
                                        <React.Fragment key={Comment.id}>
                                            <p>{Comment.userFK}</p>
                                            <p>{Comment.text}</p>
                                        </React.Fragment>
                                    );
                                }
                            })}
                        {!datat.listComments &&
                            
                                <button name="teste" onClick={handlePopupOpen}>
                                    Add Comment
                                </button>
                        }
                            
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