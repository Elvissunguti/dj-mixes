import React, { useState } from "react";
import MixCard from "../shared/MixCard";
import {  makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import { useEffect } from "react";
import CurrentMix from "./CurrentMix";

const Favourite = () => {

    const [ favouriteData, setFavouriteData ] = useState([]);
    const [currentMix, setCurrentMix] = useState(null);
    const [currentlyPlayingMixId, setCurrentlyPlayingMixId] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await makeAuthenticatedGETRequest(
                    "/mix/favourited"
                );
                console.log(response)
                setFavouriteData(response.data)
                

            } catch (error){
                console.error("Error fetching favouritedData :", error);
            }
        }
        fetchData();
    }, []);




    const handleToggleFavourite = async (_id, isFavourite) => {
        try {
          console.log("Toggling favorite for mix:", _id);
          if (isFavourite) {
            await deleteFavourite(_id);
          } else {
            await addFavourite(_id);
          }
          // No need to fetch data again, just update the state with the changed data
          setFavouriteData((prevFavouriteData) =>
            prevFavouriteData.map((item) =>
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
          const playingMix = favouriteData.find((item) => item._id === mixId);
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
      
        const currentIndex = favouriteData.findIndex((item) => item._id === currentMix._id);
      
        if (currentIndex > 0) {
          const prevIndex = currentIndex - 1;
          const prevMix = favouriteData[prevIndex];
      
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
      
        const currentIndex = favouriteData.findIndex((item) => item._id === currentMix._id);
      
        if (currentIndex !== -1 && currentIndex < favouriteData.length - 1) {
          const nextIndex = currentIndex + 1;
          const nextMix = favouriteData[nextIndex];
      
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
              currentSong: "play", // Set to "play" to indicate it's playing
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

    return(
        <section>
            <div className="flex items-start mb-6">
                <h1 className="font-bold text-xl">Favourites</h1>
            </div>
            <div className="space-y-4 overflow-auto">
            {favouriteData.length > 0 ? (
              favouriteData.map((item, index) => (
               <MixCard
                 key={index}
                 mixId={item._id}
                 userId={item.userId}
                 thumbnail={item.thumbnail}
                 title={item.title}
                 artist={item.artist}
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
        </section>
    )
}
export default Favourite;