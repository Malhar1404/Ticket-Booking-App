import { useEffect, useState } from "react";
import Movieleftsection from "../components/Movieleftsection";
import Movierightsection from "../components/Movierightsection";
import { useLocation } from "react-router-dom";
import TicketQuantityModal from "../components/TicketQuantityModal";

const Moviepage = () => {
  const [data, setData] = useState({});
  const [childInterchangeData, setChildInterchangeData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlDate, setUrlDate] = useState(new Date().toLocaleDateString("en-US"));
  const [selectedShowTimeId, setSelectedShowTimeId] = useState("");
  const [selectedTheatreName, setSelectedTheatreName] = useState("");
  const location = useLocation();
  const movieId = location.state.id;

  const movieData = data.movie;
  const theatreData = data.theaters;

  useEffect(() => {
    fetch(
      `http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/show-times/${movieId}/by-date?date=${urlDate}`,
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
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [urlDate]);

  // useEffect(() => {
  //   console.log(theatreData);
  // },[data])

  // useEffect(()=>{
  //   console.log(selectedTheatreName);

  // },[selectedTheatreName])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="left-section col-8">
          <Movieleftsection
            setSelectedDate={setUrlDate}
            theatreData={theatreData}
            transferData={setChildInterchangeData}
            selectedShowTime={setSelectedShowTimeId}
            setTheatreName={setSelectedTheatreName}
          />
        </div>
        {/* right section */}
        <div className="col-4">
          <Movierightsection
            movieData={movieData}
            transferedData={childInterchangeData}
            onClose={setIsModalOpen}
          />
        </div>
      </div>

      <TicketQuantityModal
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
        selectedShowTimeId={selectedShowTimeId}
        theatreName={selectedTheatreName}
      />
    </div>
  );
};

export default Moviepage;
