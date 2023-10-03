import React from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import PlaylistCard from "./PlaylistCard";
import { useState } from "react";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Playlists = () => {

const [playlistData, setPlaylistData ] = useState([]);
const navigate = useNavigate();

    useEffect(() => {
        const getPlaylist = async () => {
          try {
            const response = await makeAuthenticatedGETRequest(
                "/playlist/get/playlist"
            );
            console.log(response)
            setPlaylistData(response.data);
          } catch (error) {
            console.error("Error fetching feed data:", error);
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
            <div className="flex items-start mb-6">
                <h1 className="font-bold text-xl">Playlists</h1>
            </div>
            <div className="grid grid-cols-4 gap-4">
                { playlistData.length > 0 ? (
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
                    <p>Loading...</p>
                )}
               
            </div>

        </LoggedInContainer>
    )
}
export default Playlists;