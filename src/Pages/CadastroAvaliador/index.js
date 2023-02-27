import React from "react";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css"

//Import of Images
import coolStars from "../../assets/cool_stars.svg"
import Footer from "../../Components/Footer";


export default function CadastroAvaliador(){
    return(
        <>
            <NavBar></NavBar>
            <div className={style.container}>
                <div className={style.content}>
                    <form>
                        <label htmlFor="username">Username*</label>
                        <input type={"username"} id="username"></input>

                        <label htmlFor="email">Email*</label>
                        <input type={"email"} id="email" placeholder="Insira aqui o seu email"></input>

                        <label htmlFor="password">Password*</label>
                        <input type={"password"} id="password"></input>

                        <button type={"submit"} className={style.criarContaButton}>Criar Conta</button>
                        
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}