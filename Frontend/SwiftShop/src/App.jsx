import React from "react"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./Pages/Home"
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home/*" element={<Home />} />
          </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
