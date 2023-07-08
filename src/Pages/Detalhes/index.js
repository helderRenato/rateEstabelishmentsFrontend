import React, { useState, useMemo, useEffect } from "react";
import NavBar from "../../Components/NavBar";
import style from "./style.module.css"

//Import of Images
import Footer from "../../Components/Footer";
import axios from 'axios';

import { useNavigate } from "react-router-dom";

const DistritoModel = {
    distrito: "",
    codigoine: ""
}

const App = () => {

    const [thumbnail, setThumbnail] = useState(null);
    const [distritos, setDistritos] = useState([DistritoModel])

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [name, setName] = useState(null);
    const [city, setCity] = useState(null);
    const [address, setAddress] = useState(null);
    const [typeestablishment, setTypeEstablishment] = useState(null);
    const [phone, setPhone] = useState(null);

    const USER = localStorage.getItem("type");

    const userType = USER();

    const formData = new FormData();
    formData.append('Email', email);
    formData.append('Password', password);
    formData.append('Name', name);
    formData.append('City', city);
    formData.append('Address', address);
    formData.append('TypeEstablishment', typeestablishment);
    formData.append('File', thumbnail);
    formData.append('Phone', phone);

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

    //value={email} onChange={(evt) => { setEmail(evt.target.value) }}

    return (
        <>
            <NavBar></NavBar>

            <div className={style.container}>
                <div className={style.content}>

                    <label>Nome</label>
                    {USER === "1" && (
                        
                            <input>as</input>
                        
                    )
                    }{USER === "2" && (
                        
                            <label>a</label>
                        
                    )}



                    <label>Email</label>
                    {!USER.phone && (
                        <>
                            <input></input>
                        </>
                    )
                    }{USER.phone &&(
                        <>
                            <label></label>
                        </>
                    )}



                    <label>City</label>
                    {!USER.phone && (
                        <>
                            <input></input>
                        </>
                    )
                    }{USER.phone &&(
                        <>
                            <label></label>
                        </>
                    )}



                    <label>Address</label>
                    {!USER.phone && (
                        <>
                            <input></input>
                        </>
                    )
                    }{USER.phone &&(
                        <>
                            <label></label>
                        </>
                    )}



                    <label>Type of Establishment</label>
                    {!USER.phone && (
                        <>
                            <input></input>
                        </>
                    )
                    }{USER.phone &&(
                        <>
                            <label></label>
                        </>
                    )}



                    <label>Phone</label>
                    {!USER.phone && (
                        <>
                            <input></input>
                        </>
                    )
                    }{USER.phone &&(
                        <>
                            <label></label>
                        </>
                    )}



                </div>
            </div>

            <Footer></Footer>
        </>
    )


}
export default App;