import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../../config/firebase';
import { doc, deleteDoc } from "firebase/firestore";


export default function Todo() {


    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(false)



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
                                <div class="table-responsive">
                                    <table class="table">
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
                                                    <td><button className='btn btn-info btn-sm me-1'>Edit</button><button className='btn btn-danger btn-sm ' onClick={() => { handleTodoDelete(todo.id) }}>Delete</button></td>
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
        </>
    )
}
