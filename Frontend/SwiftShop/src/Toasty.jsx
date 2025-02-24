// import { toast } from "react-toastify";

// export const handleSucces = (msg) => {
//     toast.success(msg, {
//         position: 'top-left'
//     })
// }


// export const handleError = (msg) => {
//     toast.error(msg, {
//         position: 'top-left'
//     })
// }
    
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Success Toast
export const handleSucces = (msg) => {
  toast.success(`✅ ${msg}`, {
    position: "top-right",
    autoClose: 3000, // Auto close after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored", // Makes it more vibrant
  });
};

// Error Toast
export const handleError = (msg) => {
  toast.error(`❌ ${msg}`, {
    position: "top-right",
    autoClose: 4000, // Auto close after 4 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark", // Dark mode for error messages
  });
};
