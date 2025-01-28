import React from 'react'
import { useState , useEffect} from 'react';
import Loginform from '../components/Loginform'
import Signupform from '../components/Signupform'


function SignupPage() {
  const [toggleForm, setToggleForm] = useState(false);  
  
  const toggleFormHandler = () => {
    setToggleForm(!toggleForm);
  };

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
        <div className="col m-auto">
          <div className="d-flex justify-content-center m-auto w-100">
            {toggleForm ? <Signupform onClick={toggleFormHandler} /> : <Loginform onClick={toggleFormHandler} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;