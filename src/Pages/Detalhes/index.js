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

    //const USER = localStorage.getItem("type");
    const [datat, setDatat] = useState([]);




    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'GET',

            url: 'https://localhost:7045/api/establishmentapi/getData',
            //data: user,
            headers: { 'Content-Type': 'application/json' },
            params: {
                id: localStorage.getItem("Estab"),
            }
        })
            .then((response) => {
                alert(response.data);
                console.log(response.data);
                //setEstab(response.data);
                //localStorage.setItem('establ', response.data);
                setDatat(response.data);
            })
            .catch((error) => {
                console.error(error.response.data);
                //localStorage.removeItem('establ');
                //setEstab(null);
            });

    }


    return (
        <>
            <NavBar></NavBar>

            <div className={style.container}>
                <div className={style.content}>

                    <button onClick={(evt) => handleSubmit(evt)}> teste</button>
                    <p>{datat.name}</p>
                    <p>{datat.email}</p>
                    <p>{datat.phone}</p>
                    <p>{datat.address}</p>
                    <p>{datat.city}</p>
                    <p>{datat.typeestablishment}</p>

                    <div>
                        {datat.listComment && datat.listComment.map((comment) => {
                            if (comment.User.Id === localStorage.getItem("user")) {
                                return (
                                    <React.Fragment key={comment.Id}>
                                        <p>{comment.User.Username}</p>
                                        <p>{comment.Text}</p>
                                    </React.Fragment>
                                );
                            } else {
                                return (
                                    <>
                                        <p>{comment.User.Username}</p>
                                        <p>{comment.Text}</p>
                                    </>
                                )
                            }
                        })}
                    </div>
                </div>
            </div >

            <Footer></Footer>
        </>
    )


}
export default App;