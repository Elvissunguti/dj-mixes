import React from "react";
import thumbnail from "../Assets/thumbnail.jpg";

const PostCard = () => {
    
    // get the current date and time posted
    const currentDate = new Date();
    const formattedDate = currentDate.toDateString();
    const formattedTime = currentDate.toLocaleTimeString();
    
    return(
        <section>
            <div>
                <div className="flex flex-col items-start">
                    <h2 className="font-semibold text-xl hover:text-green-500 cursor-pointer">username</h2>
                    <img
                    src={thumbnail}
                    alt="post image"
                    className="h-64 w-64 object-cover"
                    />
                    <p className="text-left my-4">Description</p>
                    <p>Posted on {formattedDate} at {formattedTime} </p>
                </div>
            </div>
        </section>
    )
}
export default PostCard;