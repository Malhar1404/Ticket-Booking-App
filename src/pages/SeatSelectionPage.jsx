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
  });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [layoutPrices, setLayoutPrices] = useState([]);
  const [count, setCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const { showTimeId, noOfSeats } = location.state;

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

  const seatSelectBtnHandler = (e) => {
    const seat = e.target.innerText;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats((prevSelectedSeats) => {
        const updatedSeats = prevSelectedSeats.filter(
          (selected) => selected !== seat
        );
        e.target.style.backgroundColor = "";
        return updatedSeats;
      });
      setCount((prevCount) => prevCount - 1);
    } else {
      if (count < noOfSeats) {
        setSelectedSeats((prevSelectedSeats) => {
          const updatedSeats = [...prevSelectedSeats, seat];
          e.target.style.backgroundColor = "#bbf7fc";
          return updatedSeats;
        });
        setCount((prevCount) => prevCount + 1);
      } else {
        alert("You can select only " + noOfSeats + " seats");
      }
    }
  };

  const totalPriceHandler = () => {
    let total = 0;

    selectedSeats.forEach((seat) => {
      rows.forEach((row) => {
        if (row.layout.rows.includes(seat.slice(0, 1))) {
          const price = layoutPrices.find(
            (price) => price.layoutType === row.type
          );

          if (price) {
            total += price.price;
          }
        }
      });
    });

    // console.log(total);

    setTransferData((prevData) => ({
      ...prevData,
      totalPrice: total,
    }));
  };

  const bookNowHandler = () => {
    totalPriceHandler();
    setTransferData((prev) => ({ ...prev, seats : selectedSeats }));
  };

  const transferDataHandler = (tfData) => {
    const formatedDate = formatDate(tfData.startTime);
    const duration = movieDuration(tfData.movie.duration);
    const data = {
      movieName: tfData.movie.name,
      seats: selectedSeats,
      startTime: formatedDate,
      movieTime: duration,
    };
    setTransferData((prev) => ({ ...prev, ...data }));
  };

  // useEffect(() => {
  //   // console.log(rows);
  // }, [rows]);
  // useEffect(() => {
  //   // console.log(layoutPrices);
  // }, [layoutPrices]);

  useEffect(() => {
    console.log(transferData);
  }, [transferData]);

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
        transferDataHandler(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
                      {Array(row.layout.columns[1])
                        .fill()
                        .map((_, column) => (
                          <div key={column} className="col-1 p-1 mx-1 d-flex">
                            <button
                              className="date-btn mx-2"
                              style={{ padding: "1px", fontSize: "12px" }}
                              onClick={seatSelectBtnHandler}
                            >
                              <div className="d-flex">
                                <div className="m-1 mx-2">{`${botRow}${
                                  column + 1
                                }`}</div>
                              </div>
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
          Book Now
        </button>
      </div>
    </div>
  );
};

export default SeatSelectionPage;
