import React from "react";
import NavBar from "../Home/NavBar";
import { FiLayers, FiMusic } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { GoVideo } from "react-icons/go";
import { SlCalender, SlPlaylist } from "react-icons/sl";
import { useState } from "react";

const LoggedInContainer = ({ children, curActiveScreen, }) => {

    const [ active, setActive] = useState(null);

    const handleClick = (index) => {
        setActive(index);
      };

      

    
    return(
        <section>
            <NavBar />
            <div className="flex mx-auto  mt-4">
                <div className=" w-1/5 flex flex-col  pb-10  ">
                <ul className="flex flex-col px-6 space-y-6 ">
                        <li>
                            <Link to="/feed" onClick={() => handleClick(0)}  className={`flex items-center space-x-4 cursor-pointer ${active === 0 || curActiveScreen === "feed" ? "text-green-500" : "text-blue-400"}`}>
                                <FiLayers /><p>FEED</p></Link>
                        </li>
                        <li>
                            <Link to="/new uploads" onClick={() => handleClick(1)} className={`flex items-center space-x-4 cursor-pointer ${active === 1 || curActiveScreen === "new uploads" ? "text-green-500" : "text-blue-400"}`}>
                                <GoVideo  /><p>NEW UPLOADS</p></Link>
                            </li>
                        <li>
                            <Link to="/my mixes" onClick={() => handleClick(2)}  className={`flex items-center space-x-4 cursor-pointer ${active === 2 || curActiveScreen === "my mixes" ? "text-green-500" : "text-blue-400"}`}>
                                <FiMusic /><p>MY MIXES</p></Link>
                        </li>
                        <li>
                            <Link to="/post page" onClick={() => handleClick(3)}  className={`flex items-center space-x-4 cursor-pointer ${active === 3 || curActiveScreen === "post page" ? "text-green-500" : "text-blue-400"}`}>
                                <MdOutlineLibraryBooks /><p>POSTS</p></Link>
                        </li>
                        <li>
                            <Link to="/favourites" onClick={() => handleClick(4)}  className={`flex items-center space-x-4 cursor-pointer ${active || curActiveScreen === "favourites" ? "text-green-500" : "text-blue-400"}`}>
                                <AiOutlineHeart /><p>FAVOURITES</p></Link>
                        </li>
                        <li>
                            <Link to="/playlists" onClick={() => handleClick(6)} className={`flex items-center space-x-4 cursor-pointer ${active === 6 || curActiveScreen === "playlists" ? "text-green-500" : "text-blue-400"}`}>
                                <SlPlaylist /><p>PLAYLISTS</p></Link>
                        </li>
                        </ul>
                </div>

                {/* main section */}
                <div className="w-4/5 overflow-auto h-full">
                    <div>
                        <div className="content p-8 pt-0 overflow-auto">
                            {children}
                        </div>
                    </div>

                </div>
            

            </div>
        </section>
    )
}
export default LoggedInContainer;