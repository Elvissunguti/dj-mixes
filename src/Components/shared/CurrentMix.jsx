import React, { useState, useEffect } from "react";
import {
  ImPrevious,
  ImPause,
  ImPlay,
  ImNext,
  ImWhatsapp,
  ImFacebook,
} from "react-icons/im";
import { FcLike, FcShare } from "react-icons/fc";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineMore,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CurrentMix = ({
  mixId,
  userId,
  thumbnail,
  title,
  artist,
  audioSrc,
  currentSong,
  setCurrentSong,
  isPlaying,
  onMixPlay, 
  onPlayNext, 
  onPlayPrev,
}) => {
  const [trackProgress, setTrackProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(null);
  
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


  

const thumbnailFilename = thumbnail ? thumbnail.split("\\").pop() : "";
const audioFilename = audioSrc ? audioSrc.split("\\").pop() : "";
 

  const imageUrl = `/MixUploads/Thumbnail/${thumbnailFilename}`;
  const audioUrl = `/MixUploads/Tracks/${audioFilename}`;

  

  // To fetch the profile of an artist in a mix
  const handleArtistClick = () => {
    navigate(`/public profile?userId=${userId}`);
  };

  const handlePlayPause = () => {
    console.log("handlePlayPause called with mixId:", mixId);
  
    const audioElement = document.getElementById(`audio-${mixId}`);
  
    if (audioElement) {
      if (currentSong === "play") {
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


  return (
    <section className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-300">
      <div className="mx-auto flex justify-between  max-w-8xl max-w-10xl">
        <div className="flex  w-2/3">
          <div className="flex  ">
            <img src={imageUrl} alt="thumbnail" className=" w-2/5" />
          </div>
          <div className="flex w-3/5">
            <div className="font-medium text-lg flex-row mx-2">
              <p className="hover:text-gray-300 cursor-pointer">{title}</p>
              <p className="hover:text-gray-300 cursor-pointer" onClick={handleArtistClick}>
                {artist}
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
              <p>{formatTime(currentTime)}</p>
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleTrackProgressChange}
                className="w-96 bg-gray-300 cursor-pointer"
              />
              <p>{formatTime(duration)}</p>
            </div>

            <div className="flex flex-row relative space-x-6 items-center">
              <FcLike className="cursor-pointer text-4xl" />
              <AiOutlineMore className="cursor-pointer text-4xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentMix;
