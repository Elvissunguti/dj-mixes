import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { useEffect } from "react";
import avatar from "../Assets/avatar.png"
import Logout from "../Logout/Logout";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import SearchMix from "../shared/SearchMix";
import SearchUser from "../shared/SearchUser";

const NavBar = () => {

    const [ searchText, setSearchText ] = useState("");
    const [ isOpen, setIsOpen ] = useState(false);
    const [openAvatar, setOpenAvatar] = useState(false);
    const [searchResults, setSearchResults] = useState({ mixes: [], users: [] });
    const [isExpanded, setIsExpanded] = useState(false);
    


    useEffect(() => {
        const fetchData = async () => {
            try{
                if (searchText.trim() === "" ){
                    setSearchResults({ mixes: [], users: []})
                } else {
                    const response = await makeAuthenticatedGETRequest(
                        `/search/searchText?query=${searchText}`
                    );
                    setSearchResults(response.data)  
                }

            } catch(error){
                console.error("Error searching text", error);
            }
        }
        fetchData();
    }, [searchText]);


    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value);
      };

      const handleSearchSubmit = (e) => {
        e.preventDefault(); 
       
      };

      const handleInputClick = () => {
        setIsExpanded(true);
      };

      if (searchResults === null) {
        return <div>Loading...</div>;
      };

    


    return(
        <nav className="relative">
            <div className="mx-auto flex justify-between items-center max-w-4xl max-w-7xl" >
                <div className="flex ">
                    <div className="">
                        <Link to="/feed">
                        <img src={logo} alt=""
                         className="w-auto h-20 flex cursor-pointer" />
                         </Link>
                    </div>
                    <div className="flex items-center  px-5 space-x-3 ">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <AiOutlineSearch className="text-3xl text-white font-semibold" />
                        </div>
                        <form onSubmit={handleSearchSubmit}>
                        <input
                         type="text"
                         placeholder="Search"
                         className={`${
                          isExpanded ? "w-96" : "w-80"
                        } text-xl text-white pl-12 px-3 py-2 bg-gray-600 rounded-none rounded-b-md border border-gray-300 placeholder-white focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
                         value={searchText}
                         onChange={handleSearchInputChange}
                         onClick={handleInputClick}
                        
                        />
                        </form>
                        </div>
                        {isExpanded && (
                          <div className="absolute top-0 right-0 mt-3 mr-3">
                            <button
                              className="text-gray-500 text-3xl hover:text-gray-700"
                              onClick={() => setIsExpanded(false)}
                            >
                              <AiOutlineClose />
                           </button>
                        </div>
                        )}
                    </div>
                </div>
                { !isExpanded && (
                 <>
                <div className="relative flex flex-col items-center justify-center ">
                    <button className="border border-green-300 flex items-center justify-center text-lg  px-2 py-2"
                    onClick={() => setIsOpen(!isOpen)}>
                    <MdAddCircleOutline className="mr-2" /> 
                    CREATE
                    </button>
                    { isOpen && (
                        <div className="absolute top-full mt-2 w-36 bg-green-500 rounded">
                            <ul className="space-y-2 my-3">
                                <li>
                                    <Link to="/uploadMix" className="flex  items-center flex-start mx-4 text-lg">
                                    <MdAddCircleOutline className="mx-2"/>
                                    Upload</Link>
                                    </li>
                                <li>
                                    <Link to="/posts" className="flex  items-center flex-start mx-4 text-lg">
                                        <IoCreateOutline className="mx-2" />
                                        Post</Link>
                                        </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="relative flex flex-col items-center justify-center">
                    <img className="h-7 w-7 rounded-full object-cover"
                    src={avatar}
                    alt="img"
                    onClick={() => setOpenAvatar(!openAvatar)}
                    />
                    { openAvatar && (
                        <div className="absolute top-full mt-2 w-36 bg-green-500 rounded">
                            <ul className="space-y-2 my-3">
                                <li className="text-lg cursor-pointer">
                                    <Link to='/feed'>My dashboard</Link>
                                </li>
                                <li className="text-lg cursor-pointer">
                                    <Link to='/profile'>My Profile</Link>
                                </li>
                                <li className="text-lg cursor-pointer">
                                    <Link to='/settings'>Settings</Link>
                                </li>
                                <li className="text-lg cursor-pointer">
                                    <Logout />
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                </>
                )}
            
            </div>
            { isExpanded && (
              <div className=" ">
                  {/* Display search results */}

           {(searchResults.mixes.length > 0 || searchResults.users.length > 0) && (
        <div className="absolute bg-black text-white p-4 absolute left-0 w-full h-fit overflow-auto z-50">
          <div className="flex w-full">
            {searchResults.mixes.length > 0 && (
              <div className="w-2/3 p-4">
                <h3 className="text-xl">Mixes</h3>
                <ul>
                  {searchResults.mixes.map((mix) => (
                    <li>
                      <div className="my-5">
                        <SearchMix
                        thumbnail={mix.thumbnail}
                        title={mix.title}
                        artist={mix.artist}
                        userId={mix.userId}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {searchResults.users.length > 0 && (
              <div className="w-1/3 p-4">
                <h3 className="text-xl">Users</h3>
                <ul>
                  {searchResults.users.map((user) => (
                    <li>
                      <div className="my-5">
                        <SearchUser 
                        profilePic={user.profilePic}
                        userName={user.userName}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
            )}
              
        </nav>
    )
}
export default NavBar;