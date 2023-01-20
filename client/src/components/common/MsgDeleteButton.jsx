import deleteIcon from "../../assets/DeleteIcon.png";
import Tooltip from "./Tooltip";

const MessageDeleteButton = ({ direction, onClickHandler, messageId }) => {
  return (
    <Tooltip content="Double click to delete" direction={direction}>
      <button type="button" onDoubleClick={(e) => onClickHandler(messageId)}>
        <img src={deleteIcon} alt="Delete" />
      </button>
    </Tooltip>
  );
};

export default MessageDeleteButton;
