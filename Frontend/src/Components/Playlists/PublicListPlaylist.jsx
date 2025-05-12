import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import { useLocation } from "react-router-dom";


const PublicListPlaylist = ({ isDropdownOpen, onPlaylistClick }) => {

    const [ playlists, setPlaylist ] = useState([]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("userId");

    useEffect(() => {
        const getData = async() => {
            try{
                const response = await makeAuthenticatedGETRequest(
                    `/playlist/get/playlist/${userId}`
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
                <div className="px-2 ">
                    <ul>
                        {playlists.map((playlist) => (
                            <li
                               key={playlist._id}
                               className="flex py-5 px-3 no-wrap items-center text-white justify-between  bg-green-400 hover:bg-green-600 cursor-pointer"
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
export default PublicListPlaylist;