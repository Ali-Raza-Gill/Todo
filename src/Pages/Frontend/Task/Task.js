import React, { useState } from 'react'
const initialState = {
    task: "",
    topic: "",
    details: ""
}
export default function Task() {
    const [state, setState] = useState(initialState);
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(state);

    }
    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col col-lg-6 offset-lg-3 ">
                    <div className="card p-lg-4 p-md-3 p-sm-2" style={{ backgroundColor: "#F5FAEE" }}>
                        <div className="form " onSubmit={handleSubmit} >
                            <div className="row">
                                <div className="col">
                                    <h1 className='text-center mt-2 mb-0'>Add your Tasks </h1>
                                </div>
                            </div><hr className='' />
                            <div className="horizontal-line w-50 "></div>
                            <div className="row">
                                <div className="col col-md-6 col-sm-12  mb-4">
                                    <input type="text" name='task' className='p-2 w-100' placeholder='Enter Name' onChange={handleChange} />
                                </div>
                                <div className="col col-md-6 col-sm-12 mb-4">
                                    <input type="text" name='topic' className='p-2 w-100' placeholder='Enter Topic' onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col ">
                                    <textarea name="details" className='w-100 px-4 py-2 mb-3' cols="30" rows="10" placeholder='Enter your Task details here' onChange={handleChange}></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button className='btn btn-success w-100'onClick={handleSubmit}>Add Task</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
