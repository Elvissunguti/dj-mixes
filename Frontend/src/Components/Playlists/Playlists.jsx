import React from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import PlaylistCard from "./PlaylistCard";
import { useState } from "react";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Playlists = () => {

const [playlistData, setPlaylistData ] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const navigate = useNavigate();

    useEffect(() => {
        const getPlaylist = async () => {
          try {
            const response = await makeAuthenticatedGETRequest(
                "/playlist/get/playlist"
            );
            setPlaylistData(response.data);
            setIsLoading(false);
          } catch (error) {
            console.error("Error fetching feed data:", error);
            setIsLoading(false);
          }
        };
        getPlaylist();
      }, []);


      const handlePlaylistCardClick = () => {
        // You can construct the URL as per your application's routing structure
        navigate("/profile");
      };
   

    return (
        <LoggedInContainer curActiveScreen="playlists" >
            <div className="flex items-start mb-2">
                <h1 className="font-bold text-2xl">Playlists</h1>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {isLoading ? (
                  <div className="min-h-screen flex  justify-center overflow-none">
                    <div className="animate-spin w-20 h-20 border-t-4 border-blue-500 border-solid rounded-full"></div>
                 </div> 
              ) : (
                 playlistData.length > 0 ? (
                  playlistData.map((item, index) => (
                      <PlaylistCard
                      key={index}
                      name={item.name}
                      id={item._id}
                      mixCount={item.mixCount}
                      userName={item.userName} 
                      onClick={() => handlePlaylistCardClick()}
                      
              
                      />
                      
                  ))
              ) : (
                  <p>You have not created any playlists yet.</p>
              )
              )}
                
               
            </div>

        </LoggedInContainer>
    )
}
export default Playlists;