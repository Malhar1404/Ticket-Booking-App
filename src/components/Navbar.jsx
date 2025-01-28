const Navbar = () => {
    return (

        <div className="d-flex justofy-content-between nav py-2 header_font ">
          <div className="">
            Cinema
          </div>
          <div className="d-flex">
            <div className="px-4"><a href="">Home</a></div>
            <div>My Ticket</div>
          </div>
          <div className=""><button type="button" className="btn btn-danger">Logout</button></div>
        </div>
    )
  }
  
  export default Navbar;