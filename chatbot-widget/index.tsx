import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const config = (window as any).DESKER_CHATBOT_CONFIG;
const container = document.getElementById("desker-chatbot-widget-container");

if (config && container) {
  const shadowRoot = container.attachShadow({ mode: "open" });

  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = `${config.apiBaseURL}/chatbot-widget/widget.css`;
  shadowRoot.appendChild(styleLink);

  const root = ReactDOM.createRoot(shadowRoot);
  root.render(
    <React.StrictMode>
      <App config={config} />
    </React.StrictMode>
  );
  delete (window as any).DESKER_CHATBOT_CONFIG;
}
