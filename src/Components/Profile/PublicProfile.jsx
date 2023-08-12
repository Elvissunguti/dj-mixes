import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { Link } from "react-router-dom";
import NavBar from "../Home/NavBar";
import avatar from "../Assets/avatar.png";
import { BiLogoFacebookCircle, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";
import Favourite from "../shared/Favourite";
import History from "../shared/History";
import Uploads from "../Upload/Uploads";

const PublicProfile = ({coverImage, profilePic, userName, description}) => {
  
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('uploads')

  const handleButtonClick = () => {
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);
    setShowDropdown(false);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'uploads':
        return <Uploads />;
      case 'favorites':
        return <Favourite />;
      case 'history':
        return <History />;
      default:
        return null;
    }
  };

    return(
        <section>
            <NavBar />
            <div>
                <div className="flex items-center justify-center w-full h-48">
                    { coverImage ? (
                        <div>
                            <img
                            src={coverImage}
                            alt="cover image"
                            className=""
                            />

                        </div>   
                    ) : (
                        <div className="flex items-center justify-center space-x-1">
                        <AiOutlineCamera /><Link to="/profilepage"><p className="text-gray-800 hover:text-blue-400">Upload cover image</p></Link>
                     </div>
                    )}

                </div>
                <div className="flex">
                <div className="h-full w-1/5 mx-10 flex flex-col justify-between ">
                    <div className="shadow-xl  w-full">
                        <div className="flex items-center justify-center w-full my-4">
                                {profilePic ? (
                                    <img 
                                    src={profilePic}
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
                                <h1>{userName}</h1>
                            <div>
                                <button onClick={() => setShowDropdown((prevState) => !prevState)}>
                                {isFollowing ? 'FOLLOWING' : 'FOllOW'}

                                </button>
                                
                                {showDropdown && isFollowing && (
                                    <div className="absolute top-10 right-0 mt-2 py-2 px-4 bg-white rounded-lg shadow-md">
                                    {/* Add the unfollow options in the dropdown */}
          
                                   </div>
                                 )}
                            </div>
                            <div>
                                <p>{description} about dj </p>
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
                    <div className="flex flex-col items-center">
      <div className="flex space-x-4 mt-8">
        <button
          className={`${
            activeTab === 'uploads' ? 'bg-blue-500 text-white' : 'bg-white text-black'
          } px-4 py-2 rounded`}
          onClick={() => setActiveTab('uploads')}
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
      </div>
      <div className="mt-8">{renderActiveTab()}</div>
    </div>
                </div>

            </div>
        </section>
    )
}
export default PublicProfile;