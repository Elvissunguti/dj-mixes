import React from "react";
import MixCard from "../shared/MixCard";
import LoggedInContainer from "../Containers/LoggedInContainer";
import { useState } from "react";
import { makeAuthenticatedGETRequest, makeAuthenticatedPUTRequest } from "../Utils/ServerHelpers";
import { useEffect } from "react";


const Feed = () => {

  const [ feedData, SetFeedData ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await makeAuthenticatedGETRequest(
          "/user/followed-mixes"
        );
        console.log("response fetchData:", response)
        SetFeedData(response.data)
    };
    fetchData();
  }, []);


  const handleToggleFavourite = async ( _id ) => {
    try {
      const response = await makeAuthenticatedPUTRequest(
        "/mix/toggleFavourite",
        { mixId: _id }
      );

      if (response.error) {
        console.error("Error toggling favorite Status:", response.error);
      } else {
        SetFeedData(prevFeedData => {
          return prevFeedData.map((item) =>
            item._id === response.mix._id ? response.mix : item
          );
        });
      }
      

    } catch(error) {
      console.error("Error toggling favorite Status:", error)
    }
  }


    return(
      <LoggedInContainer curActiveScreen="feed">
        <div className="flex items-start mb-6">
            <h1 className="font-bold text-xl">Feed</h1>
        </div>
        <div className="space-y-4 overflow-auto ">
        {feedData.length > 0 ? (
          feedData.map((item, index) => (
            <MixCard 
            key={index} 
            mixId={item._id}
            thumbnail={item.thumbnail} 
            title={item.title} 
            artist={item.artist}
            isFavourite={item.isFavourite} 
            toggleFavourite={() => handleToggleFavourite(item._id)}
            favouriteCount={item.favouriteCount}
            
            />
              ))
            ) : (
             <p>Loading...</p>
              )}
        </div>
      </LoggedInContainer>
    )
}
export default Feed;