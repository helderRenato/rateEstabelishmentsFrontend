import React, { useState, useEffect } from "react";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css"

//Import of Images
import search from "../../assets/search.svg"
import Footer from "../../Components/Footer";

const DistritoModel = {
    distrito: "",
    codigoine: ""
}

export default function Avaliar() {
    const [distritos, setDistritos] = useState([DistritoModel])
    const [typeestablishment, setTypeEstablishment] = useState(null);
    const [name, setName] = useState(null);

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

    const handleSubmit = (event) => { }

    return (
        <>
            <NavBar></NavBar>

            <div className={style.content}>
                <div className={style.container}>
                    <div className={style.searchbar}>
                        <form>
                            <div className={style.filtroDistrito}>
                                <select >
                                    <optgroup>
                                        <option value={true}>Selecione o distrito</option>

                                        {distritos.map(distritos => {
                                            console.log(distritos.distrito)
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
                                <div className={style.searchButton}><img src={search}></img></div>
                            </div>
                        </form>
                    </div>
                    <div className={style.filterByTipo}>
                        <input type={"radio"} value="restaurante" onChange={onOptionChange} id="restaurante"></input>
                        <label htmlFor="restaurante">Restaurante</label>

                        <input type={"radio"} value="cafe" onChange={onOptionChange} id="cafe"></input>
                        <label htmlFor="cafe">Café</label>

                        <input type={"radio"} value="bar" onChange={onOptionChange} id="bar"></input>
                        <label htmlFor="bar">Bar</label>

                        <input type={"radio"} value="hotel" onChange={onOptionChange} id="hotel"></input>
                        <label htmlFor="hotel">Hotel</label>

                    </div>
                    <div>
                        <label>Nome</label>
                        <label>Distrito</label>
                        <label>Morada</label>
                        <label>Tipo de Estabelecimento</label>
                    </div>
                    <form>

                        <label>Avaliação</label>
                        <input
                            type="number"
                            pattern="[0-5]*"
                        />
                        <button type={"submit"} onClick={(evt) => handleSubmit(evt)}>Avaliar</button>
                    </form>
                </div>
            </div>

            <Footer></Footer>
        </>
    )
}