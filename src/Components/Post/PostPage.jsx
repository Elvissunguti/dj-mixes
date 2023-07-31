import React from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";

const PostPage = () => {
    return (
        <LoggedInContainer curActiveScreen="post page">
            <div>
                <h1>POSTS</h1>
            </div>
        </LoggedInContainer>

    )
}
export default PostPage; 