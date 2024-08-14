import React, { useEffect } from "react";
import { useState } from "react";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import MixCard from "../shared/MixCard";
import CurrentMix from "../shared/CurrentMix";
import { Link } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";

const Uploads = () => {

    const [mixData, setMixData ] = useState([]);
    const [currentMix, setCurrentMix] = useState(null);
    const [currentlyPlayingMixId, setCurrentlyPlayingMixId] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [existingPlaylists, setExistingPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
          try{
            const response = await makeAuthenticatedGETRequest(
                "/mix/get/myMix"
            );
            setMixData(response.data);
            setIsLoading(false)
          } catch (error){
            console.error("Error fetching my mixes:", error)
            setIsLoading(false)
          }
        };
        getData();
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
          const playingMix = mixData.find((item) => item._id === mixId);
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
      
        const currentIndex = mixData.findIndex((item) => item._id === currentMix._id);
      
        if (currentIndex > 0) {
          const prevIndex = currentIndex - 1;
          const prevMix = mixData[prevIndex];
      
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
      
        const currentIndex = mixData.findIndex((item) => item._id === currentMix._id);
      
        if (currentIndex !== -1 && currentIndex < mixData.length - 1) {
          const nextIndex = currentIndex + 1;
          const nextMix = mixData[nextIndex];
      
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
        <div className="flex items-start  mb-6">
            <h1 className="font-bold text-xl">MY MIXES</h1>
            <div className="text-xl">
              <Link to="/upload edit">
                 <button className="flex items-center border p-2 rounded-md">
                    <IoCreateOutline  /> EDIT</button>
              </Link>
            </div>
        </div>
        <div className="space-y-4 overflow-auto  ">
        {isLoading ? (
        <div className="min-h-screen flex mr-80 justify-center overflow-none">
          <div className="animate-spin w-20 h-20 border-t-4 border-blue-500 border-solid rounded-full"></div>
        </div> 
      ) : (
        mixData.length > 0 ? (
          mixData.map((item, index) => (
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
               You havent uploaded a mix yet...
              </p>
           )
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
              setCurrentMix({...currentMix, currentMix: songState})
          }
          currentTime={currentMix.currentTime}
          duration={currentMix.duration}
          isPlaying={isPlaying}
          onMixPlay={handlePlayPause}
          onPlayNext={playNextMix} 
          onPlayPrev={playPrevMix}

          />
        )}
    
        </section>
    )
}
export default Uploads;