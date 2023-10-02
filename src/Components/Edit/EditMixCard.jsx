import React from "react";

const EditMixCard = ({ thumbnail, title, artist }) => {

    const thumbnailFilename = thumbnail.split("\\").pop();
    const imageUrl = `/MixUploads/Thumbnail/${thumbnailFilename}`;

    return (
        <section>
            <div className="flex">
                <div>
                    <img src={imageUrl} className="w-24 h-24" />
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