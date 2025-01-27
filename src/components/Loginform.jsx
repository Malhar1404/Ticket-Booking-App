import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginForm = ({onClick}) => {

  const [logFormData,setlogFormData] = useState({
    email: "",
    password : ''
  })

  const navigate = useNavigate();

  const submitHandler = (event)=>{
    event.preventDefault();

    try {
      fetch('http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/auth/login',{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(logFormData)
      }).then((response)=>{
        console.log(response);
        return response.json();
      }).then(data => {
        localStorage.setItem('token','Bearer ' + data.data.accessToken);
        navigate('/homepage')
      }).catch(error => {
        console.log(error); 
      }) 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='bg-white border rounded border-3 border-secondary w-75'>
      <div className="d-flex flex-column align-items-center">
        {/* Heading */}
        <div className="m-2">
          <p className="h4 text-center text-primary">Login to your account</p>
        </div>

        {/* Form */}
        <div className="p-4 ">
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-secondary">Email</label>
              <input type="text" id="email" name="email" className="form-control" required onChange={e => setlogFormData({...logFormData, email : e.target.value})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-secondary">Password</label>
              <input type="password" id="password" name="password" className="form-control" required onChange={e => setlogFormData({...logFormData, password : e.target.value})}/>
            </div>
            <div className="mb-3 text-center">
              <button type="submit" className="btn btn-success w-100" onClick={submitHandler}>Login</button>
            </div>
          </form>

          <div className="d-flex justify-content-between align-items-center">
            <span className="text-secondary">Don&apos;t Have An Account?</span>
            <button className="ms-2 text-primary" onClick={onClick}>Register here</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;