import React, { useEffect, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { makeAuthenticatedDELETERequest, makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import MixCard from "../shared/MixCard";
import CurrentMix from "../shared/CurrentMix";
import { Link } from "react-router-dom";

const PlaylistMix = ({ playlistId }) => {

    const [playlistData, setPlaylistData] = useState({
       playlistName: "",
       playlistID:"",
       mixData: [],
     });
    const [ currentMix, setCurrentMix ] = useState(null);
    const [ currentlyPlayingMixId, setCurrentlyPlayingMixId ] = useState(null);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{
            const response = await makeAuthenticatedGETRequest(
                `/playlist/playlistMixes/${playlistId}`,
            );
                setPlaylistData(response.data);
            } catch (error){
                console.error("Error fetching mixes from the playlist", error);
            }
        }
        fetchData();
    }, [playlistId]);


    const handleToggleFavourite = async (_id, isFavourite) => {
        try {
          if (isFavourite) {
            await deleteFavourite(_id);
          } else {
            await addFavourite(_id);
          }
          // No need to fetch data again, just update the state with the changed data
          setPlaylistData((prevPlaylistData) => ({
            ...prevPlaylistData,
            mixData: prevPlaylistData.mixData.map((item) =>
              item._id === _id ? { ...item, isFavourite: !isFavourite } : item
            ),
          }));
        } catch (error) {
          console.error("Error toggling favourite:", error);
        }
      };
    
      const addFavourite = async (_id) => {
        try {
          const response = await makeAuthenticatedPOSTRequest(
            "/mix/addFavourite",
            { mixId: _id }
          );
    
          if (response.error) {
            console.error("Error adding to favourites:", response.error);
          }
        } catch (error) {
          console.error("Error adding to favourites:", error);
        }
      };
    
      const deleteFavourite = async (_id) => {
        try {
          const response = await makeAuthenticatedPOSTRequest(
            "/mix/deleteFavourite",
            { mixId: _id }
          );
    
          if (response.error) {
            console.error("Error deleting from favourites:", response.error);
          }
        } catch (error) {
          console.error("Error deleting from favourites:", error);
        }
      };
    
      const handlePlayPause = (mixId) => {
        if (currentlyPlayingMixId === mixId) {
          // Pause the currently playing mix
          setIsPlaying(false);
          setCurrentlyPlayingMixId(null);
        } else {
          // Play the selected mix
          setIsPlaying(true);
          setCurrentlyPlayingMixId(mixId);
          // Find the playing mix data from feedData and set it as the currentMix
          const playingMix = playlistData.mixData.find((item) => item._id === mixId);
          setCurrentMix({
            ...playingMix,
            currentSong: "play",
            currentTime: 0,
          });
        }
      };

      const playPrevMix = () => {
        if (!currentMix) {
          // If no mix is currently set as the currentMix, return or do nothing
          return;
        }
      
        const currentIndex = playlistData.mixData.findIndex((item) => item._id === currentMix._id);
      
        if (currentIndex > 0) {
          const prevIndex = currentIndex - 1;
          const prevMix = playlistData.mixData[prevIndex];
      
          if (prevMix) {
            // Pause the current mix if it is playing
            if (isPlaying) {
              setIsPlaying(false);
              const audioElement = document.getElementById(`audio-${currentMix._id}`);
              if (audioElement) {
                audioElement.pause();
              }
            }
      
            // Set the previous mix as the current mix and play it
            setCurrentMix({
              ...prevMix,
              currentSong: "play", 
              currentTime: 0,
            });
            setCurrentlyPlayingMixId(prevMix._id);
            const audioElement = document.getElementById(`audio-${prevMix._id}`);
              if (audioElement) {
                audioElement.play();
              }
              setIsPlaying(true);
          }
        }
      };
      
      const playNextMix = () => {
        if (!currentMix) {
          // If no mix is currently set as the currentMix, return or do nothing
          return;
        }
      
        const currentIndex = playlistData.mixData.findIndex((item) => item._id === currentMix._id);
      
        if (currentIndex !== -1 && currentIndex < playlistData.mixData.length - 1) {
          const nextIndex = currentIndex + 1;
          const nextMix = playlistData.mixData[nextIndex];
      
          if (nextMix) {
            // Pause the current mix if it is playing
            if (isPlaying) {
              setIsPlaying(false);
              const audioElement = document.getElementById(`audio-${currentMix._id}`);
              if (audioElement) {
                audioElement.pause();
              }
            }
      
            // Set the next mix as the current mix and play it
            setCurrentMix({
              ...nextMix,
              currentSong: "play", 
              currentTime: 0,
            });
            setCurrentlyPlayingMixId(nextMix._id);
            const audioElement = document.getElementById(`audio-${nextMix._id}`);
            if (audioElement) {
              audioElement.play();
            }
            setIsPlaying(true);
          }
        }
      };
      
      const handleDeleteClick = () => {
        setShowDeleteConfirmation(true);
      };

      const handleConfirmDelete = async () => {
        try{
          const response = await makeAuthenticatedDELETERequest(
            `/playlist/deletePlaylist/${playlistId}`
          );
          if (response.message === "Playlist deleted successfully"){

          } else {
            console.error("Error deleting playlist:", response.message);
          }
        } catch (error) {
          console.error("Error deleting playlist:", error);
        }
        setShowDeleteConfirmation(false);
      }

      const handleCancelDelete = () => {
        // Close the confirmation dialog without deleting
        setShowDeleteConfirmation(false);
      };

      


    return(
        <section>
            <div className="flex justify-between">
                <div>
                    <h1 className="font-bold text-xl">{playlistData.playlistName}</h1>
                </div>
                <div className="flex flex-col">
                    <ul className="flex space-x-4">
                        <li className="text-xl">
                          {!showDeleteConfirmation && (
                            <button onClick={handleDeleteClick}><MdOutlineDeleteOutline /> DELETE</button>
                          )}
              
                        </li>
                        <li className="text-xl">
                          {showDeleteConfirmation && (
                            <button onClick={handleConfirmDelete}>CONFIRM</button>
                          )}
                        </li>
                        <li className="text-xl">
                          { showDeleteConfirmation && (
                            <button onClick={handleCancelDelete}>CANCEL</button>
                          )}
                        </li>
                        <li className="text-xl">
                          <Link to={`/edit/${playlistData.playlistID}`}>
                            <button><IoCreateOutline /> EDIT</button>
                          </Link>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="space-y-4 overflow-auto">
          
            {playlistData.mixData.length > 0 ? (
          playlistData.mixData.map((mixItem, mixIndex) => (
            <MixCard
              key={mixIndex}
              mixId={mixItem._id}
              thumbnail={mixItem.thumbnail}
              title={mixItem.title}
              artist={mixItem.artist}
              audioSrc={mixItem.track}
              userId={mixItem.userId}
              toggleFavourite={() =>
                handleToggleFavourite(mixItem._id, mixItem.isFavourite)
              }
              favouriteCount={mixItem.favouriteCount}
              onMixPlay={handlePlayPause}
              currentlyPlayingMixId={currentlyPlayingMixId}
              isPlaying={isPlaying}
            />
          ))
        ) : (
          <p>No mixes in this playlist</p>
        )}   
            </div>
            <div>
            {currentMix && (
        <CurrentMix
          mixId={currentMix._id}
          userId={currentMix.userId}
          thumbnail={currentMix.thumbnail}
          title={currentMix.title}
          artist={currentMix.artist}
          audioSrc={currentMix.track}
          currentSong={currentMix.currentSong}
          setCurrentSong={(songState) =>
            setCurrentMix({ ...currentMix, currentSong: songState })
          }
          currentTime={currentMix.currentTime}
          isPlaying={isPlaying}
          onMixPlay={handlePlayPause}
          onPlayNext={playNextMix} 
          onPlayPrev={playPrevMix}

        />
      )}
      </div>
        </section>
    )
}
export default PlaylistMix;