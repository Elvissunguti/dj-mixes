import React, { useState, useEffect } from "react";
import NavBar from "../Home/NavBar";
import avatar from "../Assets/avatar.png";
import { IoCreateOutline } from "react-icons/io5";
import { BsLink45Deg } from "react-icons/bs";
import { AiOutlineMore, AiOutlineCamera } from "react-icons/ai";
import { Link } from "react-router-dom";
import Favourite from "../shared/Favourite";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import Uploads from "../Upload/Uploads";
import ListPlaylist from "../Playlists/ListPlaylist";
import PlaylistMix from "../Playlists/PlaylistMix";
import MyPost from "../Post/MyPost";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState("my-mixes");
  const [isPlaylistDropdownOpen, setIsPlaylistDropdownOpen] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/profile/get/profiles");
        setProfileData(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };
    getData();
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "my-mixes":
        return <Uploads />;
      case "favorites":
        return <Favourite />;
      case "post":
        return <MyPost />;
      case "playlistMix":
        return selectedPlaylistId ? <PlaylistMix playlistId={selectedPlaylistId} /> : null;
      default:
        return null;
    }
  };

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center overflow-none">
        <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const { userName, coverPic, profilePic } = profileData;

  const togglePlaylistDropdown = () => {
    setIsPlaylistDropdownOpen(!isPlaylistDropdownOpen);
  };

  const handlePlaylistClick = (playlistId) => {
    setSelectedPlaylistId(playlistId);
  };

  return (
    <section className="mx-auto p-4">
      <NavBar />
      <div className="h-full bg-base-100 shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center justify-center h-48 bg-gray-200">
          {coverPic ? (
            <img src={coverPic} alt="Cover" className="object-cover h-full w-full" />
          ) : (
            <div className="flex items-center space-x-2 text-primary">
              <AiOutlineCamera size={24} />
              <Link to="/profile-page" className="hover:text-blue-400">
                Upload cover image
              </Link>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row p-6">
          <div className="md:w-1/4 flex flex-col items-center">
            <div className="w-36 h-36 rounded-full overflow-hidden mb-4 shadow-lg">
              <img src={profilePic || avatar} alt="Profile pic" className="w-full h-full" />
            </div>
            <h1 className="text-xl font-semibold text-center">{userName}</h1>
            <Link to="/profile-page" className="mt-4 btn btn-primary btn-block">
              <IoCreateOutline /> EDIT MY PROFILE
            </Link>
            <ul className="mt-6 space-y-4 text-center text-secondary">
              <li>
                <Link to="/profile-page" className="flex items-center justify-center space-x-2 hover:text-primary">
                  <IoCreateOutline />
                  <p>ADD BIO</p>
                </Link>
              </li>
              <li>
                <Link to="/profile-page" className="flex items-center justify-center space-x-2 hover:text-primary">
                  <BsLink45Deg />
                  <p>ADD SOCIALS</p>
                </Link>
              </li>
              <li>
                <Link to="/profile-page" className="flex items-center justify-center space-x-2 hover:text-primary">
                  <BsLink45Deg />
                  <p>ADD LINKS</p>
                </Link>
              </li>
              <li className="border-t pt-4">
                <Link to="/profile-page" className="flex items-center justify-center space-x-2 hover:text-primary">
                  <AiOutlineMore />
                  <p>MORE OPTIONS</p>
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:w-3/4 mt-10 md:mt-0 p-4">
            <div className="flex justify-start space-x-4 mb-6">
              {["my mixes", "favorites", "post", "playlistMix"].map((tab) => (
                <button
                  key={tab}
                  className={`btn btn-sm ${
                    activeTab === tab ? "btn-primary" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveTab(tab);
                    if (tab === "playlistMix") togglePlaylistDropdown();
                  }}
                >
                  {tab === "my mixes" ? "My Mixes" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {isPlaylistDropdownOpen && (
              <div className="relative mb-4">
                <ListPlaylist
                  isDropdownOpen={isPlaylistDropdownOpen}
                  onPlaylistClick={(playlistId) => {
                    togglePlaylistDropdown();
                    handlePlaylistClick(playlistId);
                  }}
                  className="bg-white shadow-md rounded-lg w-full p-4 max-h-60 overflow-y-auto z-50"
                />
              </div>
            )}

            <div className="bg-base-200 rounded-lg h-auto p-4 shadow-inner">{renderActiveTab()}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
