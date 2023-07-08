import React, { useState, useEffect } from "react";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css"

//Import of Images
import search from "../../assets/search.svg"
import Footer from "../../Components/Footer";

import axios from 'axios';

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
                alert(response.data);
                console.log(response.data);
                //setEstab(response.data);
                //localStorage.setItem('establ', response.data);
                setDatat(response.data);
            })
            .catch((error) => {
                console.error(error.response.data);
                //localStorage.removeItem('establ');
                //setEstab(null);
            });

    }

    const handleSubmit2 = (event) => {

    }

    return (
        <>
            <NavBar></NavBar>

            <div className={style.content}>
                <div className={style.container}>
                    <div className={style.searchbar}>
                        <form>
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
                                <div className={style.searchButton}>
                                    <img src={search} onClick={(evt) => handleSubmit1(evt)}></img>
                                </div>

                            </div>
                        </form>
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

                    <div>
                        {datat.map(estab =>
                            <div key={estab.id}>
                                <p>{estab.name} - {estab.city} - {estab.phone}</p>
                                <div>
                                    {estab.listPhotos.map(photo => (
                                        <img width="300" height="300" key={photo.Id} src={`https://localhost:7045/Photos/User/${photo.name}`} alt="Establishment Photo" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>


                    <form>

                        <label>Avaliação</label>
                        <input
                            type="number"
                            pattern="[0-5]*"
                        />
                        <button type={"submit"} onClick={(evt) => handleSubmit2(evt)}>Avaliar</button>

                    </form>
                </div>
            </div>

            <Footer></Footer>
        </>
    )
}

export default App;