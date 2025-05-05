import React, { useState, useEffect } from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import PlaylistCard from "./PlaylistCard";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import { useNavigate } from "react-router-dom";

const Playlists = () => {
  const [playlistData, setPlaylistData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/playlist/get/playlist");
        setPlaylistData(response.data);
      } catch (error) {
        console.error("Error fetching playlist data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPlaylist();
  }, []);

  const handlePlaylistCardClick = (playlistId) => {
    navigate(`/playlist/${playlistId}`); 
  };

  return (
    <LoggedInContainer curActiveScreen="playlists">
      <div className="flex items-start mb-4">
        <h1 className="text-2xl font-bold">Playlists</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="min-h-screen flex justify-center items-center">
            <div className="animate-spin w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"></div>
          </div>
        ) : playlistData.length > 0 ? (
          playlistData.map((item, index) => (
            <PlaylistCard
              key={index}
              name={item.name}
              mixCount={item.mixCount}
              userName={item.userName}
              onClick={() => handlePlaylistCardClick(item._id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">You have not created any playlists yet.</p>
        )}
      </div>
    </LoggedInContainer>
  );
};

export default Playlists;
