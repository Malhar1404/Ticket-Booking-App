import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Movieleftsection = ({ theatreData = [], transferData }) => {
  const [showTimeData, setShowTimeData] = useState(theatreData);
  const [theatreId, setTheatreId] = useState("");
  const [showTimes, setShowTimes] = useState([]);
  const [times, setTimes] = useState([]);
  const [timeCardData, setTimeCardData] = useState([]);
  const [transferDataBody, setTransferDataBody] = useState({
    theatreId: "",
    showTime: "",
    showDate: "",
    theatreName: "",
  });

  // let transferDataBody = {
  //   theatreId: "",
  //   showTime: "",
  //   showDate: "",
  //   theatreName: "",
  // }

  const navigate = useNavigate();

  const getConsecutiveDates = () => {
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const today = new Date(); // Get today's date
    const dates = [];

    for (let i = 0; i < 6; i++) {
      const currentDate = new Date(today); // Create a copy of today's date
      currentDate.setDate(today.getDate() + i); // Add `i` days to get consecutive dates

      const day = currentDate.getDate(); // Day of the month
      const month = months[currentDate.getMonth()]; // Month in short format
      const dayOfWeek = daysOfWeek[currentDate.getDay()]; // Day of the week

      dates.push(`${day} ${month} ${dayOfWeek}`);
    }

    setTimeCardData(dates);
  };

  useEffect(() => {
    getConsecutiveDates();
  }, []);

  const theatreSelectHandler = (theatre) => {
    setTheatreId(theatre.id);
    setShowTimes(theatre.showtimes);
    console.log(transferDataBody);

    const updatedData = { 
      ...transferDataBody, 
      theatreId: theatre.id, 
      theatreName: theatre.name 
    };
    setTransferDataBody(updatedData);
    transferData(transferDataBody);
    generateShowTime();
  };

  const showTimeSelectHandler = (e) => {
    console.log(transferDataBody);
    const updatedData = { ...transferDataBody, showTime: e.target.innerText };
    setTransferDataBody(updatedData);
    transferData(transferDataBody);
  };

  const showDateSelectHandler = (fullDate) => {
    console.log(transferDataBody);
    const updatedData = { ...transferDataBody, showDate: fullDate };
    setTransferDataBody(updatedData);
    transferData(transferDataBody);
  };

  const generateShowTime = () => {
    const time = showTimes.map((showTime) => {
      const updatedTime = showTime.startTime.slice(11, 16);
      return updatedTime;
    });
    setTimes(time);
  };

  useEffect(() => {
    setShowTimeData(theatreData);
  }, [theatreData]);

  useEffect(() => {
    if (showTimes.length > 0) {
      generateShowTime();
    }
  }, [showTimes]);

  useEffect(() => {
    // Notify the parent whenever transferDataBody changes
    transferData(transferDataBody);
  }, [transferDataBody, transferData]);
  

  const btnHandler = () => {
    navigate("/main");
  };

  return (
    <div className="my-3">
      <div className="d-flex mx-5">
        <button className="d-flex bg-transparent border-0" onClick={btnHandler}>
          <div
            className="mx-1"
            style={{ color: "#AEAEAE", fontSize: 25, fontWeight: 600 }}
          >
            ←
          </div>
          <div
            className="mx-1"
            style={{ color: "#AEAEAE", fontSize: 25, fontWeight: 600 }}
          >
            Back
          </div>
        </button>
      </div>

      {/* Dates Section */}
      <div className="date mx-5 my-4">
        <div className="header_font mb-3">
          <span>Date</span>
        </div>
        <div className="d-flex flex-wrap justify-content-start">
          {timeCardData.map((fullDate, index) => {
            const [date, month, day] = fullDate.split(" ");
            const formattedDate = `${date} ${month}`;
            return (
              <div key={index} className="mx-2 mb-3">
                <button
                  className="date-btn"
                  onClick={() => {
                    showDateSelectHandler(fullDate);
                  }}
                >
                  <div className="d-flex flex-column text-center">
                    <div className="my-1">{formattedDate}</div>
                    <div className="my-1" style={{ fontWeight: 700 }}>
                      {day}
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Theatre Section */}
      <div className="theatre mx-5 my-4">
        <div className="header_font mb-3">
          <span>Theatre</span>
        </div>
        <div className="d-flex flex-wrap justify-content-start">
          {showTimeData.map((theatre) => (
            <div className="mx-2 mb-3" key={theatre.id}>
              <button
                className="theatre-btn"
                onClick={() => theatreSelectHandler(theatre)}
              >
                {theatre.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Time Section */}
      <div className="time mx-5 my-4">
        <div className="header_font mb-3">
          <span>Time</span>
        </div>
        <div className="d-flex flex-wrap justify-content-start">
          {times.map((time) => (
            <div key={time} className="mx-2 mb-3">
              <button
                className="theatre-btn px-4"
                onClick={showTimeSelectHandler}
              >
                {time}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movieleftsection;
