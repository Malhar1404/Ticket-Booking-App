const Moviecard = ({movieimage, moviename}) => {
    return (
        <div className="d-flex flex-column align-items-center px-3">
          <div className="mb-3">
            <img src={movieimage} alt="movie name" className="movie-img"/>
          </div>
          <div className="fs-5 w-100 align-text-center">
            {moviename}
          </div>
        </div>
    )
}

export default Moviecard;