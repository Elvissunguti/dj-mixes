import React, { useState, useEffect } from "react";
import {
  ImFacebook,
  ImInstagram,
  ImPause,
  ImPlay,
  ImTwitter,
  ImWhatsapp,
} from "react-icons/im";
import { FcShare } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Slider from "@mui/material/Slider";

const PreviewMixCard = ({
  mixId,
  thumbnail,
  userId,
  title,
  artist,
  audioSrc,
  currentlyPlayingMixId,
  onMixPlay,
  isPlaying,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState({});
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const audioElement = document.getElementById(`audio-${mixId}`);

    audioElement.addEventListener("timeupdate", () => {
      setCurrentTime(audioElement.currentTime);
    });

    audioElement.addEventListener("loadedmetadata", () => {
      setDuration((prevDurations) => ({
        ...prevDurations,
        [mixId]: audioElement.duration,
      }));
    });

    return () => {
      audioElement.removeEventListener("timeupdate", () => {});
      audioElement.removeEventListener("loadedmetadata", () => {});
    };
  }, [mixId]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePlayPause = () => {
    const audioElement = document.getElementById(`audio-${mixId}`);
    if (currentlyPlayingMixId === mixId) {
      if (isPlaying) {
        audioElement.pause();
        onMixPlay(mixId, audioElement.currentTime, false);
      } else {
        audioElement.play();
        onMixPlay(mixId, audioElement.currentTime, true);
      }
    } else {
      const currentlyPlayingAudio = document.getElementById(
        `audio-${currentlyPlayingMixId}`
      );
      if (currentlyPlayingAudio && !currentlyPlayingAudio.paused) {
        currentlyPlayingAudio.pause();
        onMixPlay(null, 0, false);
      }
      audioElement.play();
      onMixPlay(mixId, audioElement.currentTime, true);
    }
  };

  const handleSeek = (event) => {
    const audioElement = document.getElementById(`audio-${mixId}`);
    const newTime = (event.target.value / 100) * duration[mixId];
    audioElement.currentTime = newTime;
  };

  const handleArtistClick = () => {
    navigate(`/public-profile?userId=${userId}`);
  };

  const isCurrentMixPlaying = currentlyPlayingMixId === mixId;

  return (
    <section className="relative">
      <div
        className={`flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl  ${
          isCurrentMixPlaying ? "border-4 border-green-500" : "border"
        }`}
      >
        {/* Thumbnail */}
        <div className="relative w-full md:w-1/3">
          <img
            src={thumbnail}
            alt={title}
            className="object-cover w-full h-48 md:h-full"
          />
        </div>

        {/* Mix Info */}
        <div className="flex flex-col p-6 md:w-2/3 justify-between">
          <div className="flex justify-between items-center">
            {/* Play/Pause Button */}
            <div
              className="text-green-500 text-4xl cursor-pointer"
              onClick={handlePlayPause}
            >
              {isPlaying && currentlyPlayingMixId === mixId ? (
                <ImPause />
              ) : (
                <ImPlay />
              )}
            </div>

            {/* Share Button */}
            <div className="relative">
              <FcShare
                className="text-3xl cursor-pointer"
                onClick={() => setOpen(!open)}
              />
              {open && (
                <div className="absolute bg-white border rounded-lg shadow-lg mt-2 px-3 py-2 z-10">
                  <ul className="flex space-x-4 text-gray-600">
                    <li className="hover:text-green-500 transition-colors">
                      <ImWhatsapp className="cursor-pointer" />
                    </li>
                    <li className="hover:text-blue-500 transition-colors">
                      <ImFacebook className="cursor-pointer" />
                    </li>
                    <li className="hover:text-blue-400 transition-colors">
                      <ImTwitter className="cursor-pointer" />
                    </li>
                    <li className="hover:text-pink-500 transition-colors">
                      <ImInstagram className="cursor-pointer" />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Title and Artist */}
          <div className="my-4">
            <h2 className="text-2xl font-bold text-gray-800 hover:text-green-600 cursor-pointer">
              {title}
            </h2>
            <p
              className="text-gray-600 mt-2 hover:text-green-600 cursor-pointer"
              onClick={handleArtistClick}
            >
              By{" "}
              <span className="font-semibold text-gray-700">{artist}</span>
            </p>
          </div>

          {/* Audio and Slider */}
          <div className="mt-4">
            <div className="flex items-center space-x-4">
              <p className="text-gray-600">{formatTime(currentTime)}</p>
              <Slider
                value={
                  isNaN(duration[mixId])
                    ? 0
                    : (currentTime / duration[mixId]) * 100
                }
                onChange={(e, value) => handleSeek({ target: { value } })}
                sx={{
                  width: 300,
                  color: "#10b981",
                  height: 8,
                  "& .MuiSlider-thumb": {
                    height: 24,
                    width: 24,
                    backgroundColor: "#fff",
                    border: "2px solid currentColor",
                  },
                  "& .MuiSlider-track": {
                    border: "none",
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.5,
                    backgroundColor: "#d1d5db",
                  },
                }}
              />
              <p className="text-gray-600">
                {isNaN(duration[mixId]) ? "0:00" : formatTime(duration[mixId])}
              </p>
            </div>
          </div>
        </div>
      </div>

      <audio
        id={`audio-${mixId}`}
        src={audioSrc}
        preload="metadata"
        onEnded={() => onMixPlay(null, 0)}
      ></audio>
    </section>
  );
};

export default PreviewMixCard;
