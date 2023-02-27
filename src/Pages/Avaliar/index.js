import React, {useState, useEffect}from "react";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css"

//Import of Images
import search from "../../assets/search.svg"
import Footer from "../../Components/Footer";


export default function Avaliar(){
    const [distritos, setDistritos] = useState([])

    async function fetchDistritos(){
        const response = await fetch("https://json.geoapi.pt/distritos") 
        const data = response.json()

        return data
    }

    async function getDistritos(){
        const data = await fetchDistritos()
        setDistritos(data)
    }

    useEffect(() => {
        getDistritos()
    }, [])

    return(
        <>
            <NavBar></NavBar>
            
            <div className={style.content}>
                <div className={style.container}>
                    <div className={style.searchbar}>
                        <form>
                            <div className={style.filtroDistrito}>
                                <select>
                                    <optgroup>
                                        <option selected={true}>Selecione o distrito</option>
                                            {distritos.map(distritos => 
                                                <option>{distritos}</option>    
                                            )}
                                    </optgroup>
                                </select>
                            </div>
                            <div className={style.text}>
                                <div>
                                    <input type={"text"} placeholder="Procure Aqui o seu restaurante..."></input>                 
                                </div>
                                <div className={style.searchButton}><img src={search}></img></div>
                            </div>
                        </form>
                    </div>
                    <div className={style.filterByTipo}>
                        <input type={"radio"} id="hotel"></input>
                        <label htmlFor="hotel">Hotel</label>
                        
                        <input type={"radio"} id="restaurante"></input>
                        <label htmlFor="restaurante">Restaurante</label>
                    </div>
                </div>
            </div>
           
            <Footer></Footer>
        </>
    )
}