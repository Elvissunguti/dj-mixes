import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { createImageFromInitials } from "../shared/getInitials";
import { getRandomColor } from "../shared/getRandomColor";
import { useEffect } from "react";
import axios from "axios";
import avatar from "../Assets/avatar.png"

const NavBar = () => {

    const [ searchText, setSearchText ] = useState("");
    const [ isOpen, setIsOpen ] = useState(false);
    const [openAvatar, setOpenAvatar] = useState(false);
    const [dataUrl, setDataUrl] = useState('');

    useEffect(() => {
        fetchInitialsImage();
      }, []);
    
      const fetchInitialsImage = async () => {
        try {
          const response = await axios.get('http://localhost:3000/initialsImage', {
            headers: {
              Authorization: 'Bearer your-token' // Replace 'your-token' with the actual JWT token
            }
          });
    
          const {  dataUrl  } = response.data;
          
          setDataUrl(dataUrl);

    
        } catch (error) {
          console.error('Error fetching initials image:', error);
        }
      };


    return(
        <nav className="">
            <div className="mx-auto flex justify-between items-center max-w-4xl max-w-7xl" >
                <div className="flex ">
                    <div className="">
                        <Link to="/">
                        <img src={logo} alt=""
                         className="w-auto h-20 flex cursor-pointer" />
                         </Link>
                    </div>
                    <div className="flex items-center p-3 px-5 space-x-3 rounded-full ">
                        <AiOutlineSearch className="text-lg font-semibold" />
                        <input
                        type="text"
                        placeholder="Search"
                        className="text-xl font-semibold"
                        onChange={(e) => setSearchText(e.target.value)}
                        
                        />
                    </div>
                </div>
                <div className="relative flex flex-col items-center justify-center ">
                    <button className="border border-green-300 flex items-center justify-center text-lg  px-2 py-2"
                    onClick={() => setIsOpen(!isOpen)}>
                    <MdAddCircleOutline className="mr-2" /> 
                    CREATE
                    </button>
                    { isOpen && (
                        <div className="absolute top-full mt-2 w-36 bg-green-500 rounded">
                            <ul className="space-y-2 my-3">
                                <li>
                                    <Link to="/uploadMix" className="flex  items-center flex-start mx-4 text-lg">
                                    <MdAddCircleOutline className="mx-2"/>
                                    Upload</Link>
                                    </li>
                                <li>
                                    <Link to="/post" className="flex  items-center flex-start mx-4 text-lg">
                                        <IoCreateOutline className="mx-2" />
                                        Post</Link>
                                        </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="relative flex flex-col items-center justify-center">
                    <img className="h-7 w-7 rounded-full object-cover"
                    src={avatar}
                    alt="img"
                    onClick={() => setOpenAvatar(!openAvatar)}
                    />
                    { openAvatar && (
                        <div className="absolute top-full mt-2 w-36 bg-green-500 rounded">
                            <ul className="space-y-2 my-3">
                                <li className="text-lg cursor-pointer">
                                    <Link to='/feed'>My dashboard</Link>
                                </li>
                                <li className="text-lg cursor-pointer">
                                    <Link to='/profile'>My Profile</Link>
                                </li>
                                <li className="text-lg cursor-pointer">
                                    <Link to='/settings'>Settings</Link>
                                </li>
                                <li className="text-lg cursor-pointer">
                                    <Link to='/logout'>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    )
                    }

                </div>
            </div>
        </nav>
    )
}
export default NavBar;