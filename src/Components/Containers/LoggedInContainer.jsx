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
            <div className="mx-auto ">
                <div className="h-full w-1/5 flex flex-col pb-10  ">
                <ul className="flex flex-col px-6 space-y-6 ">
                        <li>
                            <Link to="/feed" onClick={() => handleClick(0)} active={curActiveScreen === "feed"} className={`flex items-center space-x-4 cursor-pointer ${active === 0 ? "text-green-500" : "text-blue-400"}`}>
                                <FiLayers /><p>FEED</p></Link>
                        </li>
                        <li>
                            <Link to="/new uploads" onClick={() => handleClick(1)} active={curActiveScreen === "new uploads"} className={`flex items-center space-x-4 cursor-pointer ${active === 1 ? "text-green-500" : "text-blue-400"}`}>
                                <GoVideo  /><p>NEW UPLOADS</p></Link>
                            </li>
                        <li>
                            <Link to="/my mixes" onClick={() => handleClick(2)} active={curActiveScreen === "my mixes"} className={`flex items-center space-x-4 cursor-pointer ${active === 2 ? "text-green-500" : "text-blue-400"}`}>
                                <FiMusic /><p>MY Mixes</p></Link>
                        </li>
                        <li>
                            <Link to="/post page" onClick={() => handleClick(3)} active={curActiveScreen === "post page"} className={`flex items-center space-x-4 cursor-pointer ${active === 3 ? "text-green-500" : "text-blue-400"}`}>
                                <MdOutlineLibraryBooks /><p>POSTS</p></Link>
                        </li>
                        <li>
                            <Link to="/favourites" onClick={() => handleClick(4)} active={curActiveScreen === "favourites"} className={`flex items-center space-x-4 cursor-pointer ${active === 4 ? "text-green-500" : "text-blue-400"}`}>
                                <AiOutlineHeart /><p>FAVOURITES</p></Link>
                        </li>
                        <li>
                            <Link to="/historys"onClick={() => handleClick(5)}  active={curActiveScreen === "historys"} className={`flex items-center space-x-4 cursor-pointer ${active === 5 ? "text-green-500" : "text-blue-400"}`}>
                                <SlCalender /><p>HISTORY</p></Link>
                            </li>
                        <li>
                            <Link to="/playlists" onClick={() => handleClick(6)} active={curActiveScreen === "playlists"} className={`flex items-center space-x-4 cursor-pointer ${active === 6 ? "text-green-500" : "text-blue-400"}`}>
                                <SlPlaylist /><p>PLAYLISTS</p></Link>
                        </li>
                        </ul>
                </div>

                {/* main section */}
                <div className="w-4/5">
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