import React from "react";
import { useState } from "react";
import { ImPrevious, ImPause, ImPlay2, ImNext } from "react-icons/im";
import { FcLike } from "react-icons/fc";
import avatar from "../Assets/avatar.png";


const SingleMixCard = () => {

    const [currentSong, setCurrentSong ] = useState("play");

    return(
        <section className="mx-auto flex justify-between items-center max-w-8xl max-w-10xl">
            <div className="border border-b-green-500 w-2/3">
               <div className="flex flex-row ">
                <img src={avatar} alt="thumbnail"
                 className="w-10 h-10" />
                <div className="font-medium text-lg">
                    <p>mix name</p>
                    <p>Name of dj</p>
                </div>
                </div> 
                <div className="flex space-x-6 text-4xl ">
                    <ImPrevious className="cursor-pointer"/>
                    <div className="cursor-pointer">
                        {currentSong === "play" ? <ImPause /> : <ImPlay2 /> }
                    </div>

                    <ImNext className="cursor-pointer" />
                    
                </div>
                <div>
                    <p>track song progress</p>
                    <input
                    type="range"
                    min="0"
                    className="cursor-pointer"
                    
                    />
                    |<audio></audio>
                    <p>track duration</p>
                </div>
                <div>
                    <FcLike className="cursor-pointer text-4xl" />
                </div>
            </div>
        </section>
    )
}
export default SingleMixCard;