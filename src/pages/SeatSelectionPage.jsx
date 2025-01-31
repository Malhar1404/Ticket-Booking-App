import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SeatSelectionPage = () => {
  const [rows, setRows] = useState([]);
  const [transferData, setTransferData] = useState({
    movieName: "",
    seats: [],
    startTime: "",
    movieTime: "",
    totalPrice: "",
    theatreName: "",
    showTimeId: "",
  });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [layoutPrices, setLayoutPrices] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { showTimeId, noOfSeats, theatreName } = location.state;

  const parsingData = (layout) => {
    const rowsLayout = JSON.parse(layout);
    // console.log(rowsLayout);
    setRows(rowsLayout);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    return date.toLocaleDateString("en-GB", options);
  };

  const movieDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const remainingMinutes = duration % 60;

    return `${hours} hr ${remainingMinutes} min`;
  };

  const seatSelectBtnHandler = (e, rowType, row, column) => {
    const seat = { row, column, layoutType: rowType };
    if (
      selectedSeats.length >= noOfSeats &&
      !selectedSeats.some((s) => s.row === row && s.column === column)
    ) {
      alert(`You can select only ${noOfSeats} seats`);
      return;
    }

    setSelectedSeats((prevSelectedSeats) => {
      const isSelected = prevSelectedSeats.some(
        (selected) => selected.row === row && selected.column === column
      );

      if (isSelected) {
        e.target.style.backgroundColor = "";
        return prevSelectedSeats.filter(
          (selected) => !(selected.row === row && selected.column === column)
        );
      } else {
        // Select the seat
        e.target.style.backgroundColor = "#bbf7fc";
        return [...prevSelectedSeats, seat];
      }
    });
  };

  const totalPriceHandler = () => {
    let total = selectedSeats.reduce((acc, seat) => {
      const price = layoutPrices.find((p) => p.layoutType === seat.layoutType);
      return price ? acc + price.price : acc;
    }, 0);

    console.log("Total Price:", total);

    setTransferData((prevData) => ({
      ...prevData,
      totalPrice: total,
    }));
  };

  const bookNowHandler = () => {
    totalPriceHandler();
    setTransferData((prev) => ({ ...prev, seats: selectedSeats }));
  };

  useEffect(() => {
    if (transferData.totalPrice) {
      navigate("/orderticket", { state: { transferData } });
    }
  }, [transferData.totalPrice]);

  const transferDataHandler = (tfData) => {
    const formatedDate = formatDate(tfData.startTime);
    const duration = movieDuration(tfData.movie.duration);
    const data = {
      movieName: tfData.movie.name,
      seats: selectedSeats,
      startTime: formatedDate,
      movieTime: duration,
      theatreName: theatreName,
      showTimeId: showTimeId,
    };
    setTransferData((prev) => ({ ...prev, ...data }));
  };

  const bookedSeatsList = (bookedSeats) => {
    let formatedBookedSeats = [];

    bookedSeats.forEach((seat) => {
      const formatedSeat = `${seat.row}${seat.column}`;
      formatedBookedSeats = [...formatedBookedSeats, formatedSeat];
    });
    setBookedSeats(formatedBookedSeats);
  };

  useEffect(() => {
    console.log(showTimeId);

    fetch(
      `http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/show-times/${showTimeId}`,
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
        console.log(data.data);
        parsingData(data.data.screen.layout);
        setLayoutPrices(data.data.price);
        bookedSeatsList(
          data.data.orders
            .map((order) => order.seatData.seats) // Get arrays of seats from each order
            .reduce((acc, seats) => acc.concat(seats), []) // Flatten the array
        );
        transferDataHandler(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(transferData);
  }, [transferData]);

  useEffect(() => {
    console.log(bookedSeats);
  }, [bookedSeats]);
  const btnHandler = () => {
    navigate(-1);
  };

  return (
    <div
      className="container-fluid d-flex flex-column"
      style={{ minHeight: "100vh" }}
    >
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
              {rows.map((row) => (
                <div key={row.layout.type}>
                  {/* Row Header */}
                  <div
                    className="p-1"
                    style={{ fontSize: 13, color: "rgb(101, 101, 101)" }}
                  >
                    {`${row.type} $${
                      (
                        layoutPrices.find(
                          (price) => row.type === price.layoutType
                        ) || {}
                      ).price || ""
                    }`}
                  </div>
                  <div className="horizontal-line"></div>

                  {/* Row for Seats */}

                  {row.layout.rows.map((botRow) => (
                    <div key={botRow} className="py-3 mx- row">
                      {[...Array(row.layout.columns[1])].map((_, column) => (
                        <div key={column} className="col-1 mx-1">
                          <button
                            className="date-btn mx-2 p-2"
                            style={{
                              padding: "1px",
                              fontSize: "12px",
                              backgroundColor: bookedSeats.includes(
                                `${botRow}${column + 1}`
                              )
                                ? "grey"
                                : "",
                              cursor: bookedSeats.includes(
                                `${botRow}${column + 1}`
                              )
                                ? "not-allowed"
                                : "pointer",
                            }}
                            onClick={(e) =>
                              seatSelectBtnHandler(
                                e,
                                row.type,
                                botRow,
                                column + 1
                              )
                            }
                            disabled={bookedSeats.includes(
                              `${botRow}${column + 1}`
                            )}
                          >
                            {`${botRow}${column + 1}`}
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
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
        <button
          className="btn btn-primary"
          style={{ padding: "12px 30px", fontSize: "16px" }}
          onClick={() => bookNowHandler({})}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default SeatSelectionPage;
