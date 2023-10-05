import React from "react";
import NavBar from "../Home/NavBar";
import { makeAuthenticatedDELETERequest, makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import EditPostCard from "./EditPostCard";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";
import { useState } from "react";

const EditPost = () => {

    const [ postData, setPostData ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/post/get/myposts"
            );
            setPostData(response.data)
        }
        fetchData();
    }, []);

    const deletePost = async (postId) => {
        try{
            await makeAuthenticatedDELETERequest(
                `/post/deletePost/${postId}`
            );
             setPostData((prevPostData) => prevPostData.filter((post) => post._id !== postId));
        } catch(error) {
            console.error("Error deleting the Mix from playlist", error);
        }
    }

    return (
        <section>
        <NavBar />
        <div className="flex flex-col items-center justify-center mx-auto w-3/5 mt-5 max-w-4xl max-w-7xl">
        <div className="flex justify-between w-full">
            <div className="flex ">
                <p className="text-xl font-light">Editing</p> 
            </div>
            <div>
                <button className="text-xl">Back to posts</button>
            </div>
        </div>
            <div className="mt-5 w-full">
              <ul className="text-center">
                {postData.map((post) => (
                        <li className="my-6 text-center" key={post._id} >
                            <div className="flex justify-between">
                                <EditPostCard
                                 image={post.image}
                                 description={post.description}
                                 user={post.user}
                                 />
                            <div className="grid content-center">
                               <AiOutlineClose
                                 className="text-4xl cursor-pointer hover:text-red-700"
                                 onClick={() => deletePost(post._id)}
                                 />
                            </div>
                            </div>
                        </li>
                ))}
                 </ul>

            </div>
        </div>
    </section>
    )
}
export default EditPost;