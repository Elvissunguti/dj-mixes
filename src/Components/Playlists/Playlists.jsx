import React from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import PlaylistCard from "./PlaylistCard";
import { useState } from "react";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import { useEffect } from "react";


const Playlists = () => {

const [playlistData, setPlaylistData ] = useState([]);

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
   

    return (
        <LoggedInContainer curActiveScreen="playlists" >
            <div>
                <h1>Playlists</h1>
            </div>
            <div>
                { playlistData.length > 0 ? (
                    playlistData.map((item, index) => (
                        <PlaylistCard
                        key={index}
                        name={item.name}
                        id={item._id}
                        mixCount={item.mixCount}
                        userName={item.userName}
                
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