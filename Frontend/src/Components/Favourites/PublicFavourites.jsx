import React, { useState } from "react";
import MixCard from "../shared/MixCard";
import {  makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import { useEffect } from "react";
import CurrentMix from "../shared/CurrentMix";
import { useLocation } from "react-router-dom";

const PublicFavourites = () => {

    const [ favouriteData, setFavouriteData ] = useState([]);
    const [currentMix, setCurrentMix] = useState(null);
    const [currentlyPlayingMixId, setCurrentlyPlayingMixId] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [existingPlaylists, setExistingPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("userId");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await makeAuthenticatedGETRequest(
                    `/mix/get/userfavourite/${userId}`
                );
                setFavouriteData(response.data);
                setIsLoading(false);
              
            } catch (error){
                console.error("Error fetching favouritedData :", error);
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

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
      <section className="p-6 bg-base-100">
      <div className="flex items-start mb-6">
        <h1 className="font-bold text-2xl text-primary">Favourites</h1>
      </div>
      <div className="space-y-4 overflow-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin w-12 h-12 border-4 border-t-primary border-transparent rounded-full"></div>
          </div>
        ) : favouriteData.length > 0 ? (
          favouriteData.map((item) => (
            <MixCard
              key={item._id}
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
          <p className="text-center text-secondary">Like Mixes to see them here</p>
        )}
      </div>
      {currentMix && (
        <div className="mt-6 bg-base-200 rounded-lg p-4 shadow-lg">
          <CurrentMix
            mixId={currentMix._id}
            userId={currentMix.userId}
            thumbnail={currentMix.thumbnail}
            title={currentMix.title}
            artist={currentMix.artist}
            audioSrc={currentMix.track}
            currentSong={currentMix.currentSong}
            setCurrentSong={(songState) => setCurrentMix({ ...currentMix, currentSong: songState })}
            currentTime={currentMix.currentTime}
            isPlaying={isPlaying}
            onMixPlay={handlePlayPause}
          />
        </div>
      )}
    </section>
  );
}
export default PublicFavourites;