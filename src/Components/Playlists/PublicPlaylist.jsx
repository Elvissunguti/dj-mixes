import React from "react";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";

const PublicPlaylist = () => {


    return(
        <section>
            <div>
                <div>
                    <h1>Playlit name</h1>
                </div>
                <div>
                    <ul>
                        <li>
                            <button><MdOutlineDeleteOutline /></button>
                        </li>
                        <li>
                            <button><IoCreateOutline /></button>
                        </li>
                    </ul>
                </div>

            </div>
            <div>
                
            </div>
        </section>
    )
}
export default PublicPlaylist;