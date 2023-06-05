import React from "react";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css"

//Import of Images
import Footer from "../../Components/Footer";


export default function Login(){
    return(
        <>
            <NavBar></NavBar>

            <div className={style.container}>
                <div className={style.content}>
                    <form >
                        
                        <label htmlFor="email">Email*</label>
                        <input type={"email"} id="email" placeholder="Insira aqui o seu email"></input>

                        <label htmlFor="password">Password*</label>
                        <input type={"password"} id="password"></input>

                        <button type={"submit"} className={style.iniciarSessaoButton}>Iniciar Sessão</button>
                        
                    </form>
                </div>
            </div>

            <Footer></Footer>
        </>
    )
}


