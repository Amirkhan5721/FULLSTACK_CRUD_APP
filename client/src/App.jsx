import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home"
import Create from "./Create";
import Read from "./Read";
import Update from "./Update";
import "bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/create" element={ <Create />} />
        <Route path="/read/:id" element={ <Read />} />
        <Route path="/edit/:id" element={ <Update />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </BrowserRouter>
  )
}

export default App
