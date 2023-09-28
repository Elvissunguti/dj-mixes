import React from "react";
import mixImage from "../Assets/mix image.png";

const PlaylistCard = ({ name, mixCount, userName}) => {
    return (
        <section className="bg-cover bg-center w-64 h-48 relative rounded-sm " style={{ backgroundImage: `url(${mixImage})`, opacity: 0.8 }}>
            <div className="flex absolute flex-col justify-items-start content-between align-start">
                <div className="flex flex-col align-start mt-4 justify-start ml-4">
                    <h1 className="text-white opacity-100">{name}</h1>
                    <h1 className="text-white">By {userName}</h1>
                </div>
                <div className="ml-2 mt-20">
                    <h1 className="text-white">{mixCount} mix</h1>
                </div>
            </div>
        </section>
    )
}
export default PlaylistCard;