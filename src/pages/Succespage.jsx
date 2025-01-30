
import { useNavigate } from "react-router-dom";
const Successpage = () => {

    const navigate = useNavigate();
    const cancelBtnHandler = ()=>{
        localStorage.removeItem("token");
        navigate("/");
    }

    const viewTicketBtnHandler = ()=>{
        navigate("/ticket");
    }
    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center p-5"
        style={{ height: "100vh" }}
      >
        <div className="d-flex flex-column text-center" style={{ width: 350 }}>
          {/* Payment Title */}
          <div className="fs-2 fw-bold mb-4">
            <p>Payment Successful</p>
          </div>
  
          {/* Image Section */}
          <div
            className="d-flex justify-content-center align-items-center mx-auto mb-4"
            style={{ width: 150, height: 150, position: "relative" }}
          >
            <img
              src="../../public/circle.png" // Make sure the path is correct
              alt="Right Tick"
              className="img-fluid rounded-circle"
              style={{
                boxShadow: "4px 10px 10px rgb(44, 182, 44)",
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
  
          {/* View Ticket Button */}
          <div className="mb-3">
            <div className="w-100">
              <button className="btn btn-primary w-100 fs-5 py-3" onClick={viewTicketBtnHandler}>
                View Ticket
              </button>
            </div>
          </div>
  
          {/* Back to View Page Button */}
          <div>
            <button
              type="button"
              className="border rounded btn-light w-100 text-body-tertiary p-3 fs-5"
              onClick={cancelBtnHandler}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Successpage;
  