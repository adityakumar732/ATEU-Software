import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';


export const Footer = ()=>{
    return (
        <div className="bg-gray-900 text-white p-6 w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold">Contact Us</h2>
            <p className="text-gray-400 mt-2">
              📞 Phone: <span className="text-white">234-567-8987</span> <br />
              📧 Email: <span className="text-white">SwiftShop@gmail.com</span>
            </p>
          </div>
      
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <FacebookIcon className="w-6 h-6 hover:text-blue-500 transition duration-300 cursor-pointer" />
            <InstagramIcon className="w-6 h-6 hover:text-pink-500 transition duration-300 cursor-pointer" />
            <XIcon className="w-6 h-6 hover:text-gray-400 transition duration-300 cursor-pointer" />
            <GitHubIcon className="w-6 h-6 hover:text-white transition duration-300 cursor-pointer" />
          </div>
        </div>
      
        {/* Bottom Text */}
        <div className="text-center text-gray-500 mt-4 text-sm">
          © {new Date().getFullYear()} SwiftShop. All rights reserved.
        </div>
      </div>
      )
}