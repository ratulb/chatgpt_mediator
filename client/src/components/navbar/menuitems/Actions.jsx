import "./actions.css";
import { cancelSpeech } from "../../common";
const Actions = () => {
  cancelSpeech();
  return (
    <div className="actions">
      <h1 className="actions"></h1>
    </div>
  );
};

export default Actions;
