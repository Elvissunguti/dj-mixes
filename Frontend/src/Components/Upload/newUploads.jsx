import React, { useState, useEffect } from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import MixCard from "../shared/MixCard";
import CurrentMix from "../shared/CurrentMix";

const NewUpload = () => {
  const [newUploads, setNewUploads] = useState([]);
  const [currentMix, setCurrentMix] = useState(null);
  const [currentlyPlayingMixId, setCurrentlyPlayingMixId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [existingPlaylists, setExistingPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewUploads = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/user/get/newUploads");
        setNewUploads(response.data);
      } catch (error) {
        console.error("Error fetching new upload data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewUploads();
  }, []);

  const handlePlayPause = (mixId) => {
    if (currentlyPlayingMixId === mixId) {
      setIsPlaying(false);
      setCurrentlyPlayingMixId(null);
    } else {
      setIsPlaying(true);
      setCurrentlyPlayingMixId(mixId);
      const playingMix = newUploads.find((item) => item._id === mixId);
      setCurrentMix({ ...playingMix, currentSong: "play", currentTime: 0 });
    }
  };

  const changeMix = (direction) => {
    if (!currentMix) return;

    const currentIndex = newUploads.findIndex((item) => item._id === currentMix._id);
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    const newMix = newUploads[newIndex];

    if (newMix) {
      if (isPlaying) {
        setIsPlaying(false);
        const currentAudio = document.getElementById(`audio-${currentMix._id}`);
        if (currentAudio) currentAudio.pause();
      }

      setCurrentMix({ ...newMix, currentSong: "play", currentTime: 0 });
      setCurrentlyPlayingMixId(newMix._id);
      const newAudio = document.getElementById(`audio-${newMix._id}`);
      if (newAudio) newAudio.play();
      setIsPlaying(true);
    }
  };

  const playPrevMix = () => changeMix("prev");
  const playNextMix = () => changeMix("next");

  const createPlaylistAndAddMix = async ({ mixId, name }) => {
    try {
      return await makeAuthenticatedPOSTRequest("/playlist/createPlaylist", { mixId, name });
    } catch (error) {
      console.error("Error creating playlist and adding mix:", error);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/playlist/get/playlist");
      setExistingPlaylists(response.data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  return (
    <LoggedInContainer curActiveScreen="new-uploads">
      <div className="flex items-center mb-4">
        <h1 className="font-bold text-2xl text-primary">NEW UPLOADS</h1>
      </div>

      <div className="space-y-4 overflow-auto">
        {isLoading ? (
          <div className="min-h-screen flex justify-center items-center">
            <div className="animate-spin w-20 h-20 border-t-4 border-primary rounded-full"></div>
          </div>
        ) : newUploads.length > 0 ? (
          newUploads.map((item, index) => (
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
          <p className="text-center text-white text-lg">Follow artists to see new uploads here.</p>
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
          setCurrentSong={(songState) => setCurrentMix({ ...currentMix, currentSong: songState })}
          currentTime={currentMix.currentTime}
          duration={currentMix.duration}
          isPlaying={isPlaying}
          onMixPlay={handlePlayPause}
          onPlayNext={playNextMix}
          onPlayPrev={playPrevMix}
        />
      )}
    </LoggedInContainer>
  );
};

export default NewUpload;
