import resubmitIcon from "../../assets/ResubmitIcon.png";
import Tooltip from "./Tooltip";

const MessageResubmitButton = ({ direction, resubmitHandler }) => {
  return (
    <Tooltip content="Re-submit query" direction={direction}>
      <button type="button" onClick={(e) => resubmitHandler(e)}>
        <img src={resubmitIcon} alt="Resubmit" />
      </button>
    </Tooltip>
  );
};

export default MessageResubmitButton;
