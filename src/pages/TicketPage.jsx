import { useEffect } from "react";
import Ticketcard from "../components/Ticketcard";
import { useState } from "react";

const TicketPage = () => {
  const [ticketData, setTicketData] = useState([]);
  useEffect(() => {
    fetch(
      `http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/orders/${localStorage.getItem(
        "orderId"
      )}`,
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
        console.log(data);
        setTicketData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="d-flex justify-content-center align-items-center p-5 m-1">
      <div className="d-flex justify-content-center align-items-center p-5 m-3">
        <div className="d-flex justify-content-center align-items-center p-5 m-5">
          <Ticketcard ticket={ticketData} />
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
