import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Showlists from "../components/Showlists";
import TicketQuantityModal from "../components/TicketQuantityModal";

const Theatrepage = () => {
  const [movies, setMovies] = useState([]);
  const [theatreData, setTheatreData] = useState({});
  const [movieData, setMovieData] = useState([]);
  const [showTimesFetched, setShowTimesFetched] = useState(false);
  const [dates, setDates] = useState([]);
  const [selectedShowTimeId, setSelectedShowTimeId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  let date = new Date().toLocaleDateString("en-US");
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;

  const getTheatreData = () => {
    fetch(
      `http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/theaters/${id}/movies`,
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

        setTheatreData(data.data);
        setMovies(data.data.movies);
      })
      .catch((error) => {
        console.log(error);
      });
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

    setDates(dates);
  };

  const getMovieShowTimes = (date) => {
    Promise.all(
      movies.map((movie) =>
        fetch(
          `http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/show-times/${movie.id}/by-date?date=${date}`,
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
            // console.log(`Showtimes for ${movie.name}:`, data);
            setMovieData((prevData) => ({
              ...prevData,
              [movie.id]: data, //movie Id key and showtimes as values
            }));
          })
          .catch((error) => console.error("Error fetching showtimes:", error))
      )
    ).then(() => setShowTimesFetched(true));
  };

  const dateBtnHandler = (date) => {
    const dateString = date.trim();
    const [day, monthName, weekday] = dateString.split(" ");

    const monthNames = [
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

    const monthIndex = monthNames.indexOf(monthName.toUpperCase());

    const dateObj = new Date(`2025-${monthIndex + 1}-${day}`);

    const formattedDate = dateObj.toLocaleDateString("en-US");

    getMovieShowTimes(formattedDate);
  };

  useEffect(() => {
    getTheatreData();
    getConsecutiveDates();
  }, []);

  useEffect(() => {
    if (movies.length > 0 && !showTimesFetched) {
      getMovieShowTimes(date);
    }
    // console.log(movies);
  }, [movies]);

  // useEffect(() => {
  //   console.log(movieData);
  // }),
  //   [movieData];

    // useEffect(()=>{
    //   console.log(selectedShowTimeId);
    // },[selectedShowTimeId])

  return (
    <div className="container-fluid p-5">
      <div className="p-4">
        {/* Upper portion */}
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div>
              <div
                className="p-3 fs-2"
                style={{ fontWeight: 800, color: "rgb(42, 126, 204)" }}
              >
                <button
                  className="bg-transparent border-0 text-primary"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <i className="fa-solid fa-arrow-left-long"></i>
                </button>
              </div>
            </div>
            <div className="d-flex flex-column">
              <div
                className="p-2 fs-2"
                style={{ fontWeight: 800, color: "rgb(42, 126, 204)" }}
              >
                {theatreData.name}
              </div>
              <div
                className="d-flex"
                style={{ fontSize: 15, color: "rgb(106, 106, 106)" }}
              >
                <div className="p-1">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="p-1">{theatreData.location}</div>
              </div>
            </div>
          </div>

          <div className="d-flex">
            <div className="py-5">
              <i className="fa-solid fa-chevron-left"></i>
            </div>
            <div>
              <div className="mx-2 my-4 d-flex">
                {dates &&
                  dates.map((fullDate, index) => {
                    const [date, month, day] = fullDate.split(" ");
                    const formattedDate = `${date} ${month}`;

                    return (
                      <div key={index} className="mx-2 mb-3">
                        <button
                          className="date-btn mx-3"
                          onClick={() => {
                            dateBtnHandler(fullDate);
                          }}
                        >
                          <div className="d-flex flex-column">
                            <div className="my-1 mx-2">{formattedDate}</div>
                            <div
                              className="my-1 mx-2"
                              style={{ fontWeight: 700 }}
                            >
                              {day}
                            </div>
                          </div>
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="py-5">
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        </div>

        <div className="horizontal-line"></div>

        <div className="overflow-scroll">
          {/* Lower portion content */}
          {movies.map((movie) => {
            // console.log("movie id :", movie.id, typeof movie.id);

            // Check if movieData[movie.id] is available before rendering
            if (movieData[movie.id]) {
              const newShowTimes = movieData[movie.id]["theaters"].filter(
                (theatre) => theatre.id === id
              );
              // console.log(newShowTimes);
              return (
                <Showlists
                  key={movie.id}
                  movie={movie}
                  showtimes={newShowTimes}
                  setSelectedShowTimeId={setSelectedShowTimeId}
                  setIsModalOpen={setIsModalOpen}
                />
              );
            }

            return null;
          })}
        </div>
      </div>
      <TicketQuantityModal isOpen={isModalOpen} onClose={setIsModalOpen} selectedShowTimeId={selectedShowTimeId} 
      theatreName={theatreData.name}/>
    </div>
  );
};

export default Theatrepage;
