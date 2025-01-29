import { useEffect, useState } from "react";
import Movieleftsection from "../components/Movieleftsection";
import Movierightsection from "../components/Movierightsection";
import { useLocation } from "react-router-dom";

const Moviepage = () => {
  
  const [data, setData] = useState({});
  const [childInterchangeData, setChildInterchangeData] = useState({});
  
  const location = useLocation();
  const id = location.state.id;
  const date = new Date().toLocaleDateString('en-US');

  const movieData = data.movie;
  const theatreData = data.theaters;

  useEffect(() => {
    fetch(`http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/show-times/${id}/by-date?date=${date}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then(response => response.json())
    .then(data => {
      setData(data);
    }).catch((error) => {
      console.error('Error:', error);
    });
  },[id,date]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="left-section col-8">
          <Movieleftsection theatreData={theatreData} transferData={setChildInterchangeData}/>
        </div>
        {/* right section */}
        <div className="col-4">
          <Movierightsection movieData={movieData} transferedData={childInterchangeData} />
        </div>
      </div>
    </div>
  );
};

export default Moviepage;
