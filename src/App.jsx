// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Signuppage from './pages/Signuppage'
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Layout from "./pages/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signuppage />} />
        <Route path="/main" element={<Layout />}>
          {/* Child routes */}
          <Route index element={<Homepage />} /> {/* Default route */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
