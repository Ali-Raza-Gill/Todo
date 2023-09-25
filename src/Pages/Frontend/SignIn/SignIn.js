import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../config/firebase';

const initialState = {
    email: "",
    password: ""
}
export default function SignIn() {
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsprocessing] = useState(false)
    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }
    const handlelogin = (e) => {
        e.preventDefault();

        const { email, password } = state

        setIsprocessing(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("the user is sign in successfully")
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            })
            .finally(() => {
                setIsprocessing(false)
            });
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col col-md-6 offset-md-3 col-lg-4 offset-lg-4 ">
                    <div className="card p-2 p-md-3 p-lg-4 my-5 shadow">
                        <form action="">
                            <div className="row text-center ">
                                <h2>Welcome</h2>
                                <h6>Sign In to Enter into your Account</h6>
                            </div>

                            <div className="row mb-2">
                                <div className="col">
                                    <label for="exampleInputEmail1" className="form-label"><strong>Email </strong></label>
                                    <input type="email" name='email' placeholder='Enter your Email' onChange={handleChange} className="form-control" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col">
                                    <label for="exampleInputPassword1" className="form-label"><strong>Password</strong></label>
                                    <input type="password" name='password' placeholder='Enter your Password' onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                                </div>
                            </div>
                            <div className="row my-2 ">
                                <div className="col d-flex justify-content-between align-items-center">
                                    <div className="privacy ">
                                        <input type="checkbox" className='mt-2' />
                                        <span > Remember me</span>
                                    </div>
                                    <h6 className='text-primary mt-2'>Forgot Password?</h6>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <button type="submit" className="btn btn-primary w-100" onClick={handlelogin}>Sign in</button>
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
                                    <button type="submit" className="btn btn-dark w-100 ">Sign in with Google</button>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col d-flex">
                                    <p>Don't have account?</p>
                                    <Link to='/' className='text-primary text-decoration-none '>&ensp; SignUp</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
