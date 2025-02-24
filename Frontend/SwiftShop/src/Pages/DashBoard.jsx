import React, { useEffect, useState } from 'react'
import { handleError } from '../Toasty'
import axios from 'axios';



export const DashBoard = () => {

    const [product, setProduct] = useState([])


    const previewData = async () => {
        try {
            const product_Url = `https://fakestoreapi.com/products`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await axios.get(product_Url, headers)
            const finalData = await response.data;
            setProduct(finalData)
        }
        catch (err) {
            handleError(err)
        }
    }

    useEffect(() => { previewData() }, [])


    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
                {product.map((ele) => (
                    <div
                        key={ele.id}
                        className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 mx-auto"
                    >
                        <p className="text-sm text-gray-500 px-4 pt-4">{ele.category}</p>

                        <img
                            src={ele.image}
                            alt={ele.title}
                            className="w-full h-48 object-contain p-4"
                        />

                        <div className="p-4 space-y-2">
                            <h1 className="text-lg font-semibold text-gray-800">{ele.title}</h1>
                            <p className="text-sm text-gray-600 line-clamp-3">{ele.description}</p>

                            <div className="flex items-center justify-between mt-4">
                                <h1 className="text-xl font-bold text-blue-600">${ele.price}</h1>
                                <p className="flex items-center text-yellow-500">
                                    ⭐ {ele.rating.rate}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}