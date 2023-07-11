import React, { useState, useEffect } from "react";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css"

//Import of Images
import search from "../../assets/search.svg"
import Footer from "../../Components/Footer";
import loading from "../../assets/loading.svg"

import axios from 'axios';
import { useNavigate } from "react-router-dom";
const DistritoModel = {
    distrito: "",
    codigoine: ""
}

const App = () => {
    const [distritos, setDistritos] = useState([DistritoModel])
    const [typeestablishment, setTypeEstablishment] = useState(null);
    const [name, setName] = useState(null);
    const [city, setCity] = useState(null);
    const [estab, setEstab] = useState(null);
    const [datat, setDatat] = useState([]);
    const [isLoading, setisLoading] = useState(false); 
    
    const nav = useNavigate();

    const PATH ="https://localhost:7045/Photos/User/";

    async function fetchDistritos() {
        const response = await fetch("https://json.geoapi.pt/distritos")
        const data = response.json()

        return data
    }

    async function getDistritos() {
        const data = await fetchDistritos()
        setDistritos(data)
    }

    useEffect(() => {
        getDistritos()
    }, [])

    const onOptionChange = e => {
        setTypeEstablishment(e.target.value);
    }

    const handleSubmit1 = (event) => {
        event.preventDefault();
        setisLoading(true)
        axios({
            method: 'GET',

            url: 'https://localhost:7045/api/establishmentapi/getFiltered',
            //data: user,
            headers: { 'Content-Type': 'application/json' },
            params: {
                name: name,
                city: city,
                typeestablishment: typeestablishment
            }
        })
            .then((response) => {
                setDatat(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
            });
        setisLoading(false)
    }

    const EstablishmentSelected = (id) => {
        localStorage.setItem("Estab", id);
        nav("/detalhes");
    }

    return (
        <>
            {isLoading ? (
                <div>
                    <NavBar></NavBar>
                    <div className={style.Loading}>
                        <img src={loading}></img>
                    </div>
                </div>
            ) : (


                <div>
                <NavBar></NavBar>
                <div className={style.content}>
                <div className={style.container}>
                    <div className={style.searchbar}>
                        <form onSubmit={(evt) => handleSubmit1(evt)}>
                            <div>
                                <div className={style.filtroDistrito}>
                                    <select value={city} onChange={(evt) => { setCity(evt.target.value) }} >
                                        <optgroup>
                                            <option value={true}>Selecione o distrito</option>

                                            {distritos.map(distritos => {
                                                //console.log(distritos.distrito)
                                                return <option key={distritos.distrito}>{distritos.distrito}</option>
                                            }
                                            )}
                                        </optgroup>
                                    </select>
                                </div>
                                <div className={style.text}>
                                    <div>
                                        <input type={"text"} value={name} onChange={(evt) => { setName(evt.target.value) }} placeholder="Procure Aqui o estabelecimento..."></input>
                                    </div>
                                    <button onClick={(evt) => handleSubmit1(evt)} type={"submit"} className={style.searchButton}>
                                        <img src={search}></img>
                                    </button>

                                </div>
                            </div>

                            <div className={style.filterByTipo}>
                                <input type={"radio"} name="tipo" value="restaurante" onChange={onOptionChange} id="restaurante"></input>
                                <label htmlFor="restaurante">Restaurante</label>

                                <input type={"radio"} name="tipo" value="café" onChange={onOptionChange} id="cafe"></input>
                                <label htmlFor="cafe">Café</label>

                                <input type={"radio"} name="tipo" value="bar" onChange={onOptionChange} id="bar"></input>
                                <label htmlFor="bar">Bar</label>

                                <input type={"radio"} name="tipo" value="hotel" onChange={onOptionChange} id="hotel"></input>
                                <label htmlFor="hotel">Hotel</label>

                            </div>
                        </form>
                    </div>


                    <div className={style.results}>
                        {datat.map(estab =>
                            <div key={estab.id} className={style.result} onClick={() => EstablishmentSelected(estab.id)}>
                                <div class="container">
                                    <div class="row">

                                        <div class="col-sm">
                                            <img width="250" height="200" key={estab.listPhotos[0].name.Id} src={`https://localhost:7045/Photos/User/${estab.listPhotos[0].name}`} alt="Establishment Photo" />
                                        </div>

                                        <div class="col-sm">
                                            <h4>{estab.name}</h4>
                                            <p><strong>Nº de Telémovel: </strong>{estab.phone}</p>
                                            <p><strong>Cidade: </strong>{estab.city}</p>
                                            <p><strong>Endereço: </strong>{estab.address}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                
                            </div>
                        )}
                    </div>

                </div>
                </div>
                <Footer></Footer>
                </div>
            )}

        </>
    )
}

export default App;