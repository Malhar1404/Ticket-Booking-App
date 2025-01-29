import { Navigate, useNavigate } from "react-router-dom";

const Showlists = ({ movie = {}, showtimes = [] }) => {
  const navigate = useNavigate();
  const calculateDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  };

  const btnHandler = ()=>{
    navigate("/no-of-seats");
  }

  const movieDuration = movie.duration
    ? calculateDuration(movie.duration)
    : "N/A";

  return (
    <div>
      <div className="d-flex py-4">
        <div className="d-flex flex-column w-100">
          <div className="py-1 mx-3 fs-4 fw-bold">{movie.name}</div>
          <div className="py-1 mx-3">
            {Array.isArray(movie.languages)
              ? movie.languages.join(", ") // Joining the languages with commas
              : "Languages not available"}
          </div>
          <div className="py-1 mx-3">{movieDuration}</div>

          {/* Showtimes rendering */}
          <div className="d-flex py-2 mx-1">
            {showtimes[0].showtimes.length > 0 ? (
              showtimes[0].showtimes.map((show) => {
                const time = show.startTime.slice(11, 16);
                return (
                  <button key={show.showTimeId} className="theatre-btn mx-2">
                    {time}
                  </button>
                );
              })
            ) : (
              <p className="mx-2 px-1">No showtimes available</p>
            )}
          </div>
        </div>

        {/* Book Now button */}
        <div className="d-flex w-100 justify-content-end align-items-center">
          <div>
              <button className="btn btn-primary w-100" onClick={btnHandler}>Book Now</button>
          </div>
        </div>
      </div>
      <div className="horizontal-line"></div>
    </div>
  );
};

export default Showlists;
