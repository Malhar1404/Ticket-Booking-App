import { useState, useEffect } from "react";
import Moviecard from "../components/Moviecard";
import Theatrecard from "../components/Theatrecard";

const Homepage = () => {
  const [movieData, setMovieData] = useState([]);
  const [theatreData, setTheatreData] = useState([]);
  const [toggle, setToggle] = useState(true);

  const toggleHandler = () => {
    setToggle(!toggle);
    console.log(toggle);
    if (toggle) {
      getTheatres();
    }
  };

  const getMovies = () => {
    fetch(
      "http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/movies",
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
        // console.log(data);
        setMovieData(data);
        // console.log(movieData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTheatres = () => {
    fetch(
      "http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/theaters",
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
        // console.log(data);
        setTheatreData(data.data);
        // console.log(theatreData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  //State does not changes instantly. so in order to check the state after it has been changed, we use useEffect
  // useEffect(() => {
  //     console.log(movieData);
  // }, [movieData]);

  return (
    <div className="container-fluid">
      {/* under header text */}
      <div className="d-flex flex-column under-header-text mx-5 my-5">
        <div>Now Showing</div>
        <div className="d-flex">
          <div className="navigation-button">
            <button
              type="button"
              className="btn btn-primary hover_button"
              onClick={toggleHandler}
            >
              Movie
            </button>
          </div>
          <div className="navigation-button">
            <button
              type="button"
              className="btn btn-primary hover_button"
              onClick={toggleHandler}
            >
              Theatre
            </button>
          </div>
        </div>
      </div>

      {/* movies section */}
      <div className="d-flex flex-wrap my-1 w-100 mx-5">
        {toggle ? (
          movieData.map((movie) => (
            <Moviecard
              key={movie.Id}
              movieimage={movie.image}
              moviename={movie.name}
            />
          ))
        ) : (
          <div className="row w-100">
            {theatreData?.map((theatre) => (
              <Theatrecard
                key={theatre.Id}
                theatrename={theatre.name}
                location={theatre.location}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
