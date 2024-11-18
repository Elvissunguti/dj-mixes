import React, { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import MixCard from "../shared/MixCard";
import CurrentMix from "../shared/CurrentMix";
import { useLocation } from "react-router-dom";

const PublicPlaylistMix = ({ playlistId }) => {
  const [playlistData, setPlaylistData] = useState({
    playlistName: "",
    playlistID: "",
    mixData: [],
  });
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
          `/playlist/playlistMixes/${userId}/${playlistId}`
        );
        setPlaylistData(response.data);
      } catch (error) {
        console.error("Error fetching mixes from the playlist", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [playlistId]);

  const handlePlayPause = (mixId) => {
    if (currentlyPlayingMixId === mixId) {
      setIsPlaying(false);
      setCurrentlyPlayingMixId(null);
    } else {
      setIsPlaying(true);
      setCurrentlyPlayingMixId(mixId);
      const playingMix = playlistData.mixData.find((item) => item._id === mixId);
      setCurrentMix({
        ...playingMix,
        currentSong: "play",
        currentTime: 0,
      });
    }
  };

  const playPrevMix = () => {
    if (!currentMix) return;
    const currentIndex = playlistData.mixData.findIndex((item) => item._id === currentMix._id);
    if (currentIndex > 0) {
      const prevMix = playlistData.mixData[currentIndex - 1];
      setCurrentMix({
        ...prevMix,
        currentSong: "play",
        currentTime: 0,
      });
      setCurrentlyPlayingMixId(prevMix._id);
      setIsPlaying(true);
    }
  };

  const playNextMix = () => {
    if (!currentMix) return;
    const currentIndex = playlistData.mixData.findIndex((item) => item._id === currentMix._id);
    if (currentIndex < playlistData.mixData.length - 1) {
      const nextMix = playlistData.mixData[currentIndex + 1];
      setCurrentMix({
        ...nextMix,
        currentSong: "play",
        currentTime: 0,
      });
      setCurrentlyPlayingMixId(nextMix._id);
      setIsPlaying(true);
    }
  };

  const createPlaylistAndAddMix = async ({ mixId, name }) => {
    try {
      await makeAuthenticatedPOSTRequest("/playlist/createPlaylist", { mixId, name });
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
    <section className="p-6 bg-base-100 rounded-lg shadow-lg">
      <div className="flex flex-col items-start mb-6">
        <h1 className="text-3xl font-semibold text-primary">{playlistData.playlistName}</h1>
      </div>
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin w-16 h-16 border-t-4 border-primary border-solid rounded-full"></div>
          </div>
        ) : playlistData.mixData.length > 0 ? (
          playlistData.mixData.map((item, index) => (
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
          <p className="text-center text-gray-500">Follow artist to see mixes here.</p>
        )}
      </div>
      {currentMix && (
        <div className="mt-6">
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
        </div>
      )}
    </section>
  );
};

export default PublicPlaylistMix;
