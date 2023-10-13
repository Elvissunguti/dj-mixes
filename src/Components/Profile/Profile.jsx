import React, { useState, useEffect } from "react";
import NavBar from "../Home/NavBar";
import avatar from "../Assets/avatar.png"
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
    const [activeTab, setActiveTab] = useState('my mixes')
    const [isPlaylistDropdownOpen, setIsPlaylistDropdownOpen] = useState(false); 
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

    // Get request to get the Profile of the current User
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
          case 'post':
            return <MyPost />;
          case 'playlistMix': 
            return selectedPlaylistId ? <PlaylistMix playlistId={selectedPlaylistId} /> : null;
          default:
            return null;
        }
      };


    if (!profileData) {
        return (
            <div className="min-h-screen flex items-center justify-center overflow-none">
               <div className="animate-spin w-20 h-20 border-t-4 border-blue-500 border-solid rounded-full"></div>
            </div> 
        ) 
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
                    <div className="flex flex-col w-4/5 mt-36 relative">
                    <div className="flex">
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
                          activeTab === 'post' ? 'bg-blue-500 text-white' : 'bg-white text-black'
                          } px-4 py-2 rounded`}
                          onClick={() => setActiveTab('post')}
                        >
                         Posts
                        </button>

                        <div className=" relative">
                         <button className={`${
                            activeTab === 'playlistMix' ? 'bg-blue-500 text-white' : 'bg-white text-black'
                            } px-4 py-2 rounded`}
                            onClick={() => {
                            setActiveTab('playlistMix');
                            togglePlaylistDropdown();
                         }}>
                          Playlist
                         </button>
                          {isPlaylistDropdownOpen && (
                             <div className="absolute left-0 mt-2 w-64 max-h-60 overflow-y-auto z-50 ">
                                <ListPlaylist
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
                    </div>
                    <div className="w-full">
                        <div className="mt-2">{renderActiveTab()}</div>
                        </div>
                        </div>
                                    
            </div>
            </div>
        </section>
    )
}
export default Profile;
