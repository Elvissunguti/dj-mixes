import React, { useState, useEffect } from "react";
import {
  ImPrevious,
  ImPause,
  ImPlay,
  ImNext,
} from "react-icons/im";
import { AiOutlineMore } from "react-icons/ai";
import { LuVolume2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const CurrentMix = ({
  mixId,
  userId,
  thumbnail,
  title,
  artist,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  onMixPlay, 
  onPlayNext, 
  onPlayPrev,
}) => {
  const [trackProgress, setTrackProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(null);
  const [isVolumeIconHovered, setIsVolumeIconHovered] = useState(false);
  const [volume, setVolume] = useState(() => {
    // Initialize volume from localStorage or default to 100
    return parseFloat(localStorage.getItem("volume")) || 100;
  });

  
  
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure mixId is defined and not null before trying to obtain the audio element
    if (!mixId) {
      return; // Early return if mixId is not defined
    }
  
    const audioElement = document.getElementById(`audio-${mixId}`);
  
    // Check if audioElement is not null before adding event listeners
    if (!audioElement) {
      return; // Early return if audioElement is not found
    }
  
    // Listen for the "timeupdate" event to update currentTime
    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };
  
    audioElement.addEventListener("timeupdate", handleTimeUpdate);
  
    // Listen for the "loadedmetadata" event to update duration
    const handleLoadedMetadata = () => {
      console.log("Loaded metadata event fired");
      setDuration(audioElement.duration);
      console.log("Audio duration:", audioElement.duration);
    };
  
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);

    const fetchAudioDuration = async () => {
      try {
        
        const duration = audioElement.duration;
        setDuration(duration);
        console.log("Audio duration:", duration);
      } catch (error) {
        console.error("Error fetching audio duration:", error);
      }
    };
  
    fetchAudioDuration();
  
    // Clean up event listeners on unmount
    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [mixId]);


  useEffect(() => {
    // Update the audio element's volume based on the stored volume
    const audioElement = document.getElementById(`audio-${mixId}`);
    if (audioElement) {
      audioElement.volume = volume / 100; // Convert to a range between 0 and 1
    }
  }, [mixId, volume])


  // To fetch the profile of an artist in a mix
  const handleArtistClick = () => {
    navigate(`/public profile?userId=${userId}`);
  };

  const handlePlayPause = () => {
    console.log("handlePlayPause called with mixId:", mixId);
  
    const audioElement = document.getElementById(`audio-${mixId}`);
  
    if (audioElement) {
      if (isPlaying && currentSong === "play") {
        console.log("Pausing mix with mixId:", mixId);
        // If the mix is currently playing, pause it
        audioElement.pause();
        setCurrentSong("pause");
        onMixPlay(mixId, audioElement.currentTime, false); 
        
      } else {
        console.log("Playing mix with mixId:", mixId);
        // If the mix is paused, play it
        audioElement.play();
        setCurrentSong("play");
        onMixPlay(mixId, audioElement.currentTime, true); 
        
      }
    } else {
      console.error(`Audio element with id "audio-${mixId}" not found.`);
    }
  };
  
  
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleTrackProgressChange = (event) => {
    const newProgress = parseFloat(event.target.value);
    setTrackProgress(newProgress);

    // Update the audio element's currentTime based on the new progress
    const audioElement = document.getElementById(`audio-${mixId}`);
    audioElement.currentTime = newProgress;
  };

  const handleVolumeIconHover = () => {
    setIsVolumeIconHovered(true);
  };

  const handleVolumeIconLeave = () => {
    setIsVolumeIconHovered(false);
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);

    // Update the audio element's volume based on the new value  for all mixes
    const audioElements = document.querySelectorAll('[id^="audio-"]');
    audioElements.forEach((audioElement) => {
      audioElement.volume = newVolume / 100; 
    });

    // Save the volume setting to localStorage
    localStorage.setItem("volume", newVolume);
  };


  return (
    <section className="fixed bottom-0 left-0 right-0 bg-gray-800 px-4 border-t border-gray-700">
      <div className="mx-auto flex justify-between items-center h-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center align-center w-3/4 space-x-4">
          <div className="flex  ">
            <img src={thumbnail} alt="thumbnail" className="w-20 h-20 rounded-lg" />
          </div>
          <div className="flex items-center w-3/5">
            <div className="font-medium text-lg flex-row px-4">
              <p className="flex justify-start font-semibold  text-xl hover:text-gray-300 cursor-pointer whitespace-nowrap">{title}</p>
              <p className="flex justify-start text-sm hover:text-gray-300  cursor-pointer whitespace-nowrap" onClick={handleArtistClick}>
               By {artist}
              </p>
            </div>

            <div className="flex items-center between space-x-6 text-4xl mx-4 ">
              <ImPrevious className="cursor-pointer" onClick={onPlayPrev} />
              <div className="cursor-pointer" onClick={handlePlayPause}>
                {isPlaying && currentSong === "play" ? <ImPause /> : <ImPlay />}
              </div>
              <ImNext className="cursor-pointer" onClick={onPlayNext} />
            </div>

            <div className="flex items-center">
              <p className="mx-2">{formatTime(currentTime)}</p>
              <input
  type="range"
  min="0"
  max={duration}
  value={currentTime}
  onChange={handleTrackProgressChange}
  className="w-96 h-2 bg-gray-300 cursor-pointer appearance-none"
  style={{
    background: `linear-gradient(to right, #10b981 ${((currentTime / duration) * 100) || 0}%, #d1d5db 0%)`,
  }}
/>
              <p className="mx-2">{formatTime(duration)}</p>
            </div>

            <div className="flex flex-row relative space-x-6 items-center">
            <div 
  className="relative flex items-center space-x-2 group"
  onMouseEnter={handleVolumeIconHover}
  onMouseLeave={handleVolumeIconLeave}
>
  <LuVolume2 className="text-white text-2xl cursor-pointer hover:text-green-400 transition-colors duration-200" />

  {isVolumeIconHovered && (
    <input
      type="range"
      min="0"
      max="100"
      value={volume}
      onChange={handleVolumeChange}
      className="w-24 h-1 bg-gray-500 rounded-full appearance-none transition-all duration-300 cursor-pointer
        [&::-webkit-slider-thumb]:appearance-none 
        [&::-webkit-slider-thumb]:w-3 
        [&::-webkit-slider-thumb]:h-3 
        [&::-webkit-slider-thumb]:rounded-full 
        [&::-webkit-slider-thumb]:bg-green-400 
        [&::-moz-range-thumb]:w-3 
        [&::-moz-range-thumb]:h-3 
        [&::-moz-range-thumb]:rounded-full 
        [&::-moz-range-thumb]:bg-green-400 
        shadow-md"
    />
  )}
</div>


              <AiOutlineMore className="cursor-pointer text-4xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentMix;