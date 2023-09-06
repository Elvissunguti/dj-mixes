import React, { useState } from "react";
import { ImFacebook, ImPause, ImPlay, ImWhatsapp } from "react-icons/im";
import { AiFillHeart, AiOutlineHeart, AiOutlineInstagram, AiOutlineMore, AiOutlineTwitter } from "react-icons/ai";
import { FcShare } from "react-icons/fc";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
 

const MixCard = ({ mixId, thumbnail, userId, title, artist, audioSrc, isFavourite: initialIsFavourite, toggleFavourite, favouriteCount }) => {

    const [ open, setOpen ] = useState(false);
    const [ currentSong, setCurrentSong ] = useState("pause");
    const [ isFavourite, setIsFavourite ] = useState(initialIsFavourite);
    const [ currentTime, setCurrentTime ] = useState(0);
    const [ duration, setDuration ] = useState(0);

    const navigate = useNavigate();
      
    // useEffect to add favoritedMixes to localStorage
    useEffect(() => {
      // Load favorited mix IDs from local storage
      const favoritedMixes = JSON.parse(localStorage.getItem("favoritedMixes")) || [];
      setIsFavourite(favoritedMixes.includes(mixId));
    }, [mixId]);



      useEffect(() => {
    const audioElement = document.getElementById(`audio-${mixId}`);

    // Listen for the "timeupdate" event to update the currentTime and duration
    audioElement.addEventListener("timeupdate", () => {
      setCurrentTime(audioElement.currentTime);
      setDuration(audioElement.duration);
    });

    // Remove event listener when the component unmounts
    return () => {
      audioElement.removeEventListener("timeupdate", () => {});
    };
  }, [mixId]);
  

    
    const handleFavoriteClick = () => {
      toggleFavourite(mixId);
  
      // Update local storage with favorited mix IDs
      const favoritedMixes = JSON.parse(localStorage.getItem("favoritedMixes")) || [];
      if (isFavourite) {
        const updatedFavoritedMixes = favoritedMixes.filter(id => id !== mixId);
        localStorage.setItem("favoritedMixes", JSON.stringify(updatedFavoritedMixes));
      } else {
        favoritedMixes.push(mixId);
        localStorage.setItem("favoritedMixes", JSON.stringify(favoritedMixes));
      }
  
      setIsFavourite(!isFavourite);
    };
   
  const thumbnailFilename = thumbnail.split("\\").pop();
  const audioFilename = audioSrc.split("\\").pop();

  const imageUrl = `/MixUploads/Thumbnail/${thumbnailFilename}`;
  const audioUrl = `/MixUploads/Tracks/${audioFilename}`;

 
  // To fetch the profile of an artist in a mix
  const handleArtistClick = () => {
    navigate(`/public profile?userId=${userId}`);
  };


  const handlePlay = () => {
    const audioElement = document.getElementById(`audio-${mixId}`);
    audioElement.play();
    setCurrentSong("play");
  };

  const handlePause = () => {
    const audioElement = document.getElementById(`audio-${mixId}`);
    audioElement.pause();
    setCurrentSong("pause");
  };

  const handlePlayPauseClick = () => {
    if (currentSong === "play") {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleSeek = (event) => {
    const audioElement = document.getElementById(`audio-${mixId}`);
    const newTime = (event.target.value / 100) * duration;
    audioElement.currentTime = newTime;
  };
 

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
                        {currentSong === "play" ? (
                        <ImPause onClick={handlePause} /> 
                        ) : (
                           <ImPlay onClick={handlePlay} />
                        )}
                    </div>
                    <div className="text-2xl font-medium">
                        <p className="hover:text-gray-600 cursor-pointer">
                            {title}
                        </p>
                        <p className=" hover:text-gray-600 cursor-pointer" onClick={handleArtistClick}>
                            By <span className="text-gray-500 hover:text-black">{artist}</span>
                        </p>
                    </div>
                </div>
                <div className="flex" onClick={handlePlayPauseClick}>
                    <p>{currentTime.toFixed(0)}s</p>
                    <input 
                      type="range"
                      value={(currentTime / duration) * 100}
                      onChange={handleSeek}
                      className="w-96 bg-gray-300 cursor-pointer"
                    />
                    <p>{duration.toFixed(0)}s</p>
                    </div>
                    
                <div className="flex flex-row relative mt-4 space-x-4">
                    <div onClick={handleFavoriteClick}>
                        { isFavourite ? (
                            <AiFillHeart  className="text-red-600 text-4xl cursor-pointer"  />
                        ) : (
                            <AiOutlineHeart className="text-black text-4xl cursor-pointer" />
                        )}
                        <span className="text-green-600">{favouriteCount}</span>
                    </div>    
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
            <audio id={`audio-${mixId}`} src={audioUrl}></audio>
        </section>
    )
};
 export default MixCard;