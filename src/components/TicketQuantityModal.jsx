import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Modal } from "bootstrap"; // Import Bootstrap Modal
import { useNavigate } from "react-router-dom";

const BootstrapModal = ({ isOpen, onClose, selectedShowTimeId, theatreName }) => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const navigate = useNavigate();
  let noOfSeats = "";

  const seatSelectBtnHandler = () => {
    console.log(theatreName);
    
    navigate("/seatselection", {
      state: { showTimeId: selectedShowTimeId, noOfSeats: noOfSeats, theatreName: theatreName },
    });
  };

  const modalHandler = () => {
    const modalElement = document.getElementById("bootstrapModal");

    // Define a function for the hidden.bs.modal event listener
    const handleModalClose = () => {
      onClose(false); // Update state in parent when modal closes
    };

    if (modalElement) {
      const modalInstance = new Modal(modalElement, { backdrop: true });

      // Open or close the modal based on isOpen state
      if (isOpen) {
        modalInstance.show();
      } else {
        modalInstance.hide();
      }

      // Handle the event when the modal is closed by clicking the backdrop
      modalElement.addEventListener("hidden.bs.modal", handleModalClose);

      // Cleanup event listener on component unmount or modal state change
      return () => {
        modalElement.removeEventListener("hidden.bs.modal", handleModalClose);
      };
    }
  };

  useEffect(() => {
    modalHandler();
  }, [isOpen, onClose]);

  // Manually remove the modal backdrop when modal closes or navigate
  useEffect(() => {
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove(); // Remove the backdrop after navigation
    }
  }, [navigate]);

  return (
    <div
      className="modal fade"
      id="bootstrapModal"
      tabIndex="-1"
      aria-labelledby="bootstrapModalLabel"
      aria-hidden={!isOpen} // Hide modal when isOpen is false
    >
      <div className="modal-dialog modal-sm">
        {/* Small size modal */}
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="bootstrapModalLabel">
              Select no. of Tickets
            </h5>
          </div>
          <div className="modal-body">
            {/* Modal content goes here */}
            <div className="row">
              {array.map((num) => (
                <div className="d-flex col-3" key={num}>
                  <button type="button" className="date-btn  my-1 mx-2 p-3" onClick={() => noOfSeats = num}>
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
              onClick={() => onClose(false)} // Close modal on button click
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
