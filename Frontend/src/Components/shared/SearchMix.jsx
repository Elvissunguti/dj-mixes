import React from "react";
import { useNavigate } from "react-router-dom";

const SearchMix = ({ thumbnail, title, artist, userId }) => {
    const navigate = useNavigate();

    

    const handleArtistClick = () => {
        navigate(`/public-profile?userId=${userId}`);
    };

    return (
        <section className="p-4 ">
            <div className="card card-side bg-base-100 shadow-xl rounded-lg overflow-hidden">
                <div className="flex">
                    <img
                        src={thumbnail}
                        alt="Mix Thumbnail"
                        className="w-24 h-24 object-cover rounded-l-lg cursor-pointer hover:opacity-90"
                        onClick={handleArtistClick}
                    />
                    <div className="flex flex-col justify-center p-4 space-y-2">
                        <p className="text-lg font-semibold">{title}</p>
                        <p
                            className="text-md text-primary cursor-pointer hover:underline"
                            onClick={handleArtistClick}
                        >
                            {artist}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SearchMix;
