import { useEffect, useState } from "react";
import Ticketcard from "../components/Ticketcard";

const Myticket = () => {
  const [toggle, setToggle] = useState(true);
  const [ticketData, setTicketData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);

  const toggleHandler = (event) => {
    if (event.target.innerText === "Upcoming") {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  useEffect(() => {
    fetch(
      "http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/orders",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTicketData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (toggle) {
      const splitTicketData = ticketData.filter(
        (ticket) => ticket.status === "PENDING"
      );
      setUpcomingData(splitTicketData);
    } else {
      const splitTicketData = ticketData.filter(
        (ticket) => ticket.status === "COMPLETED"
      );
      setHistoryData(splitTicketData);
    }
  }, [toggle, ticketData]);

  return (
    <div className="container-fluid">
      <div className="d-flex flex-column under-header-text mx-5 my-5">
        <div className="d-flex">
          <div className="navigation-button">
            <button
              type="button"
              className="btn btn-primary hover_button w-auto"
              onClick={toggleHandler}
            >
              Upcoming
            </button>
          </div>
          <div className="navigation-button">
            <button
              type="button"
              className="btn btn-primary hover_button"
              onClick={toggleHandler}
            >
              History
            </button>
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {toggle
          ? upcomingData.map((ticket) => (
              <div key={ticket.id} className="px-2 py-4">
                <Ticketcard ticket={ticket} />
              </div>
            ))
          : historyData.map((ticket) => (
              <div key={ticket.id} className="px-2 py-4">
                <Ticketcard ticket={ticket} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Myticket;
