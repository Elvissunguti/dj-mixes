import React, { useEffect } from "react";
import NavBar from "../Home/NavBar";
import { useState } from "react";
import { makeAuthenticatedDELETERequest, makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import { useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import EditMixCard from "./EditMixCard";

const Edit = () => {

    const [ mixPlaylist, setMixPlaylist ] = useState({
        playlistName:"",
        mixData: []
    });
    const { playlistID } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await makeAuthenticatedGETRequest(
                    `/playlist/playlistMixes/${playlistID}`,
                )
                setMixPlaylist(response.data);
            } catch (error) {
                console.error("Error fetching mixes from the playlist", error);
            }
        }
        fetchData();
    }, [playlistID])

    const deleteMix = async (mixId) => {
        try{
            await makeAuthenticatedDELETERequest(
                `/playlist/deletePlaylistMix/${playlistID}/${mixId}`
            );

            setMixPlaylist((prevMixPlaylist) => ({
                ...prevMixPlaylist,
                mixData: prevMixPlaylist.mixData.filter((mix) => mix._id !== mixId),
            }))

        } catch (error) {
            console.error("Error deleting the Mix from playlist", error)
        }
    };


    return(
        <section>
            <NavBar />
            <div className="flex flex-col items-center justify-center mx-auto w-3/5 mt-5 max-w-4xl max-w-7xl">
            <div className="flex justify-between w-full">
                <div className="flex ">
                    <p className="text-xl font-light">Editing</p>
                    <p className="text-xl font-light ml-4">{mixPlaylist.playlistName}</p>
                </div>
                <div>
                    <button className="text-xl">Back to playlist</button>
                </div>
            </div>
            <div className="mt-5 w-full">
            <ol className="list-decimal text-center list-outside">
                { mixPlaylist.mixData.map((mix) => (
                    <li className="my-6 text-center" key={mix._id}>
                      <div className="flex justify-between">
                        <EditMixCard
                          thumbnail={mix.thumbnail}
                          title={mix.title}
                          artist={mix.artist}
                        />
                        <div className="grid content-center">
                           <AiOutlineClose
                               className="text-4xl cursor-pointer"
                               onClick={() => deleteMix(mix._id)}/>
                       </div>
                       </div>
                    </li>
                    
                ))}
                </ol>

            </div>
            </div>
        </section>
    )

}
export default Edit;