import React from "react";
import CurrentMix from "../shared/CurrentMix";
import MixCard from "../shared/MixCard";
import NavBar from "../Home/NavBar";
import { FiLayers, FiMusic } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { GoVideo } from "react-icons/go";
import { SlCalender, SlPlaylist } from "react-icons/sl";
import LoggedInContainer from "../Containers/LoggedInContainer";


const Feed = () => {
    return(
      <LoggedInContainer curActiveScreen="feed">
        <div>
            <h1 className="text-center">Feed</h1>
        </div>
      </LoggedInContainer>
    )
}
export default Feed;