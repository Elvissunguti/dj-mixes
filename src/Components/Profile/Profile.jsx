import React, { useState, useEffect } from "react";
import NavBar from "../Home/NavBar";
import avatar from "../Assets/avatar.png"
import { IoCreateOutline } from "react-icons/io5";
import { BsLink45Deg } from "react-icons/bs";
import { AiOutlineMore, AiOutlineCamera } from "react-icons/ai";
import { Link } from "react-router-dom";
import History from "../shared/History";
import Favourite from "../shared/Favourite";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import Uploads from "../Upload/Uploads";
import PublicPlaylist from "../Playlists/PublicPlaylist";
import ListPlaylist from "../Playlists/ListPlaylist";


const Profile = () => {
    
    const [profileData, setProfileData] = useState(null); 
    const [activeTab, setActiveTab] = useState('uploads')
    const [isPlaylistDropdownOpen, setIsPlaylistDropdownOpen] = useState(false); 
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

    // Get request to get the Profile of thge current User
    useEffect(() => {
        const fetchData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/profile/get/profiles"
            );
            setProfileData(response.data);
        };
        fetchData();
    }, []);

    const renderActiveTab = () => {
        switch (activeTab) {
          case 'my mixes':
            return <Uploads />;
          case 'favorites':
            return <Favourite />;
          case 'history':
            return <History />;
          default:
            return null;
        }
      };


    if (!profileData) {
        return <p>Loading...</p>; 
    };

    const { userName, coverPic, profilePic } = profileData;
    
    // Convert backslashes to forward slashes and extract filenames
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


    return (
        <section className="mx-auto max-w-9xl ">
            <NavBar />
            <div className="h-full">
                <div className="flex items-center justify-center w-full h-48">
                    {coverImageUrl ? (
                        <img
                            src={coverImageUrl}
                            alt="Cover image"
                            className="object-cover "
                        />
                    ) : (
                        <div className="flex items-center justify-center space-x-1">
                            <AiOutlineCamera /><Link to="/profilepage"><p className="text-gray-800 hover:text-blue-400">Upload cover image</p></Link>
                        </div>
                    )}
                </div>

                <div className="flex ">
                    <div className="h-full w-1/5 mx-10 flex flex-col justify-between">
                        <div className="shadow-md bg-white w-full">
                            <div className="flex items-center justify-center w-full my-4">
                                {profilePicUrl ? (
                                    <img
                                        src={profilePicUrl}
                                        alt="Profile pic"
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
                            
                            <h1 className="text-xl font-semibold">{userName}</h1>
                            <div className="mt-6">
                                <button className="px-3 py-2 rounded text-white bg-blue-400 hover:bg-blue-700">
                                    <Link to="/profilepage" className="flex items-center text-xl space-x-4 ">
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
                    <div className="flex flex-col mt-36 relative">
                    <div className="flex flex  ">
                      <div className="flex space-x-4 mt-8">
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
                          activeTab === 'history' ? 'bg-blue-500 text-white' : 'bg-white text-black'
                          } px-4 py-2 rounded`}
                          onClick={() => setActiveTab('history')}
                        >
                        History
                        </button>

                        <button
                          onClick={togglePlaylistDropdown}
                          className="bg-blue-500    text-white px-4 py-2 rounded"
                          
                        >
                            Playlist
                        </button>
                        
                        
                        </div>
                        <ListPlaylist 
                           isDropdownOpen={isPlaylistDropdownOpen} 
                           onPlaylistClick={handlePlaylistClick} 
                           className="absolute left-0 ml-8" />

                        {selectedPlaylistId && (
                           <PublicPlaylist playlistId={selectedPlaylistId} />
                        )}
                    </div>
                    <div className="">
                        
                        <div className="mt-8 ">{renderActiveTab()}</div>
                        </div>
                        </div>
                                    
            </div>
            </div>
        </section>
    )
}
export default Profile;
