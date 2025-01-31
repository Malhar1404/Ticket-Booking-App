import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OrderTicket = () => {
  const location = useLocation();
  const { transferData } = location.state;
  // const [resStatus, setResStatus] = useState(0);
  const navigate = useNavigate();

  let dataFormat = {
    showtimeId: "",
    seatData: {
      seats: [],
    },
  };

  const redirectHandler = (url, orderId) => {
    localStorage.setItem("orderId", orderId);
    window.open(url, "_blank");
  };

  const fetchHandler = () => {
    fetch(
      "http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(dataFormat),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // setResStatus(data.statusCode);
        if (data.statusCode === 400) {
          alert(data.message, "You are late!!");
          navigate("/seatselection");
        } else {
          redirectHandler(data.paymentUrl, data.orderId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const payBtnHandler = () => {
    dataFormat = {
      ...dataFormat,
      showtimeId: transferData.showTimeId,
      seatData: { ...dataFormat.seatData, seats: transferData.seats },
    };
    console.log(transferData.showTimeId);

    console.log(dataFormat);
    fetchHandler();
  };

  const cancelBtnHandler = () => {
    navigate("/main");
  };

  useEffect(() => {
    console.log(transferData);
  }, []);
  return (
    <div className="container-fluid p-5">
      <div className="container col-5 border rounded border-2 border-primary">
        <div className="styled-border blue-border  border-2 px-5">
          <div className="heading-cov my-3">
            <div className="heading blue-large fs-1 px-0 fw-bold text-primary">
              Booking Detail
            </div>
          </div>
          <div className="title-cov my-2">
            <div className="label font-secondary text-black fs-5">
              Movie Title
            </div>
            <div className="movie-name font-secondary text-black-50 fs-4">
              {transferData.movieName}
            </div>
          </div>
          <div className="title-cov my-4">
            <div className="label font-secondary text-black fs-5">Theater</div>
            <div className="movie-name font-secondary text-black-50 fs-4">
              {transferData.theatreName}
            </div>
          </div>
          <div className="title-cov my-4">
            <div className="label font-secondary text-black fs-5">Date</div>
            <div className="movie-name font-secondary text-black-50 fs-4">
              {transferData.startTime}
            </div>
          </div>
          <div className="title-cov my-4 d-flex justify-content-between">
            <div className="w-100">
              <div className="label font-secondary text-black fs-5">Ticket</div>
              <div className="movie-name font-secondary text-black-50 fs-4 d-flex">
                {transferData.seats.map((seat) => `${seat.row}${seat.column} `)}
              </div>
            </div>
            <div className="w-75">
              <div className="label font-secondary text-black fs-5">Hours</div>
              <div className="movie-name font-secondary text-black-50 fs-4">
                {transferData.movieTime}
              </div>
            </div>
          </div>
          <div className="tran-details">
            <div className="blue-font fs-6 px-0">Transaction</div>
            <div className="line border my-2"></div>
            <div className="d-flex justify-content-between fs-5 text-secondary mb-5">
              <div className="space font-primary text-black">Total Payment</div>
              <div className="amount font-primary text-black">
                {transferData.totalPrice}
              </div>
            </div>
          </div>
          <div className="note font-secondary fs-6 my-2">
            *purchased ticket cannot be cancelled
          </div>
          <button
            type="button"
            className="btn-primary w-100 my-3 p-2"
            onClick={payBtnHandler}
          >
            {`Total Pay $${transferData.totalPrice} Proceed`}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary w-100 my-3 p-2"
            onClick={cancelBtnHandler}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTicket;
