import { useNavigate  } from "react-router-dom";

const Ticketcard = ({ ticket = {} }) => {

  const navigate = useNavigate();
  const formatDate = (dateString)=> {
    // Parse the date string and create a new Date object
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date)) {
      return "Invalid Date";
    }

    // Options for formatting the date
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    // console.log(date.toLocaleDateString("en-US", options));
    // Convert the date to the local time zone and return the formatted string
    return date.toLocaleDateString("en-US", options);
  }

  const formatTime=(dateString) => {
    const date = new Date(dateString);
  
    if (isNaN(date)) {
      return "Invalid Date";
    }
  
    let hours = date.getHours();
    let minutes = date.getMinutes();
  
    const period = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${hours}:${minutes} ${period}`;
  }

  const btnHandler = () =>{
    navigate('/download-pdf');
  }

  return (
    <div
      className="d-flex flex-column border border-primary rounded-4 shadow-lg p-4"
      style={{
        width: "370px",
        background: "linear-gradient(135deg, #eef2f3, #dbe9f4)",
      }}
    >
      {/* Date Section */}
      <div className="d-flex flex-column mb-3">
        <div className="fs-6 text-dark fw-semibold text-uppercase opacity-75">
          📅 Date
        </div>
        <div className="fs-5 text-primary fw-bold">
          {formatDate(ticket.showtime.startTime)}
        </div>
      </div>

      {/* Movie Title Section */}
      <div className="d-flex flex-column mb-3">
        <div className="fs-6 text-dark fw-semibold text-uppercase opacity-75">
          🎬 Movie
        </div>
        <div className="fs-5 text-dark-emphasis fw-bold">{ticket.showtime.movie.name}</div>
      </div>

      {/* Ticket & Time Row */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <div className="fs-6 text-dark fw-semibold text-uppercase opacity-75">
            🎫 Seats
          </div>
          <div className="fs-5 text-success fw-bold">{ticket.seatData.seats.map(seat => {
            return (
              `${seat.row}${seat.column} `
            )
          })}</div>
        </div>
        <div className="d-flex flex-column text-end">
          <div className="fs-6 text-dark fw-semibold text-uppercase opacity-75">
            🕒 Time
          </div>
          <div className="fs-5 text-danger fw-bold">{formatTime(ticket.showtime.startTime)}</div>
        </div>
      </div>

      {/* Download Button */}
      <div className="d-flex mt-4">
        <button
          className="btn btn-primary w-100 fs-6 py-2 fw-bold shadow-sm"
          style={{ borderRadius: "12px", transition: "0.3s" }}
          onMouseOver={(e) => (e.target.style.background = "#004085")}
          onMouseOut={(e) => (e.target.style.background = "#0d6efd")}
          onClick={btnHandler}
        >
          📥 Download Ticket
        </button>
      </div>
    </div>
  );
};

export default Ticketcard;
