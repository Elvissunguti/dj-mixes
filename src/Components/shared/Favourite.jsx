import React, { useState } from "react";
import MixCard from "./MixCard";
import { useParams } from "react-router-dom";

const Favourite = () => {

    const [ favouriteDetails, setFavouriteDetails ] = useState({});
    const { favouriteId } = useParams();

    return(
        <section>
            <div className="flex flex-start mx-6">
               <p className="text-gray-800 text-xl font-semibold">Favourite Mixes</p>
               <div>
                { favouriteDetails.id && (
                    <div>
                        <div>
                            { favouriteDetails.mix.map((item) => {
                                return(
                                    <MixCard />
                                )
                            })}
                        </div>   
                    </div>   
                )}

               </div>
            </div>
        </section>
    )
}
export default Favourite ;