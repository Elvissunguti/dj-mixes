import React, { useState } from "react";
import { ImFacebook, ImPause, ImPlay, ImWhatsapp } from "react-icons/im";
import { AiOutlineHeart, AiOutlineInstagram, AiOutlineMore, AiOutlineTwitter } from "react-icons/ai";
import { FcShare } from "react-icons/fc";
 

const MixCard = ({ thumbnail, title, artist }) => {

    const [ open, setOpen ] = useState(false);
    const [ currentSong, setCurrentSong ] = useState("play");
 

      // Extract the filename from the thumbnail path
  const thumbnailFilename = thumbnail.split("\\").pop();

  // Construct the relative URL for the thumbnail image
  const imageUrl = `/MixUploads/Thumbnail/${thumbnailFilename}`;
 

    return(
        <section className=" ">
            <div className="flex border-b border-green-500  w-2/3">
                <div className="w-1/5">
                    <img src={imageUrl} alt=""
                    className="h-full w-full rounded object-cover" />
                </div>
                <div className="flex flex-col w-4/5 space-x-12 mt-4 pl-4">
                <div className="flex space-x-4 my-4">
                    <div className="  text-5xl cursor-pointer  ">
                        {currentSong === "play" ? <ImPause /> : <ImPlay />}
                    </div>
                    <div className="text-2xl font-medium">
                        <p className="hover:text-gray-600 cursor-pointer">
                            {title}
                        </p>
                        <p className=" hover:text-gray-600 cursor-pointer">
                            By <span className="text-gray-500 hover:text-black">{artist}</span>
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <p>time </p>
                    <input 
                    type="range"
                    min="0"
                    className="w-96 bg-gray-300 cursor-pointer"
                    />
                    <p>full time</p>
                    </div>
                    
                
                <div className="flex flex-row relative mt-4 space-x-4">
                        <AiOutlineHeart className="text-4xl cursor-pointer" /> no likes
                        <FcShare className="cursor-pointer text-4xl" onClick={() => setOpen(!open)}/>
                    { open && (
                        <div className="absolute bg-green-500 top-full mt-2 px-2 py-3 ">
                            <ul className="flex items-center justify-center space-x-4 text-xl font-medium">
                                <li><AiOutlineTwitter className="cursor-pointer" /></li>
                                <li><ImWhatsapp className="cursor-pointer" /></li>
                                <li><ImFacebook className="cursor-pointer" /></li>
                                <li><AiOutlineInstagram className="cursor-pointer" /></li>
                            </ul>
                        </div>
                    )}
                    <AiOutlineMore className="cursor-pointer text-4xl" />
                </div>
                </div>
            </div>
        </section>
    )
};
 export default MixCard;