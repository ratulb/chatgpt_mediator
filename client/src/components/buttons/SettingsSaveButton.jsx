import React, { useState } from 'react';
import saveIcon from "../../assets/SaveIcon.png";
import Tooltip from "../common/Tooltip";

const SettingsSaveButton = ({ direction, onClickHandler }) => {
    const [content, setContent] = useState("Save");

    const resetTooltipText = (e) => {
        if (content === "Saved") {
            setContent("Save");
        }
    }

    const handleOnClick = (e) => {
        onClickHandler(e);
        setContent("Saved");
    }

    return (
        <Tooltip content={content} direction={direction}>
            <button type="submit" onClick={(e) => handleOnClick(e)}>
                <img src={saveIcon} alt="Save" onMouseLeave={(e) => resetTooltipText(e)} style={{ borderRadius: "50%" }} />
            </button>
        </Tooltip>
    );
};

export default SettingsSaveButton;
