import React, { useState, useEffect } from "react";
import MixCard from "../shared/MixCard";
import LoggedInContainer from "../Containers/LoggedInContainer";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from "../Utils/ServerHelpers";

const Feed = () => {
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(
          "/user/followed-mixes"
        );
        console.log(response)
        setFeedData(response.data);
      } catch (error) {
        console.error("Error fetching feed data:", error);
      }
    };
    fetchData();
  }, []);

  const handleToggleFavourite = async (_id, isFavourite) => {
    try {
      if (isFavourite) {
        await deleteFavourite(_id);
      } else {
        await addFavourite(_id);
      }
      // No need to fetch data again, just update the state with the changed data
      setFeedData((prevFeedData) =>
        prevFeedData.map((item) =>
          item._id === _id ? { ...item, isFavourite: !isFavourite } : item
        )
      );
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  const addFavourite = async (_id) => {
    try {
      const response = await makeAuthenticatedPOSTRequest(
        "/mix/addFavourite",
        { mixId: _id }
      );

      if (response.error) {
        console.error("Error adding to favourites:", response.error);
      }
    } catch (error) {
      console.error("Error adding to favourites:", error);
    }
  };

  const deleteFavourite = async (_id) => {
    try {
      const response = await makeAuthenticatedPOSTRequest(
        "/mix/deleteFavourite",
        { mixId: _id }
      );

      if (response.error) {
        console.error("Error deleting from favourites:", response.error);
      }
    } catch (error) {
      console.error("Error deleting from favourites:", error);
    }
  };

  return (
    <LoggedInContainer curActiveScreen="feed">
      <div className="flex items-start mb-6">
        <h1 className="font-bold text-xl">Feed</h1>
      </div>
      <div className="space-y-4 overflow-auto">
        {feedData.length > 0 ? (
          feedData.map((item, index) => (
            <MixCard
              key={index}
              mixId={item._id}
              thumbnail={item.thumbnail}
              title={item.title}
              artist={item.artist}
              toggleFavourite={() =>
                handleToggleFavourite(item._id, item.isFavourite)
              }
              favouriteCount={item.favouriteCount}
              
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </LoggedInContainer>
  );
};

export default Feed;

