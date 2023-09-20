import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../config/firebase';
const initialState={
  name:"",
  email:"",   
  password:"",
  confirmPassword:""
}
export default function Hero() {
const [state, setState] = useState(initialState)

  const handleChange=(e)=>{
    setState(s=>({...s,[e.target.name]:e.target.value}))
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(state)
    const {email,password}=state
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("user is created successfully")
      // ...
    })
    .catch((error) => {
      console.error(error)
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col col-md-6 offset-md-3 col-lg-4 offset-lg-4 ">
          <div className="card p-2 p-md-3 p-lg-4 my-5 shadow">
            <form onSubmit={handleSubmit}>
              <div className="row text-center ">
                <h2>Welcome</h2>
                <h6>Sign Up to Create your Account</h6>
              </div>
              <div className="row mb-2">
                <div className="col">
                  <label htmlFor="exampleInputEmail1" className="form-label"><strong>Name</strong> </label>
                  <input type="text" name='name' placeholder='Enter your Name' onChange={handleChange} className="form-control" aria-describedby="emailHelp" />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col">
                  <label htmlFor="exampleInputEmail1" className="form-label"><strong>Email address</strong></label>
                  <input type="email" name='email' placeholder='Enter your Email' onChange={handleChange} className="form-control" aria-describedby="emailHelp" />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col">
                  <label htmlFor="exampleInputPassword1" className="form-label"><strong>Password</strong></label>
                  <input type="password" name='password' placeholder='Enter your Password' onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="exampleInputEmail1" className="form-label"><strong>Confirm Password</strong></label>
                  <input type="password" name='confirmPassword' placeholder='Confirm your Password' onChange={handleChange} className="form-control" aria-describedby="emailHelp" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <button type="submit" className="btn btn-primary w-100">Sign up</button>
                </div>
              </div>
              <div className="row">
                <div className="col col-lg-5">
                  <hr />
                </div>
                <div className="col col-lg-2 ">
                  <p className='text-center '>or</p>
                </div>
                <div className="col col-lg-5">
                  <hr />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <button type="submit" className="btn btn-dark w-100 " onClick={handleSubmit}>Sign up with Google</button>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col d-flex">
                  <p>If you have already account?</p>
                  <Link to='/sign-in' className='text-primary text-decoration-none '>  Sign in</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
