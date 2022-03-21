// import react from 'react'
import { Routes, Route } from 'react-router-dom'
import Client from './../pages/Client';

export default function Router() {
    return (       
        <Routes>                                              
            <Route path="/" element={<Client/>} >
                <Route path="/client" index  element={<Client/>} />
            </Route>
        </Routes>
    )
}