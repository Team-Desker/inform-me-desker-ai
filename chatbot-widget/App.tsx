import React, { useEffect, useState } from "react";
import ChatbotWidget from "@/chatbot-widget/components/ChatbotButton";
import ChatWindow from "@/chatbot-widget/components/ChatWindow";
import { getOrSetVisitorId } from "@/chatbot-widget/lib/visitor";

interface AppProps {
  chatbotConfig: {
    botId: string;
    apiBaseURL: string;
  };
}

const App = ({ chatbotConfig }: AppProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [chatSessionId, setChatSessionId] = useState("");
  const { botId, apiBaseURL } = chatbotConfig;
  const visitorId = getOrSetVisitorId();

  useEffect(() => {
    if (chatSessionId || !visitorId || !botId || !apiBaseURL) {
      if (visitorId && botId && apiBaseURL) {
        setIsLoading(false);
      }

      return;
    }

    const initializeChatSession = async () => {
      try {
        const chatsessionRespone = await fetch(
          `${apiBaseURL}/api/chat/session`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ botId, visitorId }),
          }
        );

        const { chatSessionId } = await chatsessionRespone.json();
        setChatSessionId(chatSessionId);
      } catch (error) {
        console.error("세션 초기화 실패: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeChatSession();
  }, [visitorId, chatSessionId, botId, apiBaseURL]);

  const handleWidgetClick = () => {
    if (isLoading) {
      console.log("채팅방을 불러오는 중입니다...");
      return;
    }

    if (isChatOpen) {
      setIsChatOpen(false);
      return;
    }

    console.log("--- 챗봇 위젯 데이터 ---");
    console.log("Bot ID:", botId);
    console.log("Visitor ID:", visitorId);
    console.log("Session ID:", chatSessionId);
    console.log("----------------------");

    setIsChatOpen(true);
  };

  return (
    <div className="fixed bottom-7 right-5 p-5 z-[9997]">
      {isChatOpen && <ChatWindow />}
      <ChatbotWidget onClick={handleWidgetClick}></ChatbotWidget>
    </div>
  );
};

export default App;
