import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import NavBar from "../Home/NavBar";
import avatar from "../Assets/avatar.png";
import { BiLogoFacebookCircle, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";
import { useEffect } from "react";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import PublicUploads from "../Upload/PublicUploads";
import PublicFavourites from "../Favourites/PublicFavourites";
import PublicPost from "../Post/PublicPost";
import PublicListPlaylist from "../Playlists/PublicListPlaylist";
import PublicPlaylistMix from "../Playlists/PublicPlaylistMix";

const PublicProfile = () => {
  
  const [activeTab, setActiveTab] = useState('my mixes')
  const [ profileData, setProfileData ] = useState(null);
  const [isPlaylistDropdownOpen, setIsPlaylistDropdownOpen] = useState(false); 
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [isUserFollowed, setIsUserFollowed] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response =  await makeAuthenticatedGETRequest(
            `/profile/get/artistProfile/${userId}`, {}
          );
      
          setProfileData(response.data);
        } catch (error){
            console.error("Error fetching artistProfile :", error);
        }
    }
    fetchData();
}, [userId]);


useEffect(() => {
  const checkFollowsStatus = async () => {
    try{
      const response = await makeAuthenticatedGETRequest(
        `/user/checkfollow/${userId}`
      );

      if (response && response.message === "You are following this artist") {
        setIsUserFollowed(true);
      } else {
        setIsUserFollowed(false);
      }

    } catch(error){
      console.error("Error checking follow status:", error)
    }
  }
  checkFollowsStatus();
}, [userId]);


const handleFollowButton = async() => {
  try{
  const response = await makeAuthenticatedPOSTRequest(
    `/user/follow/${userId}`, {}
  );
  if (response && response.message === "You are now following the artist") {
    setIsUserFollowed(true);
  }
  } catch(error) {
    console.error("Error unfollowing artist:", error)
  }
}

const handleUnfollowButton = async () => {
  try {
    const response = await makeAuthenticatedPOSTRequest(
      `/user/unfollow/${userId}`
    );
    if (response && response.message === "You have unfollowed the artist") {
      setIsUserFollowed(false);
    }

  } catch (error){
    console.error("Error unfollowing artist", error)
  }
}

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'my mixes':
        return <PublicUploads />;
      case 'favorites':
        return <PublicFavourites />;
      case 'post':
        return <PublicPost />;
        case 'playlist':
          return selectedPlaylistId ? <PublicPlaylistMix playlistId={selectedPlaylistId} /> : null;
      default:
        return null;
    }
  };

if (!profileData) {
  return (
    <div className="min-h-screen flex  justify-center overflow-none">
      <div className="animate-spin w-20 h-20 border-t-4 border-blue-500 border-solid rounded-full"></div>
   </div> 
  )
}


  const { userName, coverPic, profilePic,  biography } = profileData;

  const togglePlaylistDropdown = () => {
    setIsPlaylistDropdownOpen(!isPlaylistDropdownOpen);
 };


const handlePlaylistClick = (playlistId) => {
// Set the selected playlist ID when a playlist is clicked
setSelectedPlaylistId(playlistId);
};

return (
  <section className="mx-auto max-w-7xl p-4">
    <NavBar />
    <div className="bg-base-100 shadow-md rounded-lg overflow-hidden">
      {/* Cover Section */}
      <div className="flex items-center justify-center h-48 bg-gray-200">
        {coverPic ? (
          <img src={coverPic} alt="cover" className="object-cover w-full h-full" />
        ) : (
          <div className="flex items-center justify-center text-primary space-x-2">
            <AiOutlineCamera size={24} />
            <p className="text-gray-800 hover:text-blue-400">Cover image not yet uploaded</p>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row p-6">
        {/* Profile Picture and Bio Section */}
        <div className="md:w-1/4 flex flex-col items-center space-y-4">
          <div className="w-36 h-36 rounded-full overflow-hidden shadow-lg">
            <img src={profilePic || avatar} alt="profile pic" className="w-full h-full" />
          </div>
          <h1 className="text-xl font-semibold text-center">{userName}</h1>

          {/* Follow/Unfollow Button */}
          <button
            className={`btn ${isUserFollowed ? "btn-primary" : "btn-outline btn-primary"} mt-4`}
            onClick={isUserFollowed ? handleUnfollowButton : handleFollowButton}
          >
            {isUserFollowed ? "Unfollow" : "Follow"}
          </button>

          {/* Bio */}
          <p className="text-center text-white mt-2">{biography}</p>

          {/* Social Links */}
          <div className="flex space-x-4 text-3xl mt-6">
            <BiLogoFacebookCircle className="hover:text-blue-600 cursor-pointer" />
            <BiLogoTwitter className="hover:text-blue-400 cursor-pointer" />
            <BiLogoInstagram className="hover:text-pink-500 cursor-pointer" />
          </div>
        </div>

        {/* Tabs and Content Section */}
        <div className="md:w-3/4 mt-10 md:mt-0 p-4">
          <div className="flex justify-start space-x-4 mb-6">
            {["my mixes", "favorites", "post", "playlist"].map((tab) => (
              <button
                key={tab}
                className={`btn btn-sm ${
                  activeTab === tab
                    ? "btn-primary"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === "playlist") togglePlaylistDropdown();
                }}
              >
                {tab === "my mixes" ? "Shows" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {isPlaylistDropdownOpen && (
            <div className="relative mb-4">
              <PublicListPlaylist
                isDropdownOpen={isPlaylistDropdownOpen}
                onPlaylistClick={(playlistId) => {
                  togglePlaylistDropdown();
                  handlePlaylistClick(playlistId);
                }}
                className="bg-white shadow-md rounded-lg w-full p-4 max-h-60 overflow-y-auto z-50"
              />
            </div>
          )}

          <div className="bg-base-200 rounded-lg p-4 shadow-inner">{renderActiveTab()}</div>
        </div>
      </div>
    </div>
  </section>
);
};

export default PublicProfile;