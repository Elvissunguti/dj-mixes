import React from "react";

const EditPostCard = ({ image, description, user }) => {

    return (
        <section>
            <div className="flex">
                <div>
                    <img src={image} alt="" className="w-24 h-24" />
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