import "./about.css";
import { cancelSpeech } from "../../common";
import Footer from "../../Footer";
const About = () => {
  cancelSpeech();
  return (
    <>
      <div className="about">
        <div className="h_3">
          OpenAI ChatGPT mediator
        </div>
        <div className="inner_content">
          ChatGPT has ushered in an information search experience that is more
          conversational & contextual than ever. It has set a benchmark - a mile
          stone against which future AI innovations would be measured. It is a
          watershed moment which would have profound impact on how we live, sleep,
          dream, transact, interact - how we exist as a civilization in coming
          decades, generations - in posterity. Possibilities are endless.
        </div>
        <div className="about_mediator">
          ChatGPT Mediator is an interface that aims to harness the amazing capabilities of OpenAI ChatGPT and make it more accessible to all and sundry.
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
