import React, { useState, useEffect } from "react";
import Typer from "./common/Typer";
import Profile from "./Profile";
import BeatLoader from "react-spinners/BeatLoader";
import fetchData from "./common/Fetcher";
import Speaker from "./speaker/Speaker";

const Bot = ({ messageId, prompt }) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetchData(prompt).then((data) => {
      setResponse(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="wrapper ai">
      <div className="chat">
        <Profile userProfile={false} />
        <div className="message" id={messageId}>
          {loading ? (
            <>
              {prompt?.trim().length == 0 ? (
                <>
                  <span>
                    Umm... That's an ambiguous query! My asnwser would be as
                    ambiguous!
                    <br />
                  </span>
                  <BeatLoader color="yellow" size={12} loading={loading} />
                </>
              ) : (
                <BeatLoader color="yellow" size={12} loading={loading} />
              )}
            </>
          ) : (
            <>
              <Speaker textToRead={response} />
              <Typer content={response} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bot;
