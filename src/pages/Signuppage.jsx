import React from 'react';

function SignupPage() {
  return (
    <div className="container-fluid">
      <div className="row" style={{ height: '100vh' }}>
        <div className="col background d-flex flex-column py-1">
          <div className="d-flex flex-column mb-2 py-1">
            <img src="../../public/Logo.png" alt="Logo" className="img w-50 h-75 border rounded" />
          </div>
          <div className="d-flex align-items-end h-100" style={{ fontStyle: 'italic' }}>
            <div>
              <p className="lower_font fs-1 fw-bold">
                Welcome. <br /> Begin your cinematic adventure now with our ticketing platform!
              </p>
            </div>
          </div>
        </div>
        <div className="col d-flex justify-content-center align-items-center">
          {/* Add your content here */}
        </div>
      </div>
    </div>
  );
}

export default SignupPage;