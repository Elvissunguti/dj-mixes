import React from "react";

const EditMixCard = ({ thumbnail, title, artist }) => {

    return (
        <section>
            <div className="flex">
                <div>
                    <img src={thumbnail} alt="imageUrl" className="w-24 h-24" />
                </div>
                <div className="ml-4">
                    <p className="text-xl">{title}</p>
                    <p className="text-xl">{artist}</p>
                </div>
            </div>
        </section>
    )
}
export default EditMixCard;