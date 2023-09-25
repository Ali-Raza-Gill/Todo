import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../../config/firebase';
const initialState = {
    taskName: "",
    topic: "",
    details: ""
}
export default function Task() {
    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        let { taskName, topic, details } = state
        taskName = taskName.trim();
        topic = topic.trim();
        details = details.trim();

        if (taskName.length < 3) {
            return alert("Enter correct Task Name")
        }
        if (topic.length < 5) {
            return alert("Enter Correct Topic Name")
        }
        if (details.length < 10) {
            return alert("Enter details more than a 10 words")
        }
        let task = { taskName, topic, details }
        task.dateCreated = serverTimestamp()
        task.id = Math.random().toString(36).slice(2)
        createDocument(task);
    }
    const createDocument = async (task) => {
        setIsProcessing(true)
        try {
            // Assuming you have 'db' imported from Firebase somewhere in your code.
            await setDoc(doc(db, 'tasks', task.id), task);
            alert('Your Task is added successfully');
        } catch (err) {
            console.error(err);
        }
        setIsProcessing(false)
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
                                <div className="col col-md-6 col-sm-12 mb-4">
                                    <input type="text" name='taskName' className='p-2 w-100' placeholder='Enter task Name' onChange={handleChange} />
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
                                    <button className='btn btn-success w-100' onClick={handleSubmit} disabled={isProcessing}>Add Task</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
