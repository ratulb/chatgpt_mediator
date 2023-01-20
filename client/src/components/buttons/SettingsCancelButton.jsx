import React, { useState } from 'react';
import cancelIcon from "../../assets/CancelIcon.png";
import Tooltip from "../common/Tooltip";

const SettingsCancelButton = ({ direction, onClickHandler, marginLeft }) => {
    const [content, setContent] = useState("Cancel");

    const resetTooltipText = (e) => {
        if (content === "Cancelled") {
            setContent("Cancel");
        }
    }

    const handleOnClick = (e) => {
        onClickHandler(e);
        setContent("Cancelled");
    }


    return (
        <Tooltip content={content} direction={direction}>
            <button type="submit" onClick={(e) => handleOnClick(e)}>
                <img src={cancelIcon} alt="Cancel" onMouseLeave={(e) => resetTooltipText(e)} style={{ marginLeft: `${marginLeft}`, marginRight: "0.5rem", borderRadius: "50%" }} />
            </button>
        </Tooltip>
    );
};

export default SettingsCancelButton;