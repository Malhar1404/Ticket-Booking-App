import React from 'react';

const Ticketcard = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="d-flex flex-column border border-primary-subtle border-3 rounded p-4">
          <div className="d-flex flex-column mb-5">
            <div className="fs-5 text-primary">Date</div>
            <div className="fs-4 text-dark-emphasis fw-bold">Mon, 23 Oct 2023</div>
          </div>
          <div className="d-flex flex-column mb-5">
            <div className="fs-5 text-primary">Movie Title</div>
            <div className="fs-4 text-dark-emphasis fw-bold">
              Demon slayer : mugen train
            </div>
          </div>
          <div className="d-flex gap-4">
            <div className="d-flex flex-column w-100">
              <div className="fs-5 text-primary">Ticket(seats(3))</div>
              <div className="fs-4 text-dark-emphasis fw-bold">B1,B2,B3</div>
            </div>
            <div className="d-flex flex-column mb-5 align-items-end w-100">
              <div className="fs-5 text-primary">Hours</div>
              <div className="fs-4 text-dark-emphasis fw-bold">11:15</div>
            </div>
          </div>
          <div className="d-flex">
            <a href="#" className="w-100 mb-3">
              <button className="btn btn-primary w-100 fs-5 py-3">
                Download ticket
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticketcard;