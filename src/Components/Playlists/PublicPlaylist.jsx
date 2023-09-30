import React, { useEffect, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import MixCard from "../shared/MixCard";

const PublicPlaylist = ({ playlistId }) => {

  const [playlistData, setPlaylistData] = useState({
    playlistName: "",
    mixData: [],
  });
    const [ currentMix, setCurrentMix ] = useState(null);
    const [ currentlyPlayingMixId, setCurrentlyPlayingMixId ] = useState(null);
    const [ isPlaying, setIsPlaying ] = useState(false);

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
          setPlaylistData((prevPlaylistData) =>
            prevPlaylistData.map((item) =>
              item._id === _id ? { ...item, isFavourite: !isFavourite } : item
            )
          );
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
          const playingMix = playlistData.find((item) => item._id === mixId);
          setCurrentMix({
            ...playingMix,
            currentSong: "play",
            currentTime: 0,
          });
        }
      };

      


    return(
        <section>
            <div>
                <div>
                    <h1>{playlistData.playlistName}</h1>
                </div>
                <div>
                    <ul>
                        <li>
                            <button><MdOutlineDeleteOutline /></button>
                            
                        </li>
                        <li>
                            <button><IoCreateOutline /></button>
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
        </section>
    )
}
export default PublicPlaylist;