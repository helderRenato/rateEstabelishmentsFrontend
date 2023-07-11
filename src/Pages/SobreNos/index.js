import React from "react";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css"
import Footer from "../../Components/Footer";

export default function SobreNos(){
    return(
        <>
            <NavBar></NavBar>
            <div className={style.content}>
                <div className="d-flex justify-content-center">
                    <div>
                        <p><strong>Nome do Curso: </strong>Engenharia Informática</p>
                        <h4><strong>Autores do trabalho: </strong></h4>
                        <p>Hélder Ribeiro Nº23029</p>
                        <p>João Francisco Nº21876</p>
                    </div>

                </div>
            </div>
            <Footer/>
        </>
    )
}