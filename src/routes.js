import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Avaliar from './Pages/Avaliar'
import CadastroAvaliador from './Pages/CadastroAvaliador'
import CadastroEstabelecimento from './Pages/CadastroEstabelecimento'
import Home from "./Pages/Home"
import Login from './Pages/Login'


export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/avaliador' element={<CadastroAvaliador/>}></Route>
                <Route path='/estabelecimento' element={<CadastroEstabelecimento/>}></Route>
                <Route path='/avaliar' element={<Avaliar/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}