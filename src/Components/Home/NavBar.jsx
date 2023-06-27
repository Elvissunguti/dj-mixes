import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import { AiOutlineSearch } from "react-icons/ai";

const NavBar = () => {

    const [ searchText, setSearchText ] = useState("");


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
            </div>
        </nav>
    )
}
export default NavBar;