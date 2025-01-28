import React from 'react';

const Theatrecard = ({ theatrename, location }) => {
  return (
    <div>
      <button className="d-flex justify-content-space-between theatre-page-btn m-1 w-100">
        <div className="d-flex flex-column w-100">
          <div className="d-flex p-2 header_font">
            {theatrename}
          </div>
          <div className="d-flex p-2" style={{ color: 'rgb(110, 110, 110)', fontSize: '15px' }}>
            <div className="px-1">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div>
              <p>{location}</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end my-auto w-100">
          <div className="w-25" style={{ color: 'rgb(47, 197, 231)' }}>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Theatrecard;