const Myticket = () => {

    const [toggle, setToggle] = useState(true);

    const toggleHandler = () => {
      setToggle(!toggle);
    };

  return (
    <div className="container-fluid">
      {/* under header text */}
      <div className="d-flex flex-column under-header-text mx-5 my-5">
        <div className="d-flex">
          <div className="navigation-button">
            <button
              type="button"
              className="btn btn-primary hover_button"
              onClick={toggleHandler}
            >
              Upcoming
            </button>
          </div>
          <div className="navigation-button">
            <button
              type="button"
              className="btn btn-primary hover_button"
              onClick={toggleHandler}
            >
              History
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

export default Myticket;
