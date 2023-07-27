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


const Feed = () => {
    return(
        <section>
            <div>
                <NavBar />
                <div>
                    <div>
                        <ul>
                        <li><Link><FiLayers /> FEED</Link></li>
                        <li><Link><GoVideo  />NEW UPLOADS</Link></li>
                        <li><Link><FiMusic /> MY TRACKS</Link></li>
                        <li><Link><MdOutlineLibraryBooks /> POSTS</Link></li>
                        <li><Link><AiOutlineHeart /> FAVOURITES</Link></li>
                        <li><Link><SlCalender />HISTORY</Link></li>
                        <li><Link><SlPlaylist /> PLAYLISTS</Link></li>
                        </ul>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Feed;