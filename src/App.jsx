import { useState, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./component/Home"
import Register from "./component/Register"
import Login from "./component/Login"
import Nav from "./component/Nav"

function App() {

    return (
        <BrowserRouter>
            <Nav/>
            <Routes>
                <Route index element={<Home />} />
                <Route path='/register'  element={<Register />} />
                <Route path='/login'  element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App