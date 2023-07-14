import React from "react";
import { useState } from "react";
import { ImPrevious, ImPause, ImPlay2, ImNext, ImWhatsapp, ImFacebook } from "react-icons/im";
import { FcLike, FcShare } from "react-icons/fc";
import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";
import avatar from "../Assets/avatar.png";


const CurrentMix = () => {

    const [currentSong, setCurrentSong ] = useState("play");
    const [duration, setDuration ] = useState(0);
    const [ trackProgress, setTrackProgress ] = useState(0);
    const [ open , setOpen] = useState(false);

    return(
        <section className="mx-auto flex justify-between  max-w-8xl max-w-10xl">
            <div className="flex border border-b-green-500 w-2/3">
               <div className="flex  ">
                <img src={avatar} alt="thumbnail"
                 className="h-full w-18" />
                <div className="font-medium text-lg flex-row mx-4">
                    <p>mix name</p>
                    <p>Name of dj</p>
                </div>
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
                    className="cursor-pointer"
                    
                    />
                    |<audio></audio>
                    <p>track duration</p>
                </div>
                <div className="flex flex-row relative space-x-6 items-center">
                    <FcLike className="cursor-pointer text-4xl" />
                   
                </div>
            </div>
        </section>
    )
}
export default CurrentMix;