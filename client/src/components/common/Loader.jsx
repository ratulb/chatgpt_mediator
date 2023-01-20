import React from 'react'
import BeatLoader from "react-spinners/BeatLoader";

const Loader = ({ text = "", loading }) => {
    return (
        <div>
            {text?.length > 0 ? (
                <>
                    <BeatLoader color="yellow" size={12} loading={loading} />
                    <span className="span_ambiguous">
                        {text}
                    </span>
                </>
            ) : (
                <BeatLoader color="yellow" size={12} loading={loading} />
            )
            }
        </div>
    );
}

export default Loader;