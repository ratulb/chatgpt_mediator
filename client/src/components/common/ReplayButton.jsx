import replayIcon from "../../assets/ReplayIcon.png";
import Tooltip from "./Tooltip";

const ReplayButton = ({ direction, onClickHandler, invokeWith }) => {
  return (
    <Tooltip content="Replay voice" direction={direction}>
      <button type="button" onClick={(e) => onClickHandler(invokeWith)} >
        <img src={replayIcon} alt="Replay voice" />
      </button>
    </Tooltip>
  );
};

export default ReplayButton;
