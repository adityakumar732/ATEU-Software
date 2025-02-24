import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { handleSucces } from "../Toasty";
export const Navbar = () => {

    const [user, setUser] = useState('')

    const navigate = useNavigate();
    useEffect(() => {
        setUser(localStorage.getItem('loggedInUser'))
    }, [])

    const userLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        handleSucces(`${user} has successfully logged out`, 'Logout');
        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }

    return (
        <>
            <div className="bg-white shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold text-blue-600">
                        Swift<span className="text-purple-600">Shop</span>
                    </h1>
                </div>

                <div className="hidden md:flex space-x-6">
                    <Link
                        to="/home/addItem"
                        className="text-gray-700 font-medium hover:text-blue-500 transition duration-300"
                    >
                        Add Items
                    </Link>
                    <Link
                        to="/home/shop"
                        className="text-gray-700 font-medium hover:text-blue-500 transition duration-300"
                    >
                        Item List
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-800 transition duration-300"
                    >{user}</button>
                    <button
                        onClick={userLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition duration-300"
                    >
                        Logout
                    </button>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden focus:outline-none">
                        <svg
                            className="w-6 h-6 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

        </>
    )
}