import React from "react";
import { useNavigate } from "react-router-dom";


const SearchMix = ({ thumbnail, title, artist, userId }) => {

    const navigate = useNavigate();

    const thumbnailFilename = thumbnail.split("\\").pop();
    const imageUrl = `/MixUploads/Thumbnail/${thumbnailFilename}`;

     // To fetch the profile of an artist in a mix
  const handleArtistClick = () => {
    navigate(`/public profile?userId=${userId}`);
  };

    return (
        <section>
            <div>
                <div className="flex ">
                    <img 
                      src={imageUrl}
                      alt="image"
                      className="w-24 h-24 object-center cursor-pointer"
                      onClick={handleArtistClick}
                    />
                    <div className="ml-4">
                        <p className="text-xl">{title}</p>
                        <p className="text-xl hover:text-green-200 cursor-pointer" onClick={handleArtistClick}>
                            {artist}
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
};

export default SearchMix;