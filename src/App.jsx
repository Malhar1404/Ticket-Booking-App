// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Signuppage from './pages/Signuppage'
import Homepage from "./pages/Homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Signuppage />} />
        <Route path='/homepage' element={<Homepage/>}/>
      </Routes>
    </Router>
  )
}

export default App
