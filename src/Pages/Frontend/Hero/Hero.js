import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../../config/firebase';
import { doc, deleteDoc, serverTimestamp, setDoc } from "firebase/firestore";

let initialstate = {
    title: "",
    location: "",
    description: ""
}
export default function Todo() {

    const [editTodo, setEditTodo] = useState(initialstate);
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isProcessingUpdate, setIsProcessingUpdate] = useState(false)


    const handlechange = (e) => {
        setEditTodo(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const fetchDocuments = async () => {
        setIsLoading(true)
        let array = []

        const querySnapshot = await getDocs(collection(db, "todos"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            let data = doc.data()
            array.push(data)
        });
        setDocuments(array)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchDocuments()
    }, [])


    const handleTodoDelete = async (todoId) => {
        try {
            await deleteDoc(doc(db, "todos", todoId));

            // this code is to change data without refreshing it.
            setDocuments((prevDocuments) =>
                prevDocuments.filter((todo) => todo.id !== todoId)
            );
        }
        catch (err) {
            console.error(err)
        }
    }

    const handleUpdate = async () => {
        const todo = { ...editTodo }
        todo.dateCreated = todo.dateCreated
        todo.dateModified = serverTimestamp()
        // todo.modifiedBy = {
        //     email: user.email,   
        //     uid: user.uid
        // }
        setIsProcessingUpdate(true)
        try {
            // 1st args database, 2nd args collection,3rd args data.id ,4th args data
            await setDoc(doc(db, "todos", todo.id), todo, { merge: true });
            // window.toastify('Todo is Updated Successfully', 'success')
            // This is used by replace old todo by updated todo with refreshing the page
            alert("Todo is updated successfully")
            //logic start
            let newDocuments = documents.map((doc) => {
                if (doc.id === todo.id)
                    return todo
                return doc
            })
            setDocuments(newDocuments)
            //logic end
        }
        catch (err) {
            console.log(err)
            // window.toastify('something gone error', 'error')
        }
        setIsProcessingUpdate(false)
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
                        <div className="row">
                            <div className="col ">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Sr. No</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Location</th>
                                                <th scope="col">Descriptions</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {documents.map((todo, i) => {
                                                return <tr>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{todo.title}</td>
                                                    <td>{todo.location}</td>
                                                    <td>{todo.description}</td>
                                                    <td><button className='btn btn-info btn-sm me-1' type='button' onClick={() => { setEditTodo(todo) }} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button><button className='btn btn-danger btn-sm ' onClick={() => { handleTodoDelete(todo.id) }}>Delete</button></td>
                                                </tr>
                                            })
                                              }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">Update Your Todo </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-3">
                                <div className="col">
                                    <input type="text" id='title' name='title' className='w-100 py-2  px-3' onChange={handlechange} value={editTodo.title} placeholder='Enter your Title' />
                                </div>
                                <div className="col">
                                    <input type="text" id='location' name='location' className='w-100 py-2 px-3' onChange={handlechange} value={editTodo.location} placeholder='Enter your Location' />
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col">
                                    <textarea name="description" className='w-100 px-3 py-3' id="description" cols="30" rows="10" onChange={handlechange} value={editTodo.description} placeholder='Enter your Description '></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdate} disabled={isProcessingUpdate}>{
                                !isProcessingUpdate ? "Update" :
                                    <div className="spinner-border spinner-border-sm"></div>
                            }</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
