import React, { useState, useEffect } from "react";
import MixCard from "../shared/MixCard";
import LoggedInContainer from "../Containers/LoggedInContainer";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from "../Utils/ServerHelpers";
import CurrentMix from "../shared/CurrentMix";
import { useParams } from "react-router-dom";

const PlaylistDetails = () => {
    const [playlistInfo, setPlaylistInfo] = useState(null);
  const [currentMix, setCurrentMix] = useState(null);
  const [currentlyPlayingMixId, setCurrentlyPlayingMixId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [existingPlaylists, setExistingPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { playlistId }= useParams();

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(`/playlist/playlistMixes/${playlistId}`);
        setPlaylistInfo(response.data); 
      } catch (error) {
        console.error("Error fetching playlist mixes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [playlistId]);

  const handlePlayPause = (mixId) => {
    if (currentlyPlayingMixId === mixId) {
      setIsPlaying(false);
      setCurrentlyPlayingMixId(null);
    } else {
      setIsPlaying(true);
      setCurrentlyPlayingMixId(mixId);
      const playingMix = playlistInfo.mixData.find((item) => item._id === mixId);
      setCurrentMix({ ...playingMix, currentSong: "play", currentTime: 0 });
    }
  };

  const playPrevMix = () => {
    if (!currentMix) return;
    const currentIndex = playlistInfo.mixData.findIndex((item) => item._id === currentMix._id);
    if (currentIndex > 0) {
      const prevMix = playlistInfo.mixData[currentIndex - 1];
      setCurrentMix({ ...prevMix, currentSong: "play", currentTime: 0 });
      setCurrentlyPlayingMixId(prevMix._id);
      setIsPlaying(true);
    }
  };

  const playNextMix = () => {
    if (!currentMix) return;
    const currentIndex = playlistInfo.mixData.findIndex((item) => item._id === currentMix._id);
    if (currentIndex !== -1 && currentIndex < playlistInfo.mixData.length - 1) {
      const nextMix = playlistInfo.mixData[currentIndex + 1];
      setCurrentMix({ ...nextMix, currentSong: "play", currentTime: 0 });
      setCurrentlyPlayingMixId(nextMix._id);
      setIsPlaying(true);
    }
  };

  const createPlaylistAndAddMix = async ({ mixId, name }) => {
    try {
      const response = await makeAuthenticatedPOSTRequest("/playlist/createPlaylist", { mixId, name });
      return response;
    } catch (error) {
      console.error("Error creating playlist and adding mix:", error);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/playlist/get/playlist");
      setExistingPlaylists(response.data);
    } catch (error) {
      console.error("Error fetching Playlist", error);
    }
  };

  return (
    <LoggedInContainer curActiveScreen="feed">
      <div className="flex items-start mb-4">
        <h1 className="font-bold text-3xl text-primary">Playlist's Mix -- {playlistInfo?.playlistName || "Loading playlist"}</h1>
      </div>
      <div className="space-y-6 overflow-y-axis">
        {isLoading ? (
          <div className="flex justify-center min-h-screen">
            <div className="animate-spin rounded-full w-12 h-12 border-t-4 border-primary"></div>
          </div>
        ) : (
            playlistInfo && playlistInfo.mixData.length > 0 ? (
                playlistInfo.mixData.map((item, index) => (
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
            <p className="text-center text-gray-500">Follow artists to see mixes here</p>
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
          setCurrentSong={(songState) => setCurrentMix({ ...currentMix, currentSong: songState })}
          currentTime={currentMix.currentTime}
          isPlaying={isPlaying}
          onMixPlay={handlePlayPause}
          onPlayNext={playNextMix}
          onPlayPrev={playPrevMix}
        />
      )}
    </LoggedInContainer>
  );
};

export default PlaylistDetails;
