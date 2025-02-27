// import { useEffect } from 'react';
// import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const toggleHandler = (event) => {
    if (event.target.innerText === "Home") {
      navigate("/main");
    } else {
      navigate("/main/myticket");
    }
  };

  const btnHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="d-flex justofy-content-between nav py-2 header_font ">
      <div className="">Cinema</div>
      <div className="d-flex">
        <div className="px-4 ">
          <button
            className="rounded px-2 border-0 bg-transparent text-primary fw-bold"
            onClick={toggleHandler}
          >
            Home
          </button>
        </div>
        <div className="px-4 ">
          <button
            className="rounded px-2 border-0 bg-transparent text-primary fw-bold"
            onClick={toggleHandler}
          >
            My Ticket
          </button>
        </div>
      </div>
      <div className="">
        <button type="button" className="btn btn-danger" onClick={btnHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
