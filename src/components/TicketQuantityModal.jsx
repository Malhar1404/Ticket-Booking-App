import { useEffect } from "react";
import { Modal } from "bootstrap";
import { useNavigate } from "react-router-dom";

const BootstrapModal = ({
  isOpen,
  onClose,
  selectedShowTimeId,
  theatreName,
}) => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const navigate = useNavigate();
  let noOfSeats = "";

  useEffect(() => {
    const modalElement = document.getElementById("staticBackdrop");
    const bodyElement = document.body;

    if (modalElement) {
      const modalInstance = new Modal(modalElement, {
        backdrop: "static",
        keyboard: false,
      });

      if (isOpen) {
        modalInstance.show(); 
        bodyElement.style.overflow = "hidden"; 
      } else {
        modalInstance.hide(); 
        bodyElement.style.overflow = "auto"; 
      }


      return () => {
        modalInstance.dispose();
        bodyElement.style.overflow = "auto"; 
      };
    }
  }, [isOpen]);

  const seatSelectBtnHandler = () => {
    console.log(theatreName);

    if(noOfSeats){
      navigate("/seatselection", {
        state: {
          showTimeId: selectedShowTimeId,
          noOfSeats: noOfSeats,
          theatreName: theatreName,
        },
      });
    }else{
      alert("Please select number of seats!!");
    }
  };

  if (!isOpen) return null; // Don't render the modal when isOpen is false

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Select no. of Tickets
            </h5>
          </div>
          <div className="modal-body">
            {/* Modal content goes here */}
            <div className="row">
              {array.map((num) => (
                <div className="d-flex col-3" key={num}>
                  <button
                    type="button"
                    className="date-btn my-1 mx-2 p-3"
                    onClick={() => (noOfSeats = num)}
                  >
                    {num}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={() => onClose(false)}
              aria-label="Close"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={seatSelectBtnHandler}
            >
              Seat Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootstrapModal;
