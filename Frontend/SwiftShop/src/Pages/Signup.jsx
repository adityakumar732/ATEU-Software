import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { handleError, handleSucces } from '../Toasty';
import { ToastContainer } from 'react-toastify';
export const Signup = () => {
    const [signUp, setSignUp] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handlechange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const signInfo = { ...signUp };
        signInfo[name] = value;
        setSignUp(signInfo);

    }
    console.log('====', signUp)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = signUp;  //!extracting the detaisl

        if (!name || !email || !password) {
            return handleError('Provide all the details')
        }
        try {
            const URL = `https://ateu-software.onrender.com/auth/signup`;
            const fetchData = await axios.post(URL, signUp, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await fetchData.data;
            const { success, message, error } = result;
            if (success) {
                console.log("====Success====");
                handleSucces(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1500)
            }
            else if (error) {
                const details = error?.details[0].message;
                console.log("====Error=====");
                handleError(details);

            } else if (success === false) {
                handleError(message);
                console.log("===Check========");
            }
            console.log(result);
        }
        catch (err) {
            handleError(err)
        }

    }




    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md md:max-w-lg lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Sign Up
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Name
                        </label>
                        <input
                            value={signUp.name}
                            onChange={handlechange}
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Email
                        </label>
                        <input
                            value={signUp.email}
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
                            value={signUp.password}
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
                        Signup
                    </button>
                </form>

                {/* Already Have an Account */}
                <div className="text-center mt-4">
                    <span className="text-gray-600">Already have an account?</span>{" "}
                    <Link
                        to="/login"
                        className="text-blue-500 hover:underline hover:text-blue-700"
                    >
                        Login
                    </Link>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

