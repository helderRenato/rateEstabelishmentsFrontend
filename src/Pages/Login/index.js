import React, { useState, useMemo, useEffect } from "react";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css"

//Import of Images
import Footer from "../../Components/Footer";
import axios from 'axios';

import { useNavigate } from "react-router-dom";

const App = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        

        const user = {
            Email: email,
            Password: password,
        }

        axios({
            method: 'POST',
            
            url: 'https://localhost:7045/api/userapi/login',
            data: user,
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                setUser(response.data);
                localStorage.setItem('user', response.data.id);
                localStorage.setItem('type', '1');

                console.log(response.data);
                nav("/avaliar");
            })
            .catch((error) => {
                alert(error.response.data);
            });
    };

    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [user, setUser] = useState(null);
    const nav = useNavigate();


    return (
        <>
            <NavBar></NavBar>

            <div className={style.container}>
                <div className={style.content}>
                    <form id="formulario" method="get" onSubmit={(evt) => handleSubmit(evt)}>

                        <label htmlFor="email">Email*</label>
                        <input type={"email"} id="email" required value={email} onChange={(evt) => { setEmail(evt.target.value) }} placeholder="Insira aqui o seu email"></input>

                        <label htmlFor="password">Password*</label>
                        <input type={"password"} id="password" required value={password} onChange={(evt) => { setPassword(evt.target.value) }}></input>

                        <a href="/resetpass/1">Esqueceu-se da password</a>
                        <button type={"submit"} className={style.iniciarSessaoButton}>Iniciar Sessão</button>

                    </form>
                </div>
            </div>

            <Footer></Footer>
        </>
    )

};

export default App;

