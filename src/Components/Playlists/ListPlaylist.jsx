import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import PublicPlaylist from "./PublicPlaylist";

const ListPlaylist = ({ isDropdownOpen, onPlaylistClick }) => {

    const [ playlists, setPlaylist ] = useState([]);

    useEffect(() => {
        const getData = async() => {
            try{
                const response = await makeAuthenticatedGETRequest(
                    "/playlist/get/playlist"
                )
                setPlaylist(response.data);
            } catch(error) {
                console.error("Error fetching feed data:", error);
            }
        }
        getData();
    }, []);



    return(
        <section>
                    
            {/* Check if isDropdownOpen is true before rendering the dropdown */}
            {isDropdownOpen && (
                <div className="dropdown">
                    <ul>
                        {playlists.map((playlist) => (
                            <li
                               key={playlist._id}
                               className="flex  justify-between"
                               onClick={() => onPlaylistClick(playlist._id)}>
                                <p>{playlist.name}</p>
                                <p className="ml-8">{playlist.mixCount}</p>
                                
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        
        </section>
    )
}
export default ListPlaylist;