import React, { useState } from 'react';
import style from "./style.module.css"

//Import of Images
import logo from "../../assets/logo_white.svg"
import Button from 'react-bootstrap/Button';

export default function Footer(){
    return(
        <>
            <footer>
                <div className={style.footerLogo}>
                    <img src={logo}></img>
                </div>
            </footer>
        </>
    )
}