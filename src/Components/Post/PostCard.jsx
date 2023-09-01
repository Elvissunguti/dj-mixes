import React from "react";


const PostCard = ({profilePic, user, image, description, postDate, postTime}) => {
    

    const imageFileName = image.split("\\").pop();
    const ImageUrl = `/PostUploads/Images/${imageFileName}`;
    
    return(
        <section>
            <div>
                <div className="flex flex-col items-start">
                    <div>
                    <img
                    src={profilePic}
                    alt="Profile pic"
                    className=""
                    />
                    <h2 className="font-semibold text-xl hover:text-green-500 cursor-pointer">{user}</h2>
                    </div>
                    <img
                    src={ImageUrl}
                    alt="post image"
                    className="h-64 w-64 object-cover"
                    />
                    <p className="text-left my-4">{description}</p>
                    <p>Posted on {postDate} at {postTime} </p>
                </div>
            </div>
        </section>
    )
}
export default PostCard;