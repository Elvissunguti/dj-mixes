import React from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import { useState } from "react";
import { useEffect } from "react";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import MixCard from "../shared/MixCard";
import CurrentMix from "../shared/CurrentMix";

const NewUpload = () => {

    const [ newUploads, setNewUploads ] = useState([]);
    const [currentMix, setCurrentMix] = useState(null);
    const [currentlyPlayingMixId, setCurrentlyPlayingMixId] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);


    useEffect(() => {
        const uploads = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/user/get/newUploads"
            )
            setNewUploads(response.data);
        }
        uploads();
    }, []);


    const handleToggleFavourite = async (_id, isFavourite) => {
        try {
          if (isFavourite) {
            await deleteFavourite(_id);
          } else {
            await addFavourite(_id);
          }
          // No need to fetch data again, just update the state with the changed data
          setNewUploads((prevFeedData) =>
            prevFeedData.map((item) =>
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
          const playingMix = newUploads.find((item) => item._id === mixId);
          setCurrentMix({
            ...playingMix,
            currentSong: "play",
            currentTime: 0,
            duration: playingMix.trackDuration,
          });
        }
      };


    return(
        <LoggedInContainer curActiveScreen="new uploads">
            <div>
                <h1>NEW UPLOADS</h1>
            </div>
            <div>
            {newUploads.length > 0 ? (
              newUploads.map((item, index) => (
                <MixCard
                  key={index}
                  mixId={item._id} 
                  thumbnail={item.thumbnail} 
                  title={item.title} 
                  artist={item.artist} 
                  userId={item.userId}
                  audioSrc={item.track}
                  toggleFavourite={() =>
                    handleToggleFavourite(item._id, item.isFavourite)
                  }
                  favouriteCount={item.favouriteCount}
                  onMixPlay={handlePlayPause}
                  currentlyPlayingMixId={currentlyPlayingMixId}
                  isPlaying={isPlaying}
                />
                ))
             ) : (
             <p>Loading...</p>
            )}
            </div>
            {currentMix && (
              <CurrentMix
              mixId={currentMix._id}
              thumbnail={currentMix.thumbnail}
              title={currentMix.title}
              artist={currentMix.artist}
              audioSrc={currentMix.track}
              currentSong={currentMix.currentSong}
              setCurrentSong={(songState) =>
                setCurrentMix({ ...currentMix, currentSong: songState })
              }
              currentTime={currentMix.currentTime}
              duration={currentMix.duration}
              isPlaying={isPlaying}
              onMixPlay={handlePlayPause}
              
              />
            )}
        </LoggedInContainer>
    )
}
export default NewUpload;