import React, { useState } from "react";
import NavBar from "../Home/NavBar";
import { FiLayers, FiMusic } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { GoVideo } from "react-icons/go";
import { SlPlaylist } from "react-icons/sl";

const LoggedInContainer = ({ children, curActiveScreen }) => {
  const [active, setActive] = useState(null);

  const handleClick = (index) => {
    setActive(index);
  };

  return (
    <section className="bg-gray-900 text-white min-h-screen">
  <NavBar />
  <div className="flex mx-auto mt-2">
    
    {/* Sidebar */}
    <div className="w-1/5 flex flex-col min-h-screen bg-gray-800 py-6 shadow-xl border-r border-gray-700 overflow-y-auto">
      <h2 className="text-xl font-semibold text-center text-green-500 mb-6">Dashboard</h2>
      <ul className="flex flex-col px-6 space-y-8">
        <li>
          <Link
            to="/feed"
            onClick={() => handleClick(0)}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              active === 0 || curActiveScreen === "feed"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-800 hover:bg-green-600 text-gray-400 hover:text-white"
            }`}
          >
            <FiLayers className="text-2xl" />
            <p className="ml-4 text-lg font-medium">FEED</p>
          </Link>
        </li>
        <li>
          <Link
            to="/new-uploads"
            onClick={() => handleClick(1)}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              active === 1 || curActiveScreen === "new-uploads"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-800 hover:bg-green-600 text-gray-400 hover:text-white"
            }`}
          >
            <GoVideo className="text-2xl" />
            <p className="ml-4 text-lg font-medium">NEW UPLOADS</p>
          </Link>
        </li>
        <li>
          <Link
            to="/my-mixes"
            onClick={() => handleClick(2)}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              active === 2 || curActiveScreen === "my-mixes"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-800 hover:bg-green-600 text-gray-400 hover:text-white"
            }`}
          >
            <FiMusic className="text-2xl" />
            <p className="ml-4 text-lg font-medium">MY MIXES</p>
          </Link>
        </li>
        <li>
          <Link
            to="/post-page"
            onClick={() => handleClick(3)}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              active === 3 || curActiveScreen === "post-page"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-800 hover:bg-green-600 text-gray-400 hover:text-white"
            }`}
          >
            <MdOutlineLibraryBooks className="text-2xl" />
            <p className="ml-4 text-lg font-medium">POSTS</p>
          </Link>
        </li>
        <li>
          <Link
            to="/favourites"
            onClick={() => handleClick(4)}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              active === 4 || curActiveScreen === "favourites"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-800 hover:bg-green-600 text-gray-400 hover:text-white"
            }`}
          >
            <AiOutlineHeart className="text-2xl" />
            <p className="ml-4 text-lg font-medium">FAVOURITES</p>
          </Link>
        </li>
        <li>
          <Link
            to="/playlists"
            onClick={() => handleClick(6)}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              active === 6 || curActiveScreen === "playlists"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-800 hover:bg-green-600 text-gray-400 hover:text-white"
            }`}
          >
            <SlPlaylist className="text-2xl" />
            <p className="ml-4 text-lg font-medium">PLAYLISTS</p>
          </Link>
        </li>
      </ul>
    </div>

    {/* Main content */}
    <div className="w-4/5 h-screen overflow-y-auto bg-gray-900">
      <div className="content p-6 bg-gray-800 rounded-lg shadow-lg h-full">
        {children}
      </div>
    </div>
  </div>
</section>

  );
};

export default LoggedInContainer;
