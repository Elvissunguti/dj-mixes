import React from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import { useState } from "react";
import PostCard from "./PostCard";
import { useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";

const PostPage = () => {

    const [ postData, setPostData ] = useState([]);

    useEffect(() => {
        const getPostData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/post/"
            )

        }
    })

    return (
        <LoggedInContainer curActiveScreen="post page">
            <div>
                <h1>POSTS</h1>
            </div>
            <div>
                { postData.map((item, index) => {
                    return <PostCard key={index} user={item.user} image={item.image} description={item.description} />
                })}
            </div>
        </LoggedInContainer>

    )
}
export default PostPage; 