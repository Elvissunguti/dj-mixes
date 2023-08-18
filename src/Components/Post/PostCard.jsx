import React from "react";


const PostCard = ({user, image, description}) => {
    
    // get the current date and time posted
    const currentDate = new Date();
    const formattedDate = currentDate.toDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    const imageFileName = image.split("\\").pop();
    const ImageUrl = `/PostUploads/Images/${imageFileName}`;
    
    return(
        <section>
            <div>
                <div className="flex flex-col items-start">
                    <h2 className="font-semibold text-xl hover:text-green-500 cursor-pointer">{user}</h2>
                    <img
                    src={ImageUrl}
                    alt="post image"
                    className="h-64 w-64 object-cover"
                    />
                    <p className="text-left my-4">{description}</p>
                    <p>Posted on {formattedDate} at {formattedTime} </p>
                </div>
            </div>
        </section>
    )
}
export default PostCard;