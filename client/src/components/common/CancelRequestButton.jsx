import cancelIcon from "../../assets/CancelIcon.png";
import Tooltip from "./Tooltip";

const CancelRequestButton = ({ direction, onClickHandler, messageId }) => {
  return (
    <Tooltip content="Cancel request" direction={direction}>
      <button type="button" onClick={(e) => onClickHandler(messageId)}>
        <img src={cancelIcon} alt="Cancel" />
      </button>
    </Tooltip>
  );
};

export default CancelRequestButton;
