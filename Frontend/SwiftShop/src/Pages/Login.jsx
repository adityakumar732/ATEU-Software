import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { handleError, handleSucces } from '../Toasty';
import { ToastContainer } from 'react-toastify';

export const Login = () => {
    const [logIn, setLogIn] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handlechange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const logInfo = { ...logIn };
        logInfo[name] = value;
        setLogIn(logInfo);

    }
    console.log('====>', logIn)
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = logIn;  //!extracting the detaisl

        if (!email || !password) {
            return handleError('Provide all the details')
        }
        try {
            const URL = `https://ateu-software.onrender.com/auth/login`;
            const fetchData = await axios.post(URL, logIn, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await fetchData.data;
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSucces(message);
                console.log("Thanky");

                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } 
            else if (error) {
                const details = error?.details?.[0]?.message;
                console.log("BAAAAAADDDDDD");
                console.log(details, "==========chhecking=====");
                handleError(details);
            } 
            else if (!success) {
                handleError(message);
            }
            console.log(result);
        }
        catch (err) {
            handleError(
                err.response?.data?.message || "Username or password is wrong"
            );
        }

    }




    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md md:max-w-lg lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    LogIn
                </h1>

                <form onSubmit={handleLoginSubmit} className="space-y-4">

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Email
                        </label>
                        <input
                            value={logIn.email}
                            onChange={handlechange}
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Password
                        </label>
                        <input
                            value={logIn.password}
                            onChange={handlechange}
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center mt-4">
                    <span className="text-gray-600">Don't have an account?</span>{" "}
                    <Link
                        to="/signup"
                        className="text-blue-500 hover:underline hover:text-blue-700"
                    >
                        Signup
                    </Link>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

