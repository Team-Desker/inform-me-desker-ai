import { URL_INFO } from "../config/constants";

(() => {
  const loaderScript = document.currentScript;
  const botId = loaderScript.getAttribute("data-bot-id");

  if (!botId) {
    console.error('AI Chatbot: data-bot-id가 없습니다');
    return;
  }

  window.DESKER_CHATBOT_CONFIG = {
    botId,
    apiBaseUrl: URL_INFO.SERVER_BASE_URL
  }

  const container = document.createElement('div');
  container.id = "desker-chatbot-widget-container"
  document.body.appendChild(container);

  const widgetScript =document.createElement("script");
  widgetScript.src = `${URL_INFO.SERVER_BASE_URL}/widget.js`
})();
