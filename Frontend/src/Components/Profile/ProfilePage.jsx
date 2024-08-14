import React, { useState } from "react";
import NavBar from "../Home/NavBar";
import {BiLogoFacebookCircle, BiLogoInstagram, BiLogoTwitter} from "react-icons/bi";
import avatar from "../Assets/avatar.png";
import { IoImagesOutline } from "react-icons/io5";
import { makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import { useNavigate } from "react-router-dom";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { storage } from "../Utils/Firebase"; 

const ProfilePage = () => {

    const [ biography, setBiography ] = useState("");
    const [ facebookUrl, setFacebookUrl ] = useState("");
    const [ twitterUrl, setTwitterUrl ] = useState("");
    const [ instagramUrl, setInstagramUrl ]= useState("");
    const [ coverPic, setCoverPic ] = useState(null);
    const [ profilePic, setProfilePic ] = useState(null);
    const [ uploading, setUploading ] = useState(false);

    const navigate = useNavigate();


    const handleCoverChange = (event) => {
        const coverFile = event.target.files[0];
        if(coverFile){
            setCoverPic(coverFile)
        }
    };

    const handlePictureChange = (event) => {
        const imageFile = event.target.files[0];
        if(imageFile){
            setProfilePic(imageFile)
        
        }
    }

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

    const handleProfilePage = async (e) => {
        e.preventDefault();

        if ( !biography || !facebookUrl || !twitterUrl || !instagramUrl || !coverPic || !profilePic){
            console.log("All files are required")
          return;
        };

        setUploading(true);

        try{

            const coverPicUrl = await uploadFileToFirebase(coverPic, `profile/coverPic/${coverPic.name}`);
            const profilePicUrl = await uploadFileToFirebase(profilePic, `profile/profilePic/${profilePic.name}`);

            const formData = {
                biography,
                facebookUrl,
                twitterUrl,
                instagramUrl,
                coverPicUrl,
                profilePicUrl
            };

            const response = await makeAuthenticatedPOSTRequest(
                "/profile/create", formData
            );

            if (response){
                alert("Profile created successfully");  
                navigate("/profile")
                console.log("Mix Created:", response.createdMix);
            }

        } catch (error){
            console.error("Error creating profile", error);
            alert("Could not Create Profile");
        }finally {
            setUploading(false);
        }
    }

    return(
        <section>
            <NavBar />
            <div className="mx-auto py-8 w-1/2 ">
                <p className="font-semibold text-2xl my-4">Your profile settings</p>
                <div className="w-full">
                    <form onSubmit={handleProfilePage} className="w-full flex justify-center items-center flex-col">


                        <div className="flex flex-row justify-center border-t w-full space-x-8  my-4 pt-4">
                            <div className="flex flex-col items-start w-1/2">
                            <label className="font-semibold">Biography</label>
                            <p className="text-gray-500">Up to 1,000 characters.</p>
                            </div>
                            <textarea
                            type="text"
                            id="biography"
                            placeholder="Enter some info about you..."
                            onChange={(e) => setBiography(e.target.value)}
                            className="h-36 w-1/2 bg-gray-100 px-3 py-2 border rounded border-gray-300 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                            />
                        </div>

                        <div className=" border-t pt-4 my-5 w-full">
                        <p className="text-lg font-semibold">Social Links</p>
                        <div className="flex flex-row items-center justify-center my-4 space-x-4">
                            <label><BiLogoFacebookCircle className="text-3xl" /></label>
                            <input
                            type="text"
                            id="facebook"
                            placeholder="https://www.facebook.com/yourusername/"
                            onChange={(e) => setFacebookUrl(e.target.value)}
                            className="px-4 py-2 w-2/3 border rounded border-gray-300 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                            /> 
                        </div>
                        <div className="flex flex-row items-center justify-center my-5 space-x-4">
                            <label><BiLogoTwitter className="text-3xl" /></label>
                            <input
                            type="text"
                            id="twitter"
                            placeholder="https://www.twitter.com/@yournamehere"
                            onChange={(e) => setTwitterUrl(e.target.value)}
                            className="px-4 py-2 w-2/3 border rounded border-gray-300 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center my-5 space-x-4">
                            <label><BiLogoInstagram className="text-3xl"/></label>
                            <input
                            type="text"
                            id="instagram"
                            placeholder="https://www.instagram.com/yourusername"
                            onChange={(e) => setInstagramUrl(e.target.value)}
                            className="px-4 py-2 w-2/3 border rounded border-gray-300 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                            />
                        </div>
                        </div>
                        <div className="flex flex-row my-4 pt-4 space-x-4 border-t w-full ">
                            <div className="flex flex-col items-start w-2/5">
                            <label className="font-semibold">Profile Picture</label>
                            <p className="text-gray-500">JPEG, GIF or PNG</p>
                            </div>
                            <input
                            id="profilePic"
                            type="file"
                            name="profilePic"
                            accept="image/*"
                            onChange={handlePictureChange}
                            className="absolute hidden top-0 left-0 opacity-0  cursor-pointer"
                            />
                            <label
                            htmlFor="profilePic"
                            className="bg-blue-700 h-10 px-3 py-2 text-white font-semibold rounded cursor-pointer">
                                CHOOSE FILE
                            </label>
                            <div className="w-64 h-64">
                                { profilePic ? (
                                    <img
                                    src={URL.createObjectURL(profilePic)}
                                    alt="profile"
                                    className="w-full h-full"
                                    />
                                ) : (
                                    <img 
                                    src={avatar}
                                    alt="avatar"
                                    className="w-full h-full"
                                    />
                                )}
                            </div>
                        </div>


                        <div className="flex flex-row my-4 pt-4 space-x-4 w-full border-t">
                            <div className="flex flex-col items-start w-2/5">
                            <label className="font-semibold">Cover Picture</label>
                            <p className="text-left text-gray-500">We recommend 1600px wide and 350px tall. Avoid using text within your cover image, as it could be cropped on smaller screens.</p>
                            </div>
                            <input
                            id="coverPic"
                            name="coverPic"
                            type="file"
                            accept="image/*"
                            onChange={handleCoverChange}
                            className="hidden"
                            />
                            <label
                            htmlFor="coverPic"
                            className="bg-blue-700 h-10 px-3 py-2  text-white font-semibold rounded cursor-pointer">
                                CHOOSE FILE
                            </label>
                            <div className="w-64 h-16 ">
                                { coverPic ? (
                                    <img
                                    src={URL.createObjectURL(coverPic)}  
                                    alt="cover"
                                    className="w-full h-full"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center text-3xl px-8 py-3 bg-gray-300">
                                        <IoImagesOutline />
                                    </div>    
                                )}
                            </div>
                        </div>
                        <div className="my-4 border-t">
                        <button
                            type="submit"
                            className="px-3 py-2 text-white text-xl font-bold bg-green-400 hover:bg-green-700 cursor-pointer"
                            disabled={uploading} // Disable button while uploading
                        >
                            {uploading ? "Saving..." : "Save Profile settings"}
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </section>
    )
};
export default ProfilePage;