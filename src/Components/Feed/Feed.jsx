import React from "react";
import CurrentMix from "../shared/CurrentMix";
import MixCard from "../shared/MixCard";
import NavBar from "../Home/NavBar";


const Feed = () => {
    return(
        <section>
            <div>
                <NavBar />
                <div>
                
                    <MixCard />
                    <CurrentMix />
                </div>
            </div>
        </section>
    )
}
export default Feed;