import "./about.css";
import { cancelSpeech } from "../../common";
import Footer from "../../Footer";

const About = () => {
  cancelSpeech();
  return (
    <>
      <div className="about">
        <div className="block">
          <div className="h_3">What is LLM Mediator?</div>
          <div className="inner_content">
            LLM Mediator is a lightweight, provider-agnostic layer that sits
            between you and any large language model — OpenAI, Anthropic, Google,
            open-weight models, or whatever comes next. Instead of wiring your
            app or workflow to a single vendor's API, you talk to the Mediator,
            and it routes, translates, and manages the request underneath.
          </div>
        </div>
        <div className="block">
          <div className="h_3">The vision</div>
          <div className="inner_content">
            LLMs are no longer just chatbots. They generate images, transcribe
            audio, embed documents for search, call tools, and run multi-step
            agents. LLM Mediator aims to be the single, stable interface across
            all of that — so switching providers, comparing models, or adding a
            new capability doesn't mean rewriting your integration every time.
          </div>
        </div>
        <div className="block">
          <div className="h_3">A note on where this started</div>
          <div className="inner_content">
            This project began in the earliest days right after ChatGPT's public
            launch, when the idea of a "mediator" between an app and a language
            model was still novel. It was built quickly, then left untouched as
            the field moved fast around it. It's being revived now with a
            broader scope — no longer tied to one model or one company, but
            built for the multi-model world LLMs have become.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
