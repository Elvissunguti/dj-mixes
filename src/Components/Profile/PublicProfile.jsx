import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
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
  return <p>Loading...</p>; 
}


  const { userName, coverPic, profilePic,  biography } = profileData;
 

  const coverImageFilename = coverPic ? coverPic.split("\\").pop() : null;
  const profilePicFilename = profilePic ? profilePic.split("\\").pop() : null;

  const coverImageUrl = coverPic ? `/Profile/CoverImage/${coverImageFilename}` : null;
  const profilePicUrl = profilePic ? `/Profile/ProfilePic/${profilePicFilename}` : null;

  const togglePlaylistDropdown = () => {
    setIsPlaylistDropdownOpen(!isPlaylistDropdownOpen);
 };


const handlePlaylistClick = (playlistId) => {
// Set the selected playlist ID when a playlist is clicked
setSelectedPlaylistId(playlistId);
};

    return(
        <section>
            <NavBar />
            <div>
                <div className="flex items-center justify-center w-full h-48">
                    { coverImageUrl ? (
                        <div>
                            <img
                            src={coverImageUrl}
                            alt="cover image"
                            className=""
                            />

                        </div>   
                    ) : (
                        <div className="flex items-center justify-center space-x-1">
                        <AiOutlineCamera /><p className="text-gray-800 hover:text-blue-400">cover image not yet uploaded</p>
                     </div>
                    )}

                </div>
                <div className="flex">
                <div className="h-full w-1/5 mx-10 flex flex-col justify-between ">
                    <div className="shadow-md bg-white w-full">
                        <div className="flex items-center justify-center w-full my-4">
                                {profilePicUrl ? (
                                    <img 
                                    src={profilePicUrl}
                                    alt="profile pic"
                                    className="w-36 rounded-full"
                                    />
                                ) : (
                                    <div>
                                        <img
                                        src={avatar}
                                        alt="avatar"
                                        className="w-36 rounded-full"
                                        />
                                    </div>    
                                )}
                            </div>
                                <h1 className="text-xl my-4 font-bold">{userName}</h1>
                            <div>
                                <div>
                                {!isUserFollowed ? (
                                  <button className="px-4 py-2 rounded font-semibold text-white bg-blue-500 hover:bg-blue-600 shadow-lg" onClick={handleFollowButton}>
                                    FOLLOW
                                  </button>
                                ) : (
                                  <button className="px-4 py-2 rounded font-semibold text-white bg-blue-500 hover:bg-blue-600 shadow-lg" onClick={handleUnfollowButton}>
                                    UNFOLLOW
                                  </button>
                                )}

                                </div>
                                
                            </div>
                            <div className="mt-2">
                                <p>{biography}</p>
                            </div>
                            <div>
                                <ul className="flex flex-row items-center justify-center space-x-2 my-4 text-3xl font-semibold">
                                    <li className="hover:text-green-500 cursor-pointer"><a><BiLogoFacebookCircle /></a></li>
                                    <li className="hover:text-green-500 cursor-pointer"><a><BiLogoTwitter /></a></li>
                                    <li className="hover:text-green-500 cursor-pointer"><a><BiLogoInstagram /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-40 items-start">
                      <div className="flex space-x-2 mt-2">
                        <button
                          className={`${
                          activeTab === 'my mixes' ? 'bg-blue-500 text-white' : 'bg-white text-black'
                          } px-4 py-2 rounded`}
                          onClick={() => setActiveTab('my mixes')}
                        >
                         Shows
                        </button>
                        <button
                          className={`${
                          activeTab === 'favorites' ? 'bg-blue-500 text-white' : 'bg-white text-black'
                          } px-4 py-2 rounded`}
                          onClick={() => setActiveTab('favorites')}
                        >
                        Favorites
                        </button>
                        <button
                          className={`${
                          activeTab === 'post' ? 'bg-blue-500 text-white' : 'bg-white text-black'
                          } px-4 py-2 rounded`}
                          onClick={() => setActiveTab('post')}
                        >
                        Post
                        </button>
                        <div className=" relative">
                         <button className={`${
                            activeTab === 'playlist' ? 'bg-blue-500 text-white' : 'bg-white text-black'
                            } px-4 py-2 rounded`}
                            onClick={() => {
                            setActiveTab('playlist');
                            togglePlaylistDropdown();
                         }}>
                          Playlist
                         </button>
                          {isPlaylistDropdownOpen && (
                             <div className="absolute left-0 mt-2 w-64 max-h-60 overflow-y-auto z-50 ">
                                <PublicListPlaylist
                                    isDropdownOpen={isPlaylistDropdownOpen}
                                    onPlaylistClick={(playlistId) => {
                                    togglePlaylistDropdown();
                                    handlePlaylistClick(playlistId);
                                     }}
                                     className="px-6"

                                />
                             </div>
                           )}
                        </div>
                        </div>
                        <div className="mt-4">{renderActiveTab()}</div>
                    </div>
                </div>

            </div>
        </section>
    )
}
export default PublicProfile;