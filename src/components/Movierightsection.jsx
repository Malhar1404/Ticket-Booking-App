import { useEffect } from "react";
import Moviecard from "./Moviecard";

// initialized props as {} empty because the data from previous page is not coming instantly.
const Movierightsection = ({ movieData = {}, transferedData = {}, onClose }) => {


  
  const calculateDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  };

  const booknowBtnHandler = () => {
    // Check if all required fields (theatre, date, time) are selected
    if (!transferedData.theatreName || !transferedData.showDate || !transferedData.showTime) {
      let missingSelection = [];

      if (!transferedData.theatreName) missingSelection.push("theatre");
      if (!transferedData.showDate) missingSelection.push("date");
      if (!transferedData.showTime) missingSelection.push("time");

      // Show error message indicating which selection is missing
      alert(`Please select ${missingSelection.join(", ")} before booking.`);
    } else {
      // If all are selected, proceed to book
      onClose(true);
    }
  };
  

  useEffect(() => {
    console.log(transferedData);
  },[transferedData]);
  
  const duration = calculateDuration(movieData.duration);

  return (
    <div>
      <Moviecard movieimage={movieData.image} moviename={movieData.name} />
      <div className="d-flex flex-column fs-6 text-dark-emphasis">
        <div className="align-text-center py-3 fw-bold">{movieData.description}</div>
        <div className="d-flex">
          <div className="w-50">Duration</div>
          <div className="w-50">{duration}</div>
        </div>
        <div className="d-flex">
          <div className="w-50">Language</div>
          <div className="w-50">{movieData.languages && movieData.languages.map((lang) => `${lang}, `)}</div>
        </div>
        <div className="d-flex">
          <div className="w-50">Type</div>
          <div className="w-50">{movieData.category && movieData.category.map((cat) => `${cat}, `)}</div>
        </div>
      </div>
      <div>
        {/* ticket card */}
        <div className="ticket-card d-flex flex-column my-4 px-5 py-3">
          <div
            className="my-1 header_font"
            style={{ fontSize: 30, fontWeight: 700 }}
          >
            {transferedData.theatreName}
          </div>
          <div
            className="my-3"
            style={{ fontSize: 20, fontWeight: 400, color: "#777" }}
          >
            <div>{transferedData.showDate}</div>
            <div>{transferedData.showTime}</div>
          </div>
          <div className="my-3">
            <div
              className="m-1"
              style={{ fontSize: 12, fontWeight: 600, color: "#ccc" }}
            >
              *Seat selection can be done after this
            </div>
            <div>
              <button className="btn btn-primary w-100" onClick={booknowBtnHandler}>Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movierightsection;
