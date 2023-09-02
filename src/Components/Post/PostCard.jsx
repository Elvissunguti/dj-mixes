import React from "react";


const PostCard = ({profilePic, user, image, description, postDate, postTime}) => {
    
    const profileFileName = profilePic.split("\\").pop();
    const imageFileName = image.split("\\").pop();

    const profileUrl = `/Profile/ProfilePic/${profileFileName}`;
    const ImageUrl = `/PostUploads/Images/${imageFileName}`;
    
    
    return(
        <section>
            <div>
                <div className="flex flex-col items-start">
                    <div className="flex flex-row items-center mb-2 space-x-2">
                    <img
                    src={profileUrl}
                    alt="Profile pic"
                    className="w-12 h-12 rounded-full "
                    />
                    <h2 className="font-semibold text-2xl hover:text-green-500 cursor-pointer">{user}</h2>
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