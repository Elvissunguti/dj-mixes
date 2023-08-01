import React from "react";
import { useState } from "react";

const Uploads = () => {

    const [ uploads, setUploads ] = useState({});

    return(
        <section>
            <div>
                <p>MY MIXES</p>
                <div>
                    { uploads.id && (
                        <div>
                            { uploads.map((index) => {
                                return (
                                    <div key={index}>
                                        {uploads}
                                    </div>    
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
export default Uploads;