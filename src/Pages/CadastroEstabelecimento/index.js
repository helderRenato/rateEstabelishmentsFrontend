import React, { useState, useMemo, useEffect } from 'react';
import NavBar from "../../Components/NavBar";
import style from "./style.module.css"
import Footer from "../../Components/Footer";

//Import of Images
import coolStars from "../../assets/cool_stars.svg"
import camera from "../../assets/camera.svg"

import axios from 'axios';

const DistritoModel = {
    distrito: "",
    codigoine: ""
}

const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^(91|92|93|96)\d{7}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/;
    return passwordRegex.test(password);
  };

const App = () => {

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!validateEmail(email)){
            alert("Email Inválido")
            return
        }else if(!validatePassword(password)){
            alert("A password deve ter pelo menos 8 caractéres ,conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito e um carácter especial")
            return
        }else if(!validatePhoneNumber(phone)){
            alert("Por Favor insira um nº de telemóvel válido")
            return
        }
        const formData = new FormData();
        formData.append('Email', email);
        formData.append('Password', password);
        formData.append('Name', name);
        formData.append('City', city);
        formData.append('Address', address);
        formData.append('TypeEstablishment', typeestablishment);
        formData.append('File', thumbnail);
        formData.append('Phone', phone);

        axios({
            method: 'POST',
            // Por aqui o sitio onde por o estabelecimento
            url: 'https://localhost:7045/api/establishmentapi/register',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then((response) => {
                console.log("Estabelecimento criado");
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
    };

    const [thumbnail, setThumbnail] = useState(null);
    const [distritos, setDistritos] = useState([DistritoModel])

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [name, setName] = useState(null);
    const [city, setCity] = useState(null);
    const [address, setAddress] = useState(null);
    const [typeestablishment, setTypeEstablishment] = useState(null);
    const [phone, setPhone] = useState(null);
    
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

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

    return (
        <>
            <NavBar></NavBar>
            <div className={style.container}>
                <div className={style.content}>

                    <label
                        id={style.thumbnail}
                        style={{ backgroundImage: `url(${preview})` }}
                        className={thumbnail ? style.hasthumbnail : ''}
                    >
                        <input type="file" required onChange={event => setThumbnail(event.target.files[0])}></input>
                        <img src={camera} alt="Select img"></img>
                    </label>
                    <form id="formulario" method="post">


                        <label htmlFor="email">Email*</label>
                        <input type={"email"} id="email" value={email} required onChange={(evt) => { setEmail(evt.target.value) }} placeholder="Insira aqui o seu email"></input>

                        <label htmlFor="password">Password*</label>
                        <input type={"password"} required value={password} onChange={(evt) => { setPassword(evt.target.value) }} id="password"></input>

                        <label htmlFor="nome">Nome do Estabelecimento*</label>
                        <input type={"text"} id="nome" required value={name} onChange={(evt) => { setName(evt.target.value) }}></input>

                        <label htmlFor="phone">Telémovel*</label>
                        <input type={"text"} id="phone" required value={phone} onChange={(evt) => { setPhone(evt.target.value) }}></input>

                        <div>
                            <div>
                                <label htmlFor="tipo">Tipo*</label>
                                <select value={typeestablishment} required onChange={(evt) => { setTypeEstablishment(evt.target.value) }}>
                                    <optgroup>
                                        <option>Selecione o Tipo de Estabelecimento</option>
                                        <option value="0">Restaurante</option>
                                        <option value="1">Café</option>
                                        <option value="2">Bar</option>
                                        <option value="3">Hotel</option>
                                    </optgroup>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="distrito">Distrito*</label>
                                <select value={city} required onChange={(evt) => { setCity(evt.target.value) }}>
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

                        </div>

                        <label htmlFor="endereco">Endereço*</label>
                        <input type={"text"} required id="endereco" value={address} onChange={(evt) => { setAddress(evt.target.value) }}></input>

                        <button type={"submit"} onClick={(evt) => handleSubmit(evt)} className={style.criarContaButton}>Criar Conta</button>

                    </form>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
};

export default App;