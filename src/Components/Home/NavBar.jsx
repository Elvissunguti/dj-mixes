import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";

const NavBar = () => {

    const [ searchText, setSearchText ] = useState("");
    const [ isOpen, setIsOpen ] = useState(false);

    


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
                <div className="flex flex-col items-center justify-center">
                    <button className="border border-green-300 flex items-center justify-center"
                    onClick={() => setIsOpen(!isOpen)}>
                    <MdAddCircleOutline sx={{ marginRight: '0.5rem' }}  /> 
                    Create
                    </button>
                    { isOpen && (
                        <div>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/upload" className="flex justify-center items-center">
                                    <MdAddCircleOutline />
                                    Upload</Link>
                                    </li>
                                <li>
                                    <Link to="/post" className="flex justify-center items-center">
                                        <IoCreateOutline />
                                        Post</Link>
                                        </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
export default NavBar;