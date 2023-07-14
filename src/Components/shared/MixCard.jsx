import React, { useState } from "react";
import avatar from "../Assets/avatar.png";
import { ImFacebook, ImPause, ImPlay, ImWhatsapp } from "react-icons/im";
import { AiOutlineHeart, AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FcShare } from "react-icons/fc";
 

const MixCard = () => {

    const [ open, setOpen ] = useState(false);
    const [ currentSong, setCurrentSong ] = useState("play")

    return(
        <section className="mx-auto flex justify-between ">
            <div className="flex border border-b-green-500 w-2/3">
                <div className="w-2/3">
                    <img src={avatar} alt=""
                    className="h-48 w-48 object-cover" />
                </div>
                <div className="flex flex-row">
                <div className="flex ">
                    <div className="font-medium text-4xl cursor-pointer  ">
                        {currentSong === "play" ? <ImPause /> : <ImPlay />}
                    </div>
                    <div className="text-2xl font-medium">
                        <p>Name of mix</p>
                        <p>Name of dj</p>
                    </div>
                </div>
                <div className="flex" >
                    <input 
                    type="range"
                    min="0"
                    className="cursor-pointer"
                    />
                </div>
                <div className="flex flex-row">
                    <ul className="flex flex-row">
                        <li>
                            <AiOutlineHeart /> no likes
                        </li>
                        <li>
                        <FcShare className="cursor-pointer text-4xl" onClick={() => setOpen(!open)}/>
                    { open && (
                        <div className="absolute bg-green-500 top-full mt-2 w-18 ">
                            <ul className="flex text-xl font-medium">
                                <li><AiOutlineTwitter /></li>
                                <li><ImWhatsapp /></li>
                                <li><ImFacebook /></li>
                                <li><AiOutlineInstagram /></li>
                            </ul>

                        </div>
                    )}
                        </li>
                    </ul>
                </div>
                </div>

            </div>
        </section>
    )
};
 export default MixCard;