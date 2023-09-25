import React, { useState } from 'react'
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../../config/firebase';

let initialstate = {
    title: "",
    location: "",
    description: ""
}
export default function Todo() {
    const [state, setState] = useState(initialstate);
    const [isProcessing, setIsProcessing] = useState(false)

    const handlechange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        let { title, location, description } = state
        title = title.trim();
        location = location.trim();
        description = description.trim();
        if (title.length < 3) {
            return alert("Enter correct Title", "error")
        }
        if (location.length < 3) {
            return alert("Enter correct Location", "error")
        }
        if (description.length < 10) {
            return alert("Enter more then 5 words Discription", "error")
        }
        let todo = { title, location, description }
        todo.dateCreated = serverTimestamp()
        todo.id = Math.random().toString(36).slice(2)
        createDocument(todo)
    }

    const createDocument = async (todo) => {
        try {
            // Assuming you have 'db' imported from Firebase somewhere in your code.
            await setDoc(doc(db, 'todos', todo.id), todo);
            alert('Todo is added successfully');
        } catch (err) {
            console.error(err);
        }
    };

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
                                        <button className='btn btn-danger w-100 ' onClick={handlesubmit} disabled={isProcessing}>
                                            {!isProcessing ? "Add Todo"
                                                : <div className='spinner-border spinner-border-sm'></div>
                                            }
                                        </button>
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
