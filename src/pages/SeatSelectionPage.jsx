import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SeatSelectionPage = () => {

    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);
    const [transferData, setTransferData] = useState({
      movieName: "",
      seats : [],
      startTime: "",
      movieTime: "",
      totalCharge : ""
    });
    const [selectedSeats, setSelectedSeats] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const showTimeId = location.state.showTimeId;


    const parsingData= (layout)=>{
      const layoutRows = JSON.parse(layout);
    }

    useEffect(() => {
      fetch(`http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/show-times/${showTimeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);

        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    const btnHandler = () => {
        navigate(-1);
    }

    return (
      <div className="container-fluid d-flex flex-column" style={{ minHeight: "100vh" }}>
        <div className="d-flex flex-column p-5 flex-grow-1">
          {/* Header */}
          <div className="d-flex header mb-3">
              <button className="bg-transparent border-0" onClick={btnHandler}>
              <div className="m-1 text-primary">
                <i className="fa-solid fa-arrow-left"></i>
              </div>
              </button>

            <div className="m-1">Select Seat</div>
          </div>
  
          {/* Seat Selection */}
          <div className="d-flex flex-column flex-grow-1">
            <div className="row py-3">
              <div className="col-3"></div>
              <div className="col-6">
                {/* Render Rows */}
                {[1, 2, 3].map((row, rowIndex) => (
                  <div key={rowIndex}>
                    {/* Row Header */}
                    <div className="p-1" style={{ fontSize: 13, color: "rgb(101, 101, 101)" }}>
                      ₹520 platinum
                    </div>
                    <div className="horizontal-line"></div>
  
                    {/* Row for Seats */}
                    <div className="py-3 row">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((seatNumber, index) => (
                        <div key={index} className="col-1 p-1 mx-1 d-flex">
                          <button
                            className="date-btn mx-2"
                            style={{ padding: "1px", fontSize: "12px" }}
                          >
                            <div className="d-flex ">
                              <div className="m-1 mx-2">A{seatNumber}</div>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-3"></div>
            </div>
          </div>
  
          {/* Screen Section */}
          <div className="screen-div d-flex flex-column align-items-center justify-content-center mb-5">
            <div className="screen"></div>
            <div className="text-center" style={{ color: "rgb(107, 104, 104)" }}>
              All eyes this way please!
            </div>
          </div>
          <div className="horizontal-line"></div>
        </div>
  
        {/* Book Now Button */}
        <div className="d-flex justify-content-center mb-5">
          <a href="#">
            <button
              className="btn btn-primary"
              style={{ padding: "12px 30px", fontSize: "16px" }}
            >
              Book Now
            </button>
          </a>
        </div>
      </div>
    );
  };
  
  export default SeatSelectionPage;
  