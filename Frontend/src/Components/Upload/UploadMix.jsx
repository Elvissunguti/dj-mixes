import React, { useState } from "react";
import NavBar from "../Home/NavBar";
import { makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import { useNavigate } from "react-router-dom";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { storage } from "../Utils/Firebase"; 


const UploadMix = () => {

    const [title, setTitle] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [track, setTrack] = useState(null);
    const [uploading, setUploading] = useState(false); // State to handle uploading status

    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        if (imageFile) {
            setThumbnail(imageFile);
        }
    };

    const handleMixChange = (event) => {
        const songFile = event.target.files[0];
        if (songFile) {
            setTrack(songFile);
        }
    };

    const uploadFileToFirebase = (file, path) => {
        return new Promise((resolve, reject) => {
            const storageRef = ref(storage, path);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                },
                (error) => {
                    console.error("Upload failed:", error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!title || !thumbnail || !track) {
            console.log("All fields are required");
            return;
        }

        setUploading(true);

        try {
            // Upload thumbnail and track to Firebase Storage
            const thumbnailUrl = await uploadFileToFirebase(thumbnail, `mix/thumbnails/${thumbnail.name}`);
            const trackUrl = await uploadFileToFirebase(track, `mix/tracks/${track.name}`);

            // Prepare data to send to backend
            const formData = {
                title,
                thumbnailUrl,
                trackUrl
            };

            // Send data to backend
            const response = await makeAuthenticatedPOSTRequest("/mix/create", formData);

            console.log("Server response:", response);

            if (response) {
                alert("Mix created successfully");
                navigate("/my-mixes");
                console.log("Mix Created:", response.createdMix);
            }
        } catch (error) {
            console.error("Error creating mix:", error);
            alert("Could not create mix");
        } finally {
            setUploading(false);
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
                    <div className="mb-6">
                        <label htmlFor="title" className="font-medium text-xl mx-4 mb-2">Enter title of the mix</label>
                        <input
                            id="title"
                            name="title"
                            value={title}
                            placeholder="Enter the title of the mix..."
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="px-6 py-2 text-lg border border-gray-300 placeholder-gray-500 text-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex flex-row-reverse items-center justify-center my-4">
                        <div className="">
                            <label className="block text-xl font-medium mb-2">Enter Mix Thumbnail</label>
                        </div>
                        <div className="">
                            <input
                                type="file"
                                id="thumbnail"
                                name="thumbnail"
                                accept="image/*"
                                className="hidden"
                                required
                                onChange={handleImageChange}
                            />
                            <label htmlFor="thumbnail" className="px-2 py-2 bg-green-200 cursor-pointer">Choose thumbnail</label>
                            <div className="flex items-center w-56 h-56 justify-center border border-red-500">
                                {thumbnail ? (
                                    <img
                                        src={URL.createObjectURL(thumbnail)}
                                        alt="thumbnail preview"
                                        required
                                        className="h-full w-full object-cover"
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
                            id="track"
                            name="track"
                            onChange={handleMixChange}
                            className="hidden"
                            required
                        />
                        <label htmlFor="track" className="px-2 py-3 bg-green-300 mx-2 cursor-pointer">Choose track</label>
                        {track ? (
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
                            className="px-3 py-2 text-white text-xl font-bold bg-green-400 hover:bg-green-700 cursor-pointer"
                            disabled={uploading} // Disable button while uploading
                        >
                            {uploading ? "Uploading..." : "Publish"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UploadMix;
