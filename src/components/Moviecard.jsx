const Moviecard = ({movieimage, moviename}) => {
    return (
        <div className="d-flex flex-column align-items-center px-3">
          <div className="mb-3">
            <img src={movieimage} alt="movie name" className="movie-img"/>
          </div>
          <div className="d-flex justify-content-center fs-5 w-75">
            <div className="">{moviename}</div>
          </div>
        </div>
    )
}

export default Moviecard;