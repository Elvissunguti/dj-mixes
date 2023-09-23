import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { useEffect } from "react";
import avatar from "../Assets/avatar.png"
import Logout from "../Logout/Logout";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";

const NavBar = () => {

    const [ searchText, setSearchText ] = useState("");
    const [ isOpen, setIsOpen ] = useState(false);
    const [openAvatar, setOpenAvatar] = useState(false);
    const [searchResults, setSearchResults] = useState({ mixes: [], users: [] });


    useEffect(() => {
        const fetchData = async () => {
            try{
                if (searchText.trim() === "" ){
                    setSearchResults({ mixes: [], users: []})
                } else {
                    const response = await makeAuthenticatedGETRequest(
                        `/search/searchText?query=${searchText}`
                    );
                    console.log("API Response:", response.data);
                    setSearchResults(response.data)  
                }

            } catch(error){
                console.error("Error searching text", error);
            }
        }
        fetchData();
    }, [searchText]);

    console.log("Search Results:", searchResults);

    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value);
      };

      const handleSearchSubmit = (e) => {
        e.preventDefault(); 
       
      };

      if (searchResults === null) {
        return <div>Loading...</div>;
      };

    


    return(
        <nav className="">
            <div className="mx-auto flex justify-between items-center max-w-4xl max-w-7xl" >
                <div className="flex ">
                    <div className="">
                        <Link to="/feed">
                        <img src={logo} alt=""
                         className="w-auto h-20 flex cursor-pointer" />
                         </Link>
                    </div>
                    <div className="flex items-center  px-5 bg-gray-200 space-x-3  ">
                        <AiOutlineSearch className="text-3xl font-semibold" />
                        <form onSubmit={handleSearchSubmit}>
                        <input
                         type="text"
                         placeholder="Search"
                         className="text-xl text-white px-3 py-2 w-full bg-gray-600 rounded-none rounded-b-md border border-gray-300 placeholder-white focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                         value={searchText}
                         onChange={handleSearchInputChange}
                        
                        />
                        </form>
                    </div>
                </div>
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
            </div>
            
                  {/* Display search results */}
      {searchResults.mixes.length > 0 && (
        <div className="search-results">
          <h3>Mixes</h3>
          <ul>
            {searchResults.mixes.map((mix) => (
              <li key={mix._id}>
                {mix.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchResults.users.length > 0 && (
        <div className="search-results">
          <h3>Users</h3>
          <ul>
            {searchResults.users.map((user) => (
              <li key={user._id}>
                {user.userName}
              </li>
            ))}
          </ul>
        </div>
      )}
        </nav>
    )
}
export default NavBar;