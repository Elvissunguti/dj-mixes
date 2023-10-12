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
    const [existingPlaylists, setExistingPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try{
            const response = await makeAuthenticatedGETRequest(
                `/playlist/playlistMixes/${playlistId}`,
            );
                setPlaylistData(response.data);
                setIsLoading(false);
            } catch (error){
                console.error("Error fetching mixes from the playlist", error);
                setIsLoading(false);
            }
        }
        fetchData();
    }, [playlistId]);

    
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

      const  createPlaylistAndAddMix = async ({mixId, name}) => {
        try{
          const response = await makeAuthenticatedPOSTRequest(
            "/playlist/createPlaylist", { mixId, name}
          );
          return response;
    
        } catch (error) {
          console.error("Error creating playlist and adding mix:", error);
        }
      };
    
      const fetchPlaylists = async () => {
        try{
          const response = await makeAuthenticatedGETRequest(
            "/playlist/get/playlist"
          );
          console.log(response.data);
          setExistingPlaylists(response.data);
        } catch (error) {
          console.error("Error fetching Playlist", error)
        }
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
                            <button onClick={handleDeleteClick} className="flex  items-center border p-2 rounded-md">
                              <MdOutlineDeleteOutline /> DELETE</button>
                          )}
              
                        </li>
                        <li className="flex text-xl">
                          {showDeleteConfirmation && (
                            <button onClick={handleConfirmDelete} className="border bg-red-500 hover:bg-red-700 text-white p-2 rounded-md" >
                              CONFIRM</button>
                          )}
                        </li>
                        <li className="text-xl">
                          { showDeleteConfirmation && (
                            <button onClick={handleCancelDelete} className="border hover:text-blue-500 p-2 rounded-md">CANCEL</button>
                          )}
                        </li>
                        <li className="text-xl">
                          <Link to={`/edit/${playlistData.playlistID}`}>
                            <button className="flex items-center  border p-2 rounded-md">
                              <IoCreateOutline  /> EDIT</button>
                          </Link>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="space-y-4 overflow-auto">
            {isLoading ? (
        <div className="min-h-screen flex  justify-center overflow-none">
          <div className="animate-spin w-20 h-20 border-t-4 border-blue-500 border-solid rounded-full"></div>
        </div> 
      ) : (
        playlistData.mixData.length > 0 ? (
          playlistData.mixData.map((item, index) => (
            <MixCard
              key={index}
              mixId={item._id}
              thumbnail={item.thumbnail}
              title={item.title}
              artist={item.artist}
              audioSrc={item.track}
              userId={item.userId}
              favouriteCount={item.favouriteCount}
              onMixPlay={handlePlayPause}
              currentlyPlayingMixId={currentlyPlayingMixId}
              isPlaying={isPlaying}
              createPlaylistAndAddMix={createPlaylistAndAddMix}
              fetchPlaylists={fetchPlaylists}
              existingPlaylists={existingPlaylists}
             />
             ))
             ) : (
               <p>
                  Add mixes to playlist to see mixes here
              </p>
           )
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