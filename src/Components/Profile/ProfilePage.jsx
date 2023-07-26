import React, { useState } from "react";
import NavBar from "../Home/NavBar";
import {BiLogoFacebookCircle, BiLogoInstagram, BiLogoTwitter} from "react-icons/bi";
import avatar from "../Assets/avatar.png";
import { IoImagesOutline } from "react-icons/io5";

const ProfilePage = () => {

    const [ displayName, setDisplayName ] = useState("");
    const [ biography, setBiography ] = useState("");
    const [ facebookUrl, setFacebookUrl ] = useState("");
    const [ twitterUrl, setTwitterUrl ] = useState("");
    const [ instagramUrl, setInstagramUrl ]= useState("");
    const [ coverPic, setCoverPic ] = useState(null);
    const [ profilePic, setProfilePic ] = useState(null);

    return(
        <section>
            <NavBar />
            <div className="mx-auto py-8 w-3/4 ">
                <p className="font-semibold text-2xl my-4">Your profile settings</p>
                <div className="w-full">
                    <form className="w-full flex justify-center items-center flex-col">

                        <div className="flex flex-row space-x-4 my-4">
                            <div className="flex flex-col items-start">
                        <label className="font-semibold">Display name</label>
                        <p className="text-gray-500">Spaces and special characters are fine</p>
                        </div>
                        <input
                        type="text"
                        id="name"
                        placeholder="Display name"
                        onChange={(e) =>setDisplayName(e.target.value) } 
                        className="w-38 px-3 py-2 rounded "
                        />
                        </div>

                        <div className="flex flex-row justify-center  border-t w-full space-x-8 my-4 pt-4">
                            <div className="flex flex-col items-start">
                            <label className="font-semibold">Biography</label>
                            <p>Up to 1,000 characters.</p>
                            </div>
                            <textarea
                            type="text"
                            id="biography"
                            placeholder="Enter some info about you..."
                            onChange={(e) => setBiography(e.target.value)}
                            className="h-36 w-1/4 bg-gray-100 px-3 py-2"
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
                            className="px-4 py-2 w-1/2 border rounded border-gray-300 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                            /> 
                        </div>
                        <div className="flex flex-row items-center justify-center my-5 space-x-4">
                            <label><BiLogoTwitter className="text-3xl" /></label>
                            <input
                            type="text"
                            id="twitter"
                            placeholder="https://www.twitter.com/@yournamehere"
                            onChange={(e) => setTwitterUrl(e.target.value)}
                            className="px-4 py-2 w-1/2 border rounded border-gray-300 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center my-5 space-x-4">
                            <label><BiLogoInstagram className="text-3xl"/></label>
                            <input
                            type="text"
                            id="instagram"
                            placeholder="https://www.instagram.com/yourusername"
                            onChange={(e) => setInstagramUrl(e.target.value)}
                            className="px-4 py-2 w-1/2 border rounded border-gray-300 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                            />
                        </div>
                        </div>
                        <div className="flex flex-row my-4 pt-4 space-x-4 relative border-t  ">
                            <div className="flex flex-col items-start">
                            <label className="font-semibold">Profile Picture</label>
                            <p>JPEG, GIF or PNG</p>
                            </div>
                            <input
                            id="profilePic"
                            type="file"
                            accept=".jpg,.jpeg,.gif,.png"
                            className="absolute hidden top-0 left-0 opacity-0  cursor-pointer"
                            />
                            <label
                            htmlFor="profilePic"
                            className="bg-blue-700 px-3 py-2 text-white font-semibold rounded cursor-pointer">
                                CHOOSE FILE
                            </label>
                            <div className="w-56 h-56">
                                { profilePic ? (
                                    <img
                                    src={profilePic}
                                    alt="profile picture"
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


                        <div className="flex flex-row my-4 pt-4 relative space-x-4 border-t">
                            <div className="flex flex-col mr-8 justify-start items-start w-2/3">
                            <label className="font-semibold">Cover Picture</label>
                            <p>We recommend 1600px wide and 350px tall. Avoid using text within your cover image, as it could be cropped on smaller screens.</p>
                            </div>
                            <input
                            id="coverPic"
                            type="file"
                            accept=".jpg,.jpeg,.gif,.png"
                            className="hidden"
                            />
                            <label
                            htmlFor="coverPic"
                            className="bg-blue-700 px-3 py-2 text-white font-semibold rounded cursor-pointer">
                                CHOOSE FILE
                            </label>
                            <div className="w-56 h-16 ">
                                { coverPic ? (
                                    <img
                                    src={coverPic}
                                    alt="cover picture"
                                    className="w-full h-full"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center text-3xl px-8 py-3 bg-gray-300">
                                        <IoImagesOutline />
                                    </div>    
                                )}
                            </div>
                        </div>
                        <div className="border-t my-4">
                            <button type="submit"
                             className="px-3 py-2 text-lg text-white text-bold bg-blue-600 hover:bg-blue-800 rounded">
                                SAVE PROFILE SETTINGS
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
};
export default ProfilePage;