import React , {useState, useMemo, useEffect} from 'react';
import NavBar from "../../Components/NavBar";
import style from "./style.module.css"
import Footer from "../../Components/Footer";

//Import of Images
import coolStars from "../../assets/cool_stars.svg"
import camera from "../../assets/camera.svg"

export default function CadastroEstabelecimento(){
    const [thumbnail, setThumbnail] = useState(null);
    const [distritos, setDistritos] = useState([])

    const preview = useMemo( () => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

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
            <div className={style.container}>
                <div className={style.content}>

                <label 
                id = {style.thumbnail}
                style = {{backgroundImage: `url(${preview})`}}
                className = {thumbnail ? style.hasthumbnail :''} 
                >
                    <input type = "file" onChange = {event => setThumbnail(event.target.files[0])}></input>
                    <img src = {camera} alt ="Select img"></img>
                </label>
                    <form>
                     

                        <label htmlFor="email">Email*</label>
                        <input type={"email"} id="email" placeholder="Insira aqui o seu email"></input>

                        <label htmlFor="password">Password*</label>
                        <input type={"password"} id="password"></input>

                        <label htmlFor="nome">Nome do Estabelecimento*</label>
                        <input type={"text"} id="nome"></input>

                        <div>
                            <div>
                                <label htmlFor="tipo">Tipo*</label>
                                <select>
                                    <optgroup>
                                        <option selected={true}>Selecione o tipo</option>
                                        <option>Hotel</option>
                                        <option>Restaurante</option>
                                    </optgroup>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="distrito">Distrito*</label>
                                <select>
                                    <optgroup>
                                        <option selected={true}>Selecione o distrito</option>

                                        {distritos.map(distritos => 
                                            <option>{distritos}</option>    
                                        )}
                                    </optgroup>
                                </select>
                            </div>

                        </div>

                        <label htmlFor="endereco">Endereço*</label>
                        <input type={"text"} id="endereco"></input>

                        <button type={"submit"} className={style.criarContaButton}>Criar Conta</button>
                        
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}