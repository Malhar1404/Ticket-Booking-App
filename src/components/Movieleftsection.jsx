import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Movieleftsection = ({ theatreData = [], transferData, setDate ,selectedShowTime, setTheatreName}) => {
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
  // const [selectedShowTimeId, setSelectedShowTimeId] = useState("");

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const monthNames = {
      JAN: "01",
      FEB: "02",
      MAR: "03",
      APR: "04",
      MAY: "05",
      JUN: "06",
      JUL: "07",
      AUG: "08",
      SEP: "09",
      OCT: "10",
      NOV: "11",
      DEC: "12",
    };

    // Extract day, month, and year parts from the given string
    const parts = dateString.split(" ");
    const day = parts[0]; // "30"
    const month = monthNames[parts[1]]; // "01" for JAN
    const currentYear = new Date().getFullYear(); // Get the current year

    // Format the date as MM/DD/{current year}
    const formattedDate = `${month}/${day.padStart(2, "0")}/${currentYear}`;
    setDate(formattedDate);
  };

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
    console.log(theatre.name);
    
    setTheatreName(theatre.name);

    const updatedData = {
      ...transferDataBody,
      theatreId: theatre.id,
      theatreName: theatre.name,
    };
    setTransferDataBody(updatedData);
    transferData(transferDataBody);
    generateShowTime();
  };

  const showTimeSelectHandler = (e) => {
    const showTime = showTimes.filter((showTime) => {
      return showTime.startTime.slice(11, 16) === e.target.innerText;
    });

    const updatedData = { ...transferDataBody, showTime: e.target.innerText };
    setTransferDataBody(updatedData);
    transferData(transferDataBody);
    selectedShowTime(showTime[0].showTimeId);
  };

  const showDateSelectHandler = (fullDate) => {
    formatDate(fullDate);
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
    const updatedTheatreData = theatreData.filter((theatre) => {
      return theatre.showtimes.length > 0;
    });
    setShowTimeData(updatedTheatreData);
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

  // useEffect(() => {
  //   console.log(showTimeData);
  // }, [showTimeData]);

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
                className="theatre-btn d-flex"
                onClick={() => theatreSelectHandler(theatre)}
              >
                <div className="px-2">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>{theatre.name}</div>
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
          {showTimeData.length > 0 && times && times.length > 0 ? (
            times.map((time) => (
              <div key={time} className="mx-2 mb-3">
                <button
                  className="theatre-btn px-4"
                  onClick={showTimeSelectHandler}
                >
                  {time}
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: "red" }}>*Select Theatre First</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movieleftsection;
