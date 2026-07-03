import { useNavigate } from "react-router-dom";
import { cancelSpeech } from "../../common";
import "./actions.css";

const CAPABILITIES = [
  {
    name: "Chat",
    category: "Text",
    status: "enabled",
    description: "Free-form conversational chat with any LLM provider",
  },
  {
    name: "Text completion & generation",
    category: "Text",
    status: "disabled",
    description: "Generate coherent text from any prompt or instruction",
  },
  {
    name: "Summarization",
    category: "Text",
    status: "disabled",
    description: "Condense articles, documents, and transcripts into concise summaries",
  },
  {
    name: "Translation",
    category: "Text",
    status: "disabled",
    description: "Translate text between any supported languages",
  },
  {
    name: "Code generation & explanation",
    category: "Text",
    status: "disabled",
    description: "Generate, explain, or refactor code from natural-language descriptions",
  },
  {
    name: "Embeddings / vector search",
    category: "Knowledge & Retrieval",
    status: "disabled",
    description: "Convert text to vector embeddings for semantic search and clustering",
  },
  {
    name: "Document Q&A (RAG)",
    category: "Knowledge & Retrieval",
    status: "disabled",
    description: "Answer questions grounded in your own documents and data sources",
  },
  {
    name: "Image generation",
    category: "Multimodal",
    status: "disabled",
    description: "Generate images from text descriptions using DALL-E, Stable Diffusion, and more",
  },
  {
    name: "Image understanding / vision",
    category: "Multimodal",
    status: "disabled",
    description: "Analyze and describe images, diagrams, and screenshots",
  },
  {
    name: "Speech-to-text (transcription)",
    category: "Multimodal",
    status: "disabled",
    description: "Transcribe audio recordings and live speech into text",
  },
  {
    name: "Text-to-speech",
    category: "Multimodal",
    status: "disabled",
    description: "Synthesize natural-sounding speech from text",
  },
  {
    name: "Function / tool calling",
    category: "Agentic",
    status: "disabled",
    description: "Let the LLM invoke external APIs, databases, and tools on your behalf",
  },
  {
    name: "Multi-step agents / workflows",
    category: "Agentic",
    status: "disabled",
    description: "Orchestrate complex multi-step tasks with automated reasoning loops",
  },
  {
    name: "Content moderation / safety filtering",
    category: "Governance",
    status: "disabled",
    description: "Detect and filter harmful, biased, or policy-violating content",
  },
  {
    name: "Usage & cost tracking",
    category: "Governance",
    status: "disabled",
    description: "Monitor token consumption, request volume, and estimated costs across providers",
  },
];

const CATEGORY_ORDER = [
  "Text",
  "Knowledge & Retrieval",
  "Multimodal",
  "Agentic",
  "Governance",
];

function Capabilities() {
  cancelSpeech();
  const navigate = useNavigate();

  const grouped = {};
  for (const cap of CAPABILITIES) {
    if (!grouped[cap.category]) grouped[cap.category] = [];
    grouped[cap.category].push(cap);
  }

  return (
    <div className="capabilities">
      <h1 className="capabilities-heading">Capabilities</h1>
      <p className="capabilities-subtitle">
        A catalog of LLM operations. Chat is enabled now; the rest are on the
        roadmap.
      </p>
      <div className="capabilities-grid">
        {CATEGORY_ORDER.map((cat) => (
          <div key={cat} className="capability-category">
            <h2 className="category-title">{cat}</h2>
            <div className="category-cards">
              {grouped[cat].map((cap) => (
                <div
                  key={cap.name}
                  className={`capability-card ${cap.status === "disabled" ? "card-disabled" : "card-enabled"}`}
                  title={
                    cap.status === "disabled"
                      ? "Available in a future update"
                      : "Click to start chatting"
                  }
                  onClick={() => {
                    if (cap.status === "enabled") navigate("/");
                  }}
                >
                  <div className="card-header">
                    <span className="card-name">{cap.name}</span>
                    <span className={`card-badge ${cap.status}`}>
                      {cap.status === "enabled" ? "Active" : "Coming soon"}
                    </span>
                  </div>
                  <p className="card-description">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Capabilities;
