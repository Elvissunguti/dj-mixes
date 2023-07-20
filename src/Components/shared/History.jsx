import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MixCard from "../shared/MixCard";


const History = () => {

    const [ historyDetails, setHistoryDetails ] = useState({});
    const { historyId } = useParams();

    return(
        <section>
            <div className="flex flex-start mx-6">
                <p className="text-xl text-gray-800 font-semibold">Listening History</p>
                <div>
                    { historyDetails._id && (
                        <div>
                            <div>
                            { historyDetails.mix.map((item) => {
                                return (
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
export default History;