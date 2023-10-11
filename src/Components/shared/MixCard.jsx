import React, { useState } from "react";
import { ImFacebook, ImPause, ImPlay, ImWhatsapp } from "react-icons/im";
import { AiFillHeart, AiOutlineHeart, AiOutlineInstagram, AiOutlineMore, AiOutlineTwitter } from "react-icons/ai";
import { PiMusicNotesPlusFill, PiMusicNotesPlusThin } from "react-icons/pi";
import { FcShare } from "react-icons/fc";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuListMusic } from "react-icons/lu";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
 

const MixCard = ({ mixId, thumbnail, userId, title, artist, audioSrc, favouriteCount, currentlyPlayingMixId, onMixPlay, isPlaying, createPlaylistAndAddMix, fetchPlaylists, existingPlaylists }) => {

    const [ open, setOpen ] = useState(false);
    const [ isFavourite, setIsFavourite ] = useState(false);
    const [ currentTime, setCurrentTime ] = useState(0);
    const [ duration, setDuration ] = useState({});
    const [addToPlaylist, setAddToPlaylist] = useState(false);
    const [ playlistName, setPlaylistName ] = useState("");
    const [ existingPlaylist, setExistingPlaylist ] = useState([]);
    
    const navigate = useNavigate();


    useEffect(() => {

      const audioElement = document.getElementById(`audio-${mixId}`);
  
      // Listen for the "timeupdate" event to update currentTime
      audioElement.addEventListener("timeupdate", () => {
        setCurrentTime(audioElement.currentTime);
      });
  
      // Listen for the "loadedmetadata" event to update the duration
      audioElement.addEventListener("loadedmetadata", () => {
        // Update the mixDurations state with the new duration
        setDuration((prevDurations) => ({
          ...prevDurations,
          [mixId]: audioElement.duration,
        }));
      });
  
      // Remove event listeners when the component unmounts
      return () => {
        audioElement.removeEventListener("timeupdate", () => {});
        audioElement.removeEventListener("loadedmetadata", () => {});
      };
    }, [mixId]);


    useEffect(() => {
      let timeoutId;
      if (addToPlaylist) {
        timeoutId = setTimeout(() => {
          setAddToPlaylist(false);
        }, 20000); 
      }
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, [addToPlaylist]);


  // Function to check if the mix is favorited
  const checkIfFavorited = async () => {
    try {
      // Make a GET request to the backend to check if the mix is favorited by the user
      const response = await makeAuthenticatedGETRequest(`/mix/checkfavourited?mixId=${mixId}`);
      if (response && response.data && response.data.favouredMixes && response.data.favouredMixes.includes(mixId)) {
        setIsFavourite(true); 
      } else {
        setIsFavourite(false);
      }
    } catch (error) {
      console.error("Error checking if mix is favorited:", error);
    }
  };

  useEffect(() => {
  
    checkIfFavorited();
  }, [mixId]);


  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const addFavourite = async (mixId) => {
    try {
      const response = await makeAuthenticatedPOSTRequest(
        "/mix/addFavourite",
        { mixId }
      );

      if (response.error) {
        console.error("Error adding to favourites:", response.error);
      }
    } catch (error) {
      console.error("Error adding to favourites:", error);
    }
  };

  const deleteFavourite = async ( mixId) => {
    try {
      const response = await makeAuthenticatedPOSTRequest(
        "/mix/deleteFavourite",
        { mixId }
      );

      if (response.error) {
        console.error("Error deleting from favourites:", response.error);
      }
    } catch (error) {
      console.error("Error deleting from favourites:", error);
    }
  };
  
    // Function to handle the favorite click
    const handleFavoriteClick = async () => {
      if (isFavourite) {
        await deleteFavourite(mixId);
      } else {
        await addFavourite(mixId);
      }
      setIsFavourite(!isFavourite); // Toggle the isFavourite state
    };
   
  const thumbnailFilename = thumbnail.split("\\").pop();
  const audioFilename = audioSrc.split("\\").pop();

  const imageUrl = `/MixUploads/Thumbnail/${thumbnailFilename}`;
  const audioUrl = `/MixUploads/Tracks/${audioFilename}`;

 
  // To fetch the profile of an artist in a mix
  const handleArtistClick = () => {
    navigate(`/public profile?userId=${userId}`);
  };


    // Function to handle playing or pausing a mix
    const handlePlayPause = () => {
      const audioElement = document.getElementById(`audio-${mixId}`);
      if (currentlyPlayingMixId === mixId) {
        // If the mix is already playing, pause it
        if (isPlaying) {
          audioElement.pause();
          onMixPlay(mixId, audioElement.currentTime, false );
          
        } else {
          // If the mix is paused, resume playback
          audioElement.play();
          onMixPlay(mixId, audioElement.currentTime, true);
         
        }
      } else {
        // Pause the currently playing mix, if there is one
        const currentlyPlayingAudio = document.getElementById(
          `audio-${currentlyPlayingMixId}`
        );
        if (currentlyPlayingAudio && !currentlyPlayingAudio.paused) {
          currentlyPlayingAudio.pause();
          onMixPlay(null, 0, false); // Notify that playback stopped
        }
  
        // Play the selected mix
        audioElement.play();
        onMixPlay(mixId, audioElement.currentTime, true);
        
      }
    };

  

  const handleSeek = (event) => {
    const audioElement = document.getElementById(`audio-${mixId}`);
    const newTime = (event.target.value / 100) * duration[mixId];
    audioElement.currentTime = newTime;
  };

  const handleAddToPlaylistClick = () => {
    setAddToPlaylist(!addToPlaylist);
    if(!addToPlaylist){
      fetchPlaylists();
    }
  };

    const handleCreatePlaylistAndAddMix = async () => {
    
      try {
        const response = await createPlaylistAndAddMix({
          mixId,
          name: playlistName, 
        });
  
        if (response && response.playlist) {
          console.log('Playlist created successfully:', response.playlist);
          setExistingPlaylist((prevPlaylists) => [
            ...prevPlaylists,
            response.playlist,
          ]);
        } else {
          console.error('Failed to create playlist:', response.error);
        }
      } catch (error) {
        console.error('Error creating playlist:', error);
      }
  
      // Reset the input field and hide it
      setPlaylistName('');
      setAddToPlaylist(false);
    };
  
    // Function to handle pressing the "Enter" key in the input field
    const handleInputKeyPress = (e) => {
      if (e.key === 'Enter') {
        // If the "Enter" key is pressed, create the playlist and add the mix
        handleCreatePlaylistAndAddMix();
      }
    };

    const addMixToPlaylist = async (playlistId, mixId) => {
      try {
          // Prepare the data to be sent in the request body
          const requestData = {
              mixId,
              playlistId,
          };
  
          // Make a POST request to the backend route with the data in the request body
          const response = await makeAuthenticatedPOSTRequest(
            "/playlist/addPlaylist", requestData
            );
  
          if (response && response.success) {

            alert("Error adding mix to playlist");
          } else {
            alert("Mix added to playlist successfully"); 
            setAddToPlaylist(false);

          }
      } catch (error) {
          console.error("Error adding mix to playlist:", error);
      }
  };
  

  const isCurrentMixPlaying = currentlyPlayingMixId === mixId;


    return(
        <section className="relative">
            <div className={`flex p-5 mt-5 rounded w-2/3 ${isCurrentMixPlaying ? "bg-gray-300" : "bg-gray-100"}`}>
                <div className="w-1/5">
                    <img src={imageUrl} alt="image"
                    className="h-44 w-44 rounded object-cover" />
                </div>
                <div className="flex flex-col w-4/5 space-x-12 mt-4 pl-4">
                <div className="flex space-x-4 my-4">
                    <div className="  text-5xl cursor-pointer" onClick={handlePlayPause}>
                        {isPlaying && currentlyPlayingMixId === mixId ? (
                           <ImPause  /> 
                        ) : (
                           <ImPlay  />
                        )}
                    </div>
                    <div className="flex flex-col items-start text-2xl font-medium">
                        <p className="hover:text-gray-600 cursor-pointer">
                            {title}
                        </p>
                        <p className=" hover:text-gray-600 cursor-pointer" onClick={handleArtistClick}>
                            By <span className="text-gray-500 hover:text-black">{artist}</span>
                        </p>
                    </div>
                </div>
                <div className="flex" >
                    <p>{formatTime(currentTime)}</p>
                    <input 
                      type="range"
                      value={(isNaN(duration[mixId]) ? 0 : (currentTime / duration[mixId]) * 100)}
                      onChange={handleSeek}
                      className="w-96 bg-gray-300 cursor-pointer"
                    />
                    <p>{formatTime(duration[mixId])}</p>
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
                    <div className="relative" >
                       <PiMusicNotesPlusFill className="text-4xl cursor-pointer" onClick={handleAddToPlaylistClick} />
                    {addToPlaylist && (
                    <div className="absolute z-10 left-0 bottom-0 mb-7 w-60 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <PiMusicNotesPlusThin className="w-6 h-6 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="NEW PLAYLIST"
                          value={playlistName}
                          onChange={(e) => setPlaylistName(e.target.value)}
                          onKeyPress={handleInputKeyPress}
                          className="pl-10 px-4 py-2 border-b border-gray-300 rounded-t-lg w-full focus:outline-none"
                        />
                       </div>
                         <div className="max-h-32 overflow-y-auto">
                             <ul>
                               {existingPlaylists.map((playlist) => (
                                 <li
                                    key={playlist._id}
                                    className="flex cursor-pointer py-2 px-4 hover:bg-gray-100"
                                    onClick={() => addMixToPlaylist(playlist._id, mixId)}
                                 >
                                   <LuListMusic className="mr-2" /> {playlist.name}
                                 </li>
                               ))}
                             </ul>
                        </div>
                        </div>
                       )}
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
            <audio id={`audio-${mixId}`} src={audioUrl} preload="metadata" onEnded={() => onMixPlay(null, 0)}></audio>
        </section>
    )
};
 export default MixCard;