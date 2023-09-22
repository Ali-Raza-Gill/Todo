import React, { useState } from 'react'

const initialstate = {
    title: "",
    location: "",
    description: ""
}
export default function Todo() {
    const [state, setState] = useState(initialstate);
    const handlesubmit = (e) => {
        e.preventDefault()
        console.log(state)
    }
    const handlechange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col  col-lg-6 offset-lg-3  my-5 ">
                        <div className="row">
                            <div className="col  ">
                                <h1 className='text-center'>Todo List</h1>
                            </div>
                        </div>
                        <div className="card p-lg-4 p-md-3 p-sm-2 shadow" style={{ backgroundColor: "#F1FAEE" }}  >
                            <div className="form "  >
                                <div className="row mb-4">
                                    <div className="col col-md-6">
                                        <input type="text" id='title' name='title' className='w-100 py-2  px-3' onChange={handlechange} placeholder='Enter your Title' />
                                    </div>
                                    <div className="col col-md-6">
                                        <input type="text" id='location' name='location' className='w-100 py-2 px-3' onChange={handlechange} placeholder='Enter your Location' />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col">
                                        <textarea name="description" className='w-100 px-3 py-3' id="description" cols="30" rows="10" onChange={handlechange} placeholder='Enter your Description '></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col col-lg-6  ">
                                        <button className='btn btn-danger w-100 ' onClick={handlesubmit}>Add Todo</button>
                                    </div>
                                    <div className="col col-lg-6 ">
                                        <button className='btn btn-primary w-100'>Read Todo</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
