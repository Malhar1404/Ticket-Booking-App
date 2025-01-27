import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = ({onClick}) => {
  const [regFormData, setregFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  
  const navigate = useNavigate();
  
  const submitHandler = (event) => {
    event.preventDefault();
    fetch('http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(regFormData)
    })
      .then(response => response.json())
      .then(data => {
        navigate('/login');
        console.log(data);
      })
      .catch(error => console.error(error));
  }; 

  return (
    <div className='bg-white border rounded border-3 border-secondary w-75'>
  <div className="d-flex flex-column align-items-center">
    {/* Heading */}
    <div className="m-2">
      <p className="h4 text-center text-primary">Create your account</p>
    </div>

    {/* Form */}
    <div className="p-4 ">
      <form>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label text-secondary">First Name</label>
          <input type="text" id="firstName" name="firstName" className="form-control" required onChange={(e)=>{setregFormData({ ...regFormData, firstName : e.target.value})}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label text-secondary">Last Name</label>
          <input type="text" id="lastName" name="lastName" className="form-control" required onChange={(e)=>{setregFormData({ ...regFormData, lastName : e.target.value})}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-secondary">Email</label>
          <input type="email" id="email" name="email" className="form-control" required onChange={(e)=>{setregFormData({ ...regFormData, email : e.target.value})}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label text-secondary">Password</label>
          <input type="password" id="password" name="password" className="form-control" required onChange={(e)=>{setregFormData({ ...regFormData, password : e.target.value})}}/>
        </div>
        <div className="mb-3 text-center">
          <button type="submit" className="btn btn-success w-100" onClick={submitHandler}>Sign up</button>
        </div>
      </form>

      <div className="d-flex justify-content-between align-items-center">
        <span className="text-secondary">Already have an account?</span>
        <button className="ms-2 text-primary" onClick={onClick}>Login here</button>
      </div>
    </div>
  </div>
</div>
  );
}

export default SignupPage;