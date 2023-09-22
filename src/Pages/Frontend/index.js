import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Hero from './Hero/Hero'
import About from './About/About'
import Contact from './Contact/Contact'
import Services from './Services/Services'
import Nopage from './Nopage'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import SignIn from './SignIn/SignIn'
import Todo from './Todo/Todo'
import Task from './Task/Task'

export default function index() {
    return (
        <>
            <Navbar />
            <main>
                <Routes>
                    <Route path='/' element={<Hero />} />
                    <Route path='about' element={<About />} />
                    <Route path='services' element={<Services />} />
                    <Route path='contact' element={<Contact />} />
                    <Route path='todo' element={<Todo />} />
                    <Route path='task' element={<Task />} />
                    <Route path='sign-in' element={<SignIn />} />
                    <Route path='*' element={<Nopage />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}
