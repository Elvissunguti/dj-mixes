import React from "react";

const EditPostCard = ({ image, description, user }) => {

    const imageFilename = image.split("\\").pop();
    const imageUrl = `/PostUploads/Images/${imageFilename}`;

    return (
        <section>
            <div className="flex">
                <div>
                    <img src={imageUrl} className="w-24 h-24" />
                </div>
                <div className="ml-4">
                    <p className="text-xl">{description}</p>
                    <p className="text-xl">{user}</p>
                </div>
            </div>
        </section>
    )
}
export default EditPostCard;