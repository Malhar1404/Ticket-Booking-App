// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Signuppage from "./pages/Signuppage";
import Homepage from "./pages/Homepage";
import Layout from "./pages/Layout";
import Myticket from "./pages/Myticket";
import Moviepage from "./pages/Moviepage";
import Theatrepage from "./pages/Theatrepage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import OrderTicket from "./components/OrderTicket";
import Successpage from "./pages/Succespage";
import TicketPage from "./pages/TicketPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signuppage />} />
        <Route path="/main" element={<Layout />}>
          {/* Child routes */}
          <Route index element={<Homepage />} /> {/* Default route */}
          {/* dont give absolute path in child routes */}
          <Route path="myticket" element={<Myticket />} />
          <Route path="moviepage" element={<Moviepage />} />
          <Route path="theatrepage" element={<Theatrepage />} />
        </Route>
        <Route path="/seatselection" element={<SeatSelectionPage />} />
        <Route path="/orderticket" element={<OrderTicket />}></Route>
        <Route path="/success" element={<Successpage />} />
        <Route path="/ticket" element={<TicketPage />} />
      </Routes>
    </Router>
  );
}

export default App;
