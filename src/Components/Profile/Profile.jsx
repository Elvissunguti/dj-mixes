import React from "react";
import NavBar from "../Home/NavBar";
import { useState } from "react";
import avatar from "../Assets/avatar.png"
import { IoCreateOutline } from "react-icons/io5";
import { BsLink45Deg } from "react-icons/bs";
import { AiOutlineMore } from "react-icons/ai";
import { Link } from "react-router-dom";
import History from "../shared/History";
import Favourite from "../shared/Favourite";

const Profile = () => {

    const [ coverImage, setCoverImage ] = useState(null);
    const [ profilePic, setProfilePic ] = useState(null);
    const [ displayHistory, setDisplayHistory ] = useState(false);


    const handleHistoryButtonClick = () => {
        setDisplayHistory(true);
      };

      const handleFavouritesButtonClick = () => {
        setDisplayHistory(false);
      };

    return(
        <section className="mx-auto max-w-9xl ">
            <NavBar />
            <div className="h-full     ">
                <div className="flex">
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

                <div className="flex">

                <div className="h-full w-1/5   mx-10 flex flex-col justify-between ">
                    <div className="shadow-md  w-full">
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
                        <li className="border-t"><Link to="/profilepage" className="flex  px-2 py-1 items-center hover:bg-gray-200 text-lg  my-4 space-x-4 hover:text-blue-800">
                            <AiOutlineMore /><p>MORE OPTIONS</p>
                            </Link></li>
                        </ul>
                    </div>
                </div>
                </div>
                <div className="w-4/5 h-full mt-6 flex flex-col overflow-auto">
                    <div className="w-full flex flex-start">
                        <button
                           className={`px-3 py-2 mx-6 text-white rounded-xl ${
                           displayHistory ? "bg-gray-800" : "bg-gray-500"
                           } hover:bg-gray-800 outline-none cursor-pointer`}
                           onClick={handleHistoryButtonClick}
                        >
                            History no
                        </button>
                        <button
                          className={`px-3 py-2 text-white rounded-xl ${
                          !displayHistory ? "bg-gray-800" : "bg-gray-500"
                          } hover:bg-gray-800  outline-none cursor-pointer`}
                          onClick={handleFavouritesButtonClick}
                        >
                            Favourites no
                        </button>
                    </div>
                    <div className="mt-4">
                        { displayHistory ? <History />  : <Favourite /> }
                    </div>


                </div>
                </div>

            </div>
        </section>
    )
}
export default Profile;