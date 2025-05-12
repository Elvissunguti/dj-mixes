import React, { useRef, useState } from "react";
import { ImFacebook, ImPause, ImPlay, ImWhatsapp } from "react-icons/im";
import { AiFillHeart, AiOutlineHeart, AiOutlineInstagram, AiOutlineMore, AiOutlineTwitter } from "react-icons/ai";
import { PiMusicNotesPlusFill, PiMusicNotesPlusThin } from "react-icons/pi";
import { FcShare } from "react-icons/fc";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuListMusic } from "react-icons/lu";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import Slider from "@mui/material/Slider";
 

const MixCard = ({ mixId, thumbnail, userId, title, artist, audioSrc, favouriteCount, currentlyPlayingMixId, onMixPlay, isPlaying, createPlaylistAndAddMix, fetchPlaylists, existingPlaylists }) => {

    const [ open, setOpen ] = useState(false);
    const [ isFavourite, setIsFavourite ] = useState(false);
    const [ currentTime, setCurrentTime ] = useState(0);
    const [ duration, setDuration ] = useState({});
    const [addToPlaylist, setAddToPlaylist] = useState(false);
    const [ playlistName, setPlaylistName ] = useState("");
    const [ existingPlaylist, setExistingPlaylist ] = useState([]);
    
    const navigate = useNavigate();

    const addToPlaylistRef = useRef(null);


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



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addToPlaylistRef.current && !addToPlaylistRef.current.contains(event.target)) {
        setAddToPlaylist(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  


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

 
  // To fetch the profile of an artist in a mix
  const handleArtistClick = () => {
    navigate(`/public_profile?userId=${userId}`);
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
      <div
        className={`flex p-5 mt-5 rounded-lg shadow-lg  ${
          isCurrentMixPlaying ? "bg-gray-800" : "bg-gray-700"
        }`}
      >
        {/* Thumbnail */}
        <div className="w-1/4">
          <img
            src={thumbnail}
            alt=""
            className="h-40 w-40 rounded-lg object-cover shadow-md"
          />
        </div>
    
        {/* Mix Info */}
        <div className="flex flex-col w-3/4 space-x-6 pl-6 justify-between">
          <div className="flex space-x-4 items-center">
            {/* Play/Pause Button */}
            <div
              className="text-5xl cursor-pointer text-green-500 hover:text-green-400"
              onClick={handlePlayPause}
            >
              {isPlaying && currentlyPlayingMixId === mixId ? (
                <ImPause />
              ) : (
                <ImPlay />
              )}
            </div>
    
            {/* Title and Artist */}
            <div className="flex flex-col">
              <p className="text-2xl font-semibold text-white hover:text-green-400 cursor-pointer">
                {title}
              </p>
              <p
                className="text-lg text-gray-400 cursor-pointer hover:text-green-500"
                onClick={handleArtistClick}
              >
                By{" "}
                <span className="text-gray-500 hover:text-white">{artist}</span>
              </p>
            </div>
          </div>
    
          {/* Slider and Time */}
          <div className="flex items-center space-x-4 mt-2">
            <p className="text-gray-400">{formatTime(currentTime)}</p>
            <Slider
              value={isNaN(duration[mixId]) ? 0 : (currentTime / duration[mixId]) * 100}
              onChange={(e, value) => handleSeek({ target: { value } })}
              sx={{
                width: 300,
                color: "#10b981",
                height: 8,
                "& .MuiSlider-thumb": {
                  height: 24,
                  width: 24,
                  backgroundColor: "#fff",
                  border: "2px solid currentColor",
                },
                "& .MuiSlider-track": {
                  border: "none",
                },
                "& .MuiSlider-rail": {
                  opacity: 0.5,
                  backgroundColor: "#d1d5db",
                },
              }}
            />
            <p className="text-gray-400">{formatTime(duration[mixId])}</p>
          </div>
    
          {/* Actions (Favorite, Playlist, Share) */}
          <div className="flex items-center space-x-6 mt-4">
            {/* Favorite */}
            <div onClick={handleFavoriteClick} className="relative">
              {isFavourite ? (
                <AiFillHeart className="text-red-600 text-4xl cursor-pointer" />
              ) : (
                <AiOutlineHeart className="text-gray-400 text-4xl cursor-pointer hover:text-white" />
              )}
            
            </div>
    
            {/* Add to Playlist */}
            <div className="relative">
              <PiMusicNotesPlusFill
                className="text-gray-400 text-4xl cursor-pointer hover:text-green-500"
                onClick={handleAddToPlaylistClick}
              />
              {addToPlaylist && (
                <div ref={addToPlaylistRef} className="absolute z-50 left-0 top-full mt-2 w-60 bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-4">
                  <input
                    type="text"
                    placeholder="NEW PLAYLIST"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    onKeyPress={handleInputKeyPress}
                    className="w-full bg-gray-900 text-white border-b border-gray-600 rounded-t-lg p-2 focus:outline-none"
                  />
                  <ul className="max-h-32 overflow-y-auto mt-2">
                    {existingPlaylists.map((playlist) => (
                      <li
                        key={playlist._id}
                        className="flex items-center p-2 bg-gray-700 hover:bg-gray-900 text-white cursor-pointer"
                        onClick={() => addMixToPlaylist(playlist._id, mixId)}
                      >
                        <LuListMusic className="mr-2" /> {playlist.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
    
            {/* Share */}
            <FcShare
              className="text-gray-400 text-4xl cursor-pointer hover:text-green-500"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="absolute bg-gray-800 text-white top-full mt-2 px-2 py-3 rounded-lg shadow-lg">
                <ul className="flex items-center justify-center space-x-4 text-xl font-medium">
                  <li>
                    <AiOutlineTwitter className="cursor-pointer" />
                  </li>
                  <li>
                    <ImWhatsapp className="cursor-pointer" />
                  </li>
                  <li>
                    <ImFacebook className="cursor-pointer" />
                  </li>
                  <li>
                    <AiOutlineInstagram className="cursor-pointer" />
                  </li>
                </ul>
              </div>
            )}
    
            {/* More options */}
            <AiOutlineMore className="cursor-pointer text-4xl hover:text-white" />
          </div>
        </div>
      </div>
      <audio
        id={`audio-${mixId}`}
        src={audioSrc}
        preload="metadata"
        onEnded={() => onMixPlay(null, 0)}
      ></audio>
    </section>
    
    )
};
 export default MixCard;