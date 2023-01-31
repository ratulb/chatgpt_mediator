import "./about.css";
import { cancelSpeech } from "../../common";
import Footer from "../../Footer";
const About = () => {
  cancelSpeech();
  return (
    <>
      <div className="about">
        <div>
          <h3>OpenAI ChatGPT mediator</h3>
        </div>
        <div style={{ textAlign: "center" }}>
          <h4>
            <p>
              ChatGPT has ushered in an information search experience that is more
              conversational & contextual than ever. It has set a benchmark - a mile
              stone against which future AI innovations would be measured. It is a
              watershed moment which would have profound impact on how we live, sleep,
              dream, transact, interact - how we exist as a civilization in coming
              decades, generations - in posterity. Possibilities are limitless.
            </p>
          </h4>
        </div>
        <div>
          <h6>
            <p>
              ChatGPT Mediator is an interface that aims to harness the amazing capabilities of OpenAI ChatGPT and make it more accessible to all and sundry.
            </p>

          </h6>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
