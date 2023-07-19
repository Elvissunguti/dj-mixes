import React from "react";
import NavBar from "../Home/NavBar";
import { useState } from "react";
import avatar from "../Assets/avatar.png"
import { IoCreateOutline } from "react-icons/io5";
import { BsLink45Deg } from "react-icons/bs";
import { AiOutlineMore } from "react-icons/ai";
import { Link } from "react-router-dom";

const Profile = () => {

    const [ coverImage, setCoverImage ] = useState(null);
    const [ profilePic, setProfilePic ] = useState(null);

    return(
        <section className="mx-auto max-w-9xl ">
            <NavBar />
            <div className="h-full w-2/5 flex flex-col justify-between ">
                <div>
                    { coverImage ? (
                        <div>
                          <img
                          src={coverImage}
                          alt="Cover image"
                          className=""
                          />
                        </div>
                    ) : (
                        <div>
                            <p>Upload cover image</p>
                        </div>
                    )}
                </div>

                <div className="h-full w-2/5 mx-8  flex flex-col items-center ">
                    <div className="shadow-md ">
                    { profilePic ? (
                        <img
                        src={profilePic}
                        alt="Profile pic"
                        className=""
                        />
                    ) : (
                        <div>
                            <img
                            src={avatar}
                            alt="avatar"
                            className=""
                            />
                        </div>
                    )}
                    <h1>userName</h1>
                    <div className="mt-6">
                        <button className="px-3 py-2 rounded text-white bg-blue-400 hover:bg-blue-700">
                            <Link className="flex items-center text-xl space-x-4 ">
                            <IoCreateOutline /><p>EDIT MY PROFILE</p>
                            </Link>
                        </button>
                    </div>
                    <div>
                        <ul className="space-y-8 mt-4 px-6 ">
                        <li><Link to="/profilepage" className="flex items-center text-lg mx-4 space-x-4  hover:text-blue-800">
                            <IoCreateOutline /><p>ADD BIO</p>
                            </Link></li>
                        <li><Link to="/profilepage" className="flex items-center text-lg mx-4 space-x-4 hover:text-blue-800">
                            <BsLink45Deg /><p>ADD SOCIALS</p>
                            </Link></li>
                        <li><Link to="/profilepage" className="flex items-center text-lg mx-4 space-x-4 hover:text-blue-800">
                            <BsLink45Deg /><p>ADD LINKS</p>
                            </Link></li>
                        <li className="border-t "><Link to="/profilepage" className="flex items-center hover:bg-gray-200 text-lg mx-4 my-4 space-x-4 hover:text-blue-800">
                            <AiOutlineMore /><p>MORE OPTIONS</p>
                            </Link></li>
                        </ul>
                    </div>
                </div>
                </div>

            </div>
        </section>
    )
}
export default Profile;