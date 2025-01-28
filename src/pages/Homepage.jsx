import { useState, useEffect } from 'react';
import Moviecard from '../components/Moviecard';

const Homepage = () => {

    const [movieData, setMovieData] = useState([]);

    useEffect(() => {
        fetch('http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/movies',{
            method : 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            
            setMovieData(data);
            console.log(movieData);
        }).catch((error) => {
            console.log(error);
        })
    },[]);

    useEffect(() => {
        console.log(movieData);
    }, [movieData]);

  return (
    <div className="container-fluid">

      {/* under header text */}
      <div className="d-flex flex-column under-header-text mx-5 my-5">
        <div>Now Showing</div>
        <div className="d-flex">
          <div className="navigation-button"><button type="button" className="btn btn-primary hover_button">Movie</button></div>
          <div className="navigation-button"><button type="button" className="btn btn-primary hover_button">Theatre</button></div>
        </div>
      </div>

      {/* movies section */}
      <div className="d-flex flex-wrap my-1 w-100 mx-5">
        {movieData.map((movie) => (
          <Moviecard key={movie.id} movieimage={movie.image} moviename={movie.name} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;