import React, { useState } from "react";
import NavBar from "../Home/NavBar";
import axios from "axios";
import { makeAuthenticatedMulterPostRequest } from "../Utils/ServerHelpers";
import { useNavigate } from "react-router-dom";

const UploadMix = () => {


    const [ title, setTitle ] = useState("");
    const [ thumbnail, setThumbnail ] = useState(null);
    const [ track, setTrack ] = useState(null);

    const navigate = useNavigate();


    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        if (imageFile) {
          // Use FileReader to convert the selected image to a data URL
          const reader = new FileReader();
          reader.onloadend = () => {
            setThumbnail(reader.result);
          };
          reader.readAsDataURL(imageFile);
        }
      };

      const handleMixChange = (event) => {
        const songFile = event.target.files[0];
        if (songFile) {
          // You can perform any additional handling here, such as uploading the song to a server or processing it.
          setTrack(songFile);
        }
      };

      const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        if (!title || !thumbnail || !track) {
          console.log("All files are required")
          return;
        }
    
        const formData = new FormData();
        formData.append("title", title);
        formData.append("thumbnailImage", thumbnail);
        formData.append("audio", track);

        try{
          const createdMix = await makeAuthenticatedMulterPostRequest(
            "/mix/create",
            formData
          );
          console.log("Server response:", createdMix);
          
          if (createdMix){
            alert("Mix created successfully");  
            navigate("/my mixes")
            console.log("Mix Created:", createdMix);
          }
        } catch(error) {
          console.error("Error creating mix:", error);
          alert("Could not Create Mix");
          
        }

      };        



    return (
        <section>
            <div>
                <NavBar />
            </div>
            <div className="flex flex-row items-center justify-center mx-auto max-w-4xl max-w-7xl"> 
                <form onSubmit={handleFormSubmit}>
                <h1 className="text-2xl font-bold my-6">Upload Mix</h1>
                    <div className=" mb-6">
                    <label htmlFor="title" className="font-medium text-xl mx-4 mb-2">Enter title of the mix</label>
                    <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    placeholder="Enter The title of the mix..."
                    onChange={(e) => setTitle(e.target.value) }
                    className="px-6 py-2 text-lg border border-gray-300 placeholder-gray-500 text-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500  "
                    />
                    </div>
                    <div className="flex flex-row-reverse items-center justify-center my-4">
                        <div className="">
                        <label className="block text-xl font-medium mb-2">Enter Mix Thumbnail</label>
                        </div>
                        <div className="">
                        <input 
                        type="file"
                        id="thumbnailImage"
                        name="thumbnailImage"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        />
                        <label htmlFor="thumbnailImage" className="px-2 py-2 bg-green-200 cursor-pointer">Choose file</label>
                        <div className="flex items-center w-56 h-56 justify-center border border-red-500">
                          {thumbnail ? (
                            <img
                             src={thumbnail}
                             alt="image of post"
                             required
                    
                            className="h-full w-full object-cover "
                                 />
                          ) : (
                         <div className="flex items-center justify-center w-full h-full bg-gray-200">
                           No Image Selected
                         </div>
                          )}
                         </div>
                         </div>
                        </div>
                    
                    <div className="my-6">
                        <label className="font-medium text-xl">Enter Mix</label>
                        <input
                        type="file"
                        accept="audio/*"
                        id="audio"
                        name="audio"
                        onChange={handleMixChange}
                        className="hidden"
                        />
                        <label htmlFor="audio" className="px-2 py-3 bg-green-300 mx-2 cursor-pointer">Choose file</label>
                        { track ? (
                            <div className="px-2 py-3 my-4 bg-gray-300">
                                <p>{track.name}</p>
                            </div>
                        ) : (
                            <div className="px-2 py-3 my-4 bg-gray-300">
                                <p>No mix has been selected</p>
                            </div>
                        )}
                    </div>
                    <div className="my-4">
                    <button
                    type="submit"
                     className="px-3 py-2 text-white text-xl font-bold bg-green-400 hover:bg-green-700 cursor-pointer">
                        Publish
                    </button>
                </div>
                </form>
            </div>
        </section>
    )
}
export default UploadMix;