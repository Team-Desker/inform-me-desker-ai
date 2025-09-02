import React from "react";

export default function ChatWindow() {
  return (
    <div className="w-[350px] h-[500px] bg-white border border-gray-200 rounded-lg shadow-xl z-[9998] flex flex-col font-sans transition-all duration-300 ease-out">
      {/* 메시지창 헤더 */}
      <div className="flex justify-between items-center p-3 border-b border-gray-200">
        <h3 className="font-bold text-lg text-gray-800">데스커AI 안내원</h3>
      </div>

      {/* 메시지창 목록 영역 */}
      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-gray-500 text-center text-sm">
          대화를 시작해보세요!
        </p>
      </div>

      {/* 메시지창 입력 영역 */}
      <div className="p-3 border-t border-gray-200">
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
}
