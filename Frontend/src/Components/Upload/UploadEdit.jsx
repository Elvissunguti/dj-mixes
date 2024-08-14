import React from "react";
import EditMixCard from "../Edit/EditMixCard";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";
import { makeAuthenticatedDELETERequest, makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import { useState } from "react";
import NavBar from "../Home/NavBar";
import { Link } from "react-router-dom";

const UploadEdit = () => {

    const [ mixUploads, setMixUploads ] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/mix/get/myMix"
            );
            setMixUploads(response.data);
        };
        getData();
    }, []);

    const deleteMix = async (mixId) => {
        try{
            await makeAuthenticatedDELETERequest(
                `/mix/deleteMix/${mixId}`
                );
                setMixUploads((prevMixUploads) => prevMixUploads.filter((mix) => mix._id !== mixId));  
        } catch (error) {
            console.error("Error deleting the Mix", error)
        }
    }

    return (
        <section>
            <NavBar />
            <div className="flex flex-col items-center justify-center mx-auto w-3/5 mt-5 max-w-4xl max-w-7xl">
            <div className="flex justify-between w-full">
                <div className="flex ">
                    <p className="text-xl font-light">Editing</p> 
                </div>
                <div>
                    <Link to="/profile" className="text-xl">Back to Profile</Link>
                </div>
            </div>
                <div className="mt-5 w-full">
                  <ul className="text-center">
                    {mixUploads.map((mix) => (
                            <li className="my-6 text-center" key={mix._id}>
                                <div className="flex justify-between">
                                    <EditMixCard
                                    thumbnail={mix.thumbnail}
                                    title={mix.title}
                                    artist={mix.artist}
                                     />
                                <div className="grid content-center">
                                   <AiOutlineClose
                                     className="text-4xl cursor-pointer hover:text-red-700"
                                     onClick={() => deleteMix(mix._id)}
                                     />
                                </div>
                                </div>
                            </li>
                    ))}
                     </ul>

                </div>
            </div>
        </section>
    )
}
export default UploadEdit;