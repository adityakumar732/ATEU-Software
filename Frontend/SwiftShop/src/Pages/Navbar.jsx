import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleSucces } from "../Toasty";

export const Navbar = () => {
    const [user, setUser] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setUser(localStorage.getItem("loggedInUser"));
    }, []);

    const userLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("loggedInUser");

        handleSucces(`${user} has successfully logged out`, "Logout");

        setMenuOpen(false);

        setTimeout(() => {
            navigate("/login");
        }, 1000);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <nav className="relative sticky top-0 z-50 w-full bg-white shadow-lg">

                {/* Navbar */}
                <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6">

                    {/* Logo */}
                    <Link
                        to="/home"
                        onClick={closeMenu}
                        className="text-2xl font-bold text-blue-600 transition duration-300 sm:text-3xl"
                    >
                        Swift
                        <span className="text-purple-600">Shop</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="items-center hidden space-x-8 md:flex">

                        <Link
                            to="/home"
                            className="font-medium text-gray-700 transition duration-300 hover:text-blue-600"
                        >
                            Home
                        </Link>

                        <Link
                            to="/home/addItem"
                            className="font-medium text-gray-700 transition duration-300 hover:text-blue-600"
                        >
                            Add Items
                        </Link>

                        <Link
                            to="/home/shop"
                            className="font-medium text-gray-700 transition duration-300 hover:text-blue-600"
                        >
                            Item List
                        </Link>

                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-2 sm:gap-4">

                        {/* User - Desktop */}
                        <button
                            className="hidden px-4 py-2 font-medium text-white transition duration-300 bg-sky-500 rounded-lg md:block hover:bg-sky-700"
                        >
                            {user}
                        </button>

                        {/* Logout - Desktop */}
                        <button
                            onClick={userLogout}
                            className="hidden px-4 py-2 font-medium text-white transition duration-300 bg-red-500 rounded-lg md:block hover:bg-red-700"
                        >
                            Logout
                        </button>

                        {/* Hamburger - Mobile */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex items-center justify-center w-10 h-10 text-gray-700 transition duration-300 rounded-lg md:hidden hover:bg-gray-100"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? (
                                /* Cross Icon */
                                <svg
                                    className="w-7 h-7"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                /* Hamburger Icon */
                                <svg
                                    className="w-7 h-7"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>

                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`absolute top-full left-0 w-full md:hidden transition-all duration-300 ${
                        menuOpen
                            ? "visible opacity-100"
                            : "invisible opacity-0 pointer-events-none"
                    }`}
                >

                    <div className="px-4 py-4 bg-gray-50 border-t border-gray-100 shadow-xl">

                        {/* User Card */}
                        <div className="flex items-center gap-3 p-4 mb-3 bg-white shadow-sm rounded-xl">

                            <div className="flex items-center justify-center w-11 h-11 font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                                {user?.charAt(0)?.toUpperCase() || "U"}
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Welcome back
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {user}
                                </p>
                            </div>

                        </div>

                        {/* Mobile Links */}
                        <div className="space-y-2">

                            {/* Home */}
                            <Link
                                to="/home"
                                onClick={closeMenu}
                                className="flex items-center w-full px-4 py-3 font-medium text-gray-700 transition duration-300 bg-white rounded-xl hover:bg-blue-50 hover:text-blue-600"
                            >
                                <span className="flex items-center justify-center w-10 h-10 text-lg bg-blue-100 rounded-lg">
                                    🏠
                                </span>

                                <span className="ml-3">
                                    Home
                                </span>
                            </Link>

                            {/* Add Items */}
                            <Link
                                to="/home/addItem"
                                onClick={closeMenu}
                                className="flex items-center w-full px-4 py-3 font-medium text-gray-700 transition duration-300 bg-white rounded-xl hover:bg-purple-50 hover:text-purple-600"
                            >
                                <span className="flex items-center justify-center w-10 h-10 text-lg bg-purple-100 rounded-lg">
                                    ➕
                                </span>

                                <span className="ml-3">
                                    Add Items
                                </span>
                            </Link>

                            {/* Item List */}
                            <Link
                                to="/home/shop"
                                onClick={closeMenu}
                                className="flex items-center w-full px-4 py-3 font-medium text-gray-700 transition duration-300 bg-white rounded-xl hover:bg-green-50 hover:text-green-600"
                            >
                                <span className="flex items-center justify-center w-10 h-10 text-lg bg-green-100 rounded-lg">
                                    🛍️
                                </span>

                                <span className="ml-3">
                                    Item List
                                </span>
                            </Link>

                            {/* Logout - Mobile */}
                            <button
                                onClick={userLogout}
                                className="flex items-center w-full px-4 py-3 font-medium text-red-600 transition duration-300 bg-white rounded-xl hover:bg-red-50"
                            >
                                <span className="flex items-center justify-center w-10 h-10 text-lg bg-red-100 rounded-lg">
                                    🚪
                                </span>

                                <span className="ml-3">
                                    Logout
                                </span>
                            </button>

                        </div>
                    </div>
                </div>

            </nav>
        </>
    );
};