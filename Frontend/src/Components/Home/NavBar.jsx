import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import avatar from "../Assets/avatar.png";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../Context/AuthContext";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import SearchMix from "../shared/SearchMix";
import SearchUser from "../shared/SearchUser";

const NavBar = () => {
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [searchResults, setSearchResults] = useState({ mixes: [], users: [] });
  const [isExpanded, setIsExpanded] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const { handleLogout } = useAuth();
  const navigation = useNavigate();

  const avatarRef = useRef(null); 
  const createRef = useRef(null); 

  useEffect(() => {
    const fetchData = async () => {
      if (searchText.trim() === "") {
        setSearchResults({ mixes: [], users: [] });
      } else {
        try {
          const response = await makeAuthenticatedGETRequest(
            `/search/searchText?query=${searchText}`
          );
          setSearchResults(response.data);
        } catch (error) {
          console.error("Error searching text", error);
        }
      }
    };
    fetchData();
  }, [searchText]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/profile/get/profiles"
      );
      setProfileData(response.data);
    };
    getData();
  }, []);

  const handleSearchInputChange = (e) => setSearchText(e.target.value);
  const handleSearchSubmit = (e) => e.preventDefault();

  const profilePicUrl = profileData?.profilePic || avatar;

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      handleLogout();
      navigation("/");
    }
  };

  // Handle outside clicks for profile dropdown
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setOpenAvatar(false);
      }
      if (createRef.current && !createRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <nav className="bg-base-300 shadow-lg h-16 flex relative">
      <div className="mx-auto flex justify-between items-center max-w-6xl w-full p-4">
        
        {/* Logo Section at the Start */}
        <Link to="/feed" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-12 cursor-pointer" />
        </Link>
  
        {/* Search Bar in the Center */}
        <div className="relative w-full max-w-md mx-auto">
          <form className="flex items-center bg-white rounded-full shadow-md">
            <button className="p-2 ml-2">
              <AiOutlineSearch className="text-gray-500 text-xl" />
            </button>
  
            <input
              type="text"
              placeholder="Search mixes, Deejay..."
              className="w-full pl-2 py-2 text-sm text-gray-800 placeholder-gray-400 rounded-full border-none focus:ring-0"
              value={searchText}
              onChange={handleSearchInputChange}
              onClick={() => setIsExpanded(true)}
              style={{ color: '#4A5568', backgroundColor: '#F7FAFC' }}
            />
  
            {isExpanded && (
              <button
                type="button"
                className="p-2 mr-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsExpanded(false)}
              >
                <AiOutlineClose />
              </button>
            )}
          </form>
        </div>
  
        {/* Navbar Actions at the End */}
        {!isExpanded && (
          <div className="flex items-center space-x-4 flex-shrink-0">
            
            {/* Create Button */}
            <div className="relative"  ref={createRef}>
              <button
                className="btn btn-primary flex items-center space-x-2 px-4 py-2 rounded-md shadow-md hover:bg-primary-focus"
                onClick={() => setIsOpen(!isOpen)}
              >
                <MdAddCircleOutline className="text-lg" />
                <span className="text-sm">CREATE</span>
              </button>
              {isOpen && (
                <div className="absolute top-full left-0 w-40 mt-2 bg-base-100 rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/upload-mix"
                    className="flex items-center justify-start px-4 py-2 text-white hover:bg-base-200"
                  >
                    <MdAddCircleOutline className="mr-2" />
                    Upload
                  </Link>
                  <Link
                    to="/posts"
                    className="flex items-center justify-start px-4 py-2 text-white hover:bg-base-200"
                  >
                    <IoCreateOutline className="mr-2" />
                    Post
                  </Link>
                </div>
              )}
            </div>
  
            {/* User Profile with Dropdown */}
            <div className="relative" ref={avatarRef}>
              <button
                id="user-menu-button"
                type="button"
                className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={() => setOpenAvatar(!openAvatar)}
                aria-expanded={openAvatar}
              >
                <img
                  src={profilePicUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </button>
              {openAvatar && (
                <div
                  id="user-dropdown"
                  className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600 z-50"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {profileData?.userName || "User Name"}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {profileData?.email || "user@example.com"}
                    </span>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                    <li>
                      <Link
                        to="/feed"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </Link>
                    </li>
                  </ul>
                  <div className="py-1">
                    <button
                      onClick={handleLogoutClick}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
  
      {/* Search Results */}
      {isExpanded && (searchResults.mixes.length > 0 || searchResults.users.length > 0) && (
        <div className="absolute top-full w-full bg-white shadow-lg rounded-lg mt-2 max-h-64 overflow-y-auto z-50">
          
          {/* Mix Results */}
          {searchResults.mixes.length > 0 && (
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-2 font-semibold">Mixes</p>
              {searchResults.mixes.map((mix, index) => (
                <SearchMix
                  key={index}
                  thumbnail={mix.thumbnail}
                  title={mix.title}
                  deejay={mix.deejay}
                  genre={mix.genre}
                  userId={mix._id}
                  setSearchText={setSearchText}
                  setIsExpanded={setIsExpanded}
                />
              ))}
            </div>
          )}
  
          {/* User Results */}
          {searchResults.users.length > 0 && (
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-2 font-semibold">Users</p>
              {searchResults.users.map((user, index) => (
                <SearchUser
                  key={index}
                  profilePic={user.profilePic}
                  userName={user.userName}
                  userId={user._id}
                  setSearchText={setSearchText}
                  setIsExpanded={setIsExpanded}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
