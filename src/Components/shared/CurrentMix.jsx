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
  onNextMixClick, 
  onPrevMixClick,
}) => {
  const [trackProgress, setTrackProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(null);
  const [prevMixId, setPrevMixId] = useState(null);
  

  const navigate = useNavigate();

  useEffect(() => {
  const audioElement = document.getElementById(`audio-${mixId}`);

  // Listen for the "timeupdate" event to update currentTime
  audioElement.addEventListener("timeupdate", () => {
    setCurrentTime(audioElement.currentTime);
  });

  // Listen for the "loadedmetadata" event to update duration
  const handleLoadedMetadata = () => {
    console.log("Loaded metadata event fired");
    setDuration(audioElement.duration);
    console.log("Audio duration:", audioElement.duration);
  };

  // Listen for the "loadedmetadata" event
  audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);

  // Fetch the audio duration asynchronously
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
    audioElement.removeEventListener("timeupdate", () => {});
    audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
  };
}, [mixId]);

  

  const thumbnailFilename = thumbnail.split("\\").pop();
  const audioFilename = audioSrc.split("\\").pop();
 

  const imageUrl = `/MixUploads/Thumbnail/${thumbnailFilename}`;
  const audioUrl = `/MixUploads/Tracks/${audioFilename}`;

  

  // To fetch the profile of an artist in a mix
  const handleArtistClick = () => {
    navigate(`/public profile?userId=${userId}`);
  };

  const handlePlayPause = () => {
    const audioElement = document.getElementById(`audio-${mixId}`);

    if (currentSong === "play") {
      // If the mix is currently playing, pause it
      audioElement.pause();
      setCurrentSong("pause");
      onMixPlay(null); // Notify the parent component that playback stopped
    } else {
      // If the mix is paused, play it
      audioElement.play();
      setCurrentSong("play");
      onMixPlay(mixId); // Notify the parent component that playback started
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


  const handleNextMix = () => {
     
    if (prevMixId) {
      const prevAudioElement = document.getElementById(`audio-${prevMixId}`);
      if (prevAudioElement) {
        prevAudioElement.pause();
        setCurrentSong("pause");
        onMixPlay(null);
      }
    }

    // Notify the parent component to switch to the next mix
    onNextMixClick();
  };

  const handlePrevMix = () => {
    // Pause the previously playing mix (if any)
    if (prevMixId) {
      const prevAudioElement = document.getElementById(`audio-${prevMixId}`);
      if (prevAudioElement) {
        prevAudioElement.pause();
        setCurrentSong("pause");
        onMixPlay(null);
      }
    }
    onPrevMixClick();
  };

  useEffect(() => {
    // Play the mix when the mixId prop changes
    handlePlayPause();
    // Update the previous mix ID
    setPrevMixId(mixId);
  }, [mixId]);

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
              <ImPrevious className="cursor-pointer" onClick={handlePrevMix} />
              <div className="cursor-pointer" onClick={handlePlayPause}>
                {currentSong === "play" ? <ImPause /> : <ImPlay />}
              </div>
              <ImNext className="cursor-pointer" onClick={handleNextMix} />
            </div>

            <div className="flex items-center">
              <p>{formatTime(currentTime)}</p>
              <input
                type="range"
                min="0"
                max={duration}
                value={ currentTime}
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
