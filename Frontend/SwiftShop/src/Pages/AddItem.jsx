import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSucces } from '../Toasty';
export const AddItem = () => {

    const [product, setProduct] = useState({
        category: '',
        title: '',
        price: '',
        image: '',
        rating: '',
        description:''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const addProduct = { ...product };
        addProduct[name] = value;
        setProduct(addProduct)
    };

    const validateForm = () => {
        const { category, title, price, image, rating, description } = product;
        if (!category || !title || !price || !image || !rating || !description) {
            return handleError('All fields are required');
        }
        if (isNaN(price) || isNaN(rating)) {
            return handleError('Price and Rating should be numeric values');
        }
        return true;
    };

    const resetForm = () => {
        setProduct({
            category: "",
            title: "",
            price: "",
            image: "",
            rating: "",
            description: "",
        });
    };

    const addProduct = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const token = localStorage.getItem("token");

const res = await axios.post(
    "https://ateu-software.onrender.com/products",
    product,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);
            console.log(res);
            handleSucces("Product added successfully")
            resetForm();
        } catch (err) {
            console.error(err);
            handleError(
        err.response?.data?.message || "Failed to add product. Please try again."
    );s
        }
    };

    return (
        <>
            <div>
                <form onSubmit={addProduct} className="p-4 my-[30px] mx-auto max-w-lg space-y-4 shadow-lg rounded-xl">
                    {["category", "title", "price", "image", "rating", "description"].map((field) => (
                        <input
                            key={field}
                            type={field === "price" || field === "rating" ? "number" : "text"}
                            name={field}
                            value={product[field]}
                            onChange={handleChange}
                            placeholder={`Enter ${field}`}
                            className="w-full p-2 border rounded-lg"
                        />
                    ))}
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Add Product
                    </button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}