import React from "react";
import { useState } from "react";
import { ImPrevious, ImPause, ImPlay2, ImNext, ImWhatsapp, ImFacebook } from "react-icons/im";
import { FcLike, FcShare } from "react-icons/fc";
import { AiOutlineTwitter, AiOutlineInstagram, AiOutlineMore } from "react-icons/ai";
import thumbnail from "../Assets/thumbnail.jpg";


const CurrentMix = () => {

    const [currentSong, setCurrentSong ] = useState("play");
    const [duration, setDuration ] = useState(0);
    const [ trackProgress, setTrackProgress ] = useState(0);
    

    return(
        <section className="mx-auto flex justify-between  max-w-8xl max-w-10xl">
            <div className="flex  border-b-green-500 w-2/3">
               <div className="flex  ">
                <img src={thumbnail} alt="thumbnail"
                 className=" w-2/5" />
                 </div>
                 <div className="flex w-3/5">
                <div className="font-medium text-lg flex-row mx-2">
                    <p className="hover:text-gray-300 cursor-pointer">mix name</p>
                    <p className="hover:text-gray-300 cursor-pointer">Name of dj</p>
                </div>
                
                <div className="flex items-center between space-x-6 text-4xl mx-4 ">
                    <ImPrevious className="cursor-pointer"/>
                    <div className="cursor-pointer">
                        {currentSong === "play" ? <ImPause /> : <ImPlay2 /> }
                    </div>

                    <ImNext className="cursor-pointer" />
                    
                </div>
                <div className="flex items-center">
                    <p>track song progress</p>
                    <input
                    type="range"
                    min="0"
                    className="w-80 bg-gray-300 cursor-pointer"
                    
                    />
                    |<audio></audio>
                    <p>track duration</p>
                </div>
                <div className="flex flex-row relative space-x-6 items-center">
                    <FcLike className="cursor-pointer text-4xl" />
                    <AiOutlineMore className="cursor-pointer text-4xl" />
                   
                </div>
                </div>
            </div>
        </section>
    )
}
export default CurrentMix;