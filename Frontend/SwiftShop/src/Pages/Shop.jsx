import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleError, handleSucces } from "../Toasty";
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { ToastContainer } from "react-toastify";


export const Shop = () => {

    const [item, setItem] = useState([])
    // const [del, setDel] = useState(0)
    const showData = async () => {
        try {
            const URL_DATA = `http://localhost:1222/Product`;
            const response = await axios.get(URL_DATA)
            const lastData = await response.data;
            setItem(lastData)
        }
        catch (err) {
            handleError(err)
        }

    }
    useEffect(() => { showData() }, [])


    const deleteProduct = async (id)=> {
    console.log('heolooIDD',id)
        try {
            const shopUrl = `http://localhost:1222/Product/${id}`;
          const response =  await axios.delete(shopUrl)
          console.log('response',response.data)
    
                    setItem((prevItems) => prevItems.filter((product) => product.id !== id));

                    handleSucces(`Deleted Succesfully`)
                

        }
        catch (err) {
            handleError(err);
        }

    }
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
  {item.map((element) => (
    <div
      key={element.id}
      className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 mx-auto"
    >
      <p className="text-sm text-gray-500 px-4 pt-4">{element.category}</p>

      
      <img
        src={element.image}
        alt={element.title}
        className="w-full h-48 object-contain p-4"
      />
      <div className="p-4 space-y-2">
        <h1 className="text-lg font-semibold text-gray-800">{element.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{element.description}</p>

        <div className="flex items-center justify-between mt-4">
          <h1 className="text-xl font-bold text-blue-600">₹  {element.price}</h1>
          <p className="flex items-center text-yellow-500">
            ⭐ {element.rating}
          </p>
        </div>
        <button
          onClick={() => deleteProduct(element.id)}
          className="w-full bg-red-500 text-white flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-red-600 transition duration-300 mt-4"
        >
          <DeleteForeverIcon className="w-5 h-5" />
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

            <ToastContainer />
        </>
    )
}