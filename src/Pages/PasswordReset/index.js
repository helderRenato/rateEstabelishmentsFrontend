import React, { useState, useMemo, useEffect } from "react";

import NavBar from "../../Components/NavBar";
import style from "./style.module.css"

//Import of Images
import Footer from "../../Components/Footer";
import axios from 'axios';

import { useNavigate, useParams} from "react-router-dom";


const App = () => {
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/;
        return passwordRegex.test(password);
      };
      
    const handleSubmit = (event) => {
        event.preventDefault();


          if(!validatePassword(password)){
            alert("A password deve ter pelo menos 8 caractéres ,conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito e um carácter especial")
            return
        }else if(password != confirmarPassword){
            alert("As passwords têm de ser iguais por favor repita")
            return
        }
        const user = {
            Email: email,
            Password: password,
            confirmarPassword: confirmarPassword
        }

        if(id == 1){
            axios({
                method: 'POST',
                url: 'https://localhost:7045/api/userapi/resetpass',
                data: user,
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => {
                    alert("Password Alterada com sucesso!");
                    nav("/");
                })
                .catch((error) => {
                    alert(error.response.data);
                });
        }else{
            axios({
                method: 'POST',
                url: 'https://localhost:7045/api/establishmentapi/resetpass',
                data: user,
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => {
                    alert("Password Alterada com sucesso!");
                    nav("/");
                })
                .catch((error) => {
                    alert(error.response.data);
                });
        }


    };

    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [confirmarPassword, setConfirmarPassword] = useState(null);
    const {id} = useParams() //Esta variável vai identificar se o utilizador é um estabelecimento ou um utilizador
    
    const nav = useNavigate();

    return (
        <>
            <NavBar></NavBar>

            <div className={style.container}>
                <div className={style.content}>
                    <form id="formulario" method="post">

                        <label htmlFor="email">Email*</label>
                        <input type={"email"} id="email" value={email} onChange={(evt) => { setEmail(evt.target.value) }} placeholder="Insira aqui o seu email"></input>

                        <label htmlFor="password">Password*</label>
                        <input type={"password"} id="password" value={password} onChange={(evt) => { setPassword(evt.target.value) }}></input>

                        <label htmlFor="password">Confirmar Password*</label>
                        <input type={"password"} id="password" value={confirmarPassword} onChange={(evt) => { setConfirmarPassword(evt.target.value) }}></input>

                        <button type={"submit"} onClick={(evt) => handleSubmit(evt)} className={style.iniciarSessaoButton}>Alterar Password</button>

                    </form>
                </div>
            </div>

            <Footer></Footer>
        </>
    )

};

export default App;

