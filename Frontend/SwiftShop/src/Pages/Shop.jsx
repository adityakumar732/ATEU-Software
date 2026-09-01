import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleError, handleSucces } from "../Toasty";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ToastContainer } from "react-toastify";

export const Shop = () => {
    const [item, setItem] = useState([]);

    const showData = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                handleError("Please login first");
                return;
            }

            const response = await axios.get(
                "http://localhost:8080/products",
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            setItem(response.data);
        } catch (err) {
            console.log("Get Products Error:", err);

            handleError(
                err.response?.data?.message || "Unable to load products"
            );
        }
    };

    useEffect(() => {
        showData();
    }, []);

    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                handleError("Please login first");
                return;
            }

            await axios.delete(
                `http://localhost:8080/products/${id}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            setItem((prevItems) =>
                prevItems.filter((product) => product.id !== id)
            );

            handleSucces("Product deleted successfully");
        } catch (err) {
            console.log("Delete Product Error:", err);

            handleError(
                err.response?.data?.message || "Unable to delete product"
            );
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
                {item.length > 0 ? (
                    item.map((element) => (
                        <div
                            key={element.id}
                            className="max-w-sm mx-auto overflow-hidden transition-all duration-300 transform bg-white shadow-lg rounded-2xl hover:scale-105 hover:shadow-2xl"
                        >
                            <p className="px-4 pt-4 text-sm text-gray-500">
                                {element.category}
                            </p>

                            <img
                                src={element.image}
                                alt={element.title}
                                className="object-contain w-full h-48 p-4"
                            />

                            <div className="p-4 space-y-2">
                                <h1 className="text-lg font-semibold text-gray-800">
                                    {element.title}
                                </h1>

                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {element.description}
                                </p>

                                <div className="flex items-center justify-between mt-4">
                                    <h1 className="text-xl font-bold text-blue-600">
                                        ₹ {element.price}
                                    </h1>

                                    <p className="flex items-center text-yellow-500">
                                        ⭐ {element.rating}
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        deleteProduct(element.id)
                                    }
                                    className="flex items-center justify-center w-full gap-2 p-2 mt-4 text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-600"
                                >
                                    <DeleteForeverIcon className="w-5 h-5" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-10 text-center">
                        <h2 className="text-xl font-semibold text-gray-600">
                            No products available
                        </h2>
                    </div>
                )}
            </div>

            <ToastContainer />
        </>
    );
};