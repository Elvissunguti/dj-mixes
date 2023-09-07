import React, { useEffect, useState } from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import MixCard from "../shared/MixCard";

const MyMix = () => {

    const [mixData, setMixData ] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/mix/get/myMix"
            );
            setMixData(response.data);
        };
        getData();
    }, []);

    const handleToggleFavourite = async (_id, isFavourite) => {
        try {
          if (isFavourite) {
            await deleteFavourite(_id);
          } else {
            await addFavourite(_id);
          }
          // No need to fetch data again, just update the state with the changed data
          setMixData((prevFeedData) =>
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


    return(
       <LoggedInContainer curActiveScreen="my mixes">
        <div className="flex items-start mb-6">
            <h1 className="font-bold text-xl">MY MIXES</h1>
        </div>
        <div className="space-y-4 overflow-auto  ">
            { mixData.map((item, index) => {
                return <MixCard 
                         key={index}  
                         mixId={item._id}
                         thumbnail={item.thumbnail}  
                         title={item.title}
                         artist={item.artist} 
                         userId={item.userId}
                         audioSrc={item.track}
                         toggleFavourite={() =>
                            handleToggleFavourite(item._id, item.isFavourite)
                          }
                          favouriteCount={item.favouriteCount}
                         />
            })}
        </div>
       </LoggedInContainer>
    )
}
export default MyMix;