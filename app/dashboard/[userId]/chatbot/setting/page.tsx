"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CodeBlock,
  CodeBlockCopyButton,
} from "@/components/ai-elements/code-block";
import { useState } from "react";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

// 이 페이지는 `params` prop을 통해 동적 라우트 매개변수(userId)를 받습니다.
export default function ChatbotSettingsPage({
  params,
}: {
  params: { userId: string };
}) {
  // UI 테스트를 위한 임시 상태. 다음 단계에서 실제 DB 데이터와 연동합니다.
  const [chatbotName, setChatbotName] = useState("데스커 AI");
  const [companyUrl, setCompanyUrl] = useState("https://www.youngin.com");
  const [roleDesc, setRoleDesc] = useState(
    "데스커는 당신의 모든 질문에 답변해주는 안내원이야. 부드럽지만, 자신감있고, 상냥한 말투로 항상 존댓말로 대답해줘."
  );

  const [isTraining, setIsTraining] = useState(false);
  const [isTrained, setIsTrained] = useState(true);

  const botId = "YOUR_BOT_ID_FROM_DB"; // TODO: DB에서 실제 봇 ID를 가져와야 합니다.
  const installationScript = `<script src="http://localhost:3000/chatbot-widget/loader.js" data-bot-id="${botId}" async></script>`;

  return (
    <div className="flex-1 space-y-4">
      {/* 메인 컨텐츠 영역: 큰 화면에서는 3분할, 작은 화면에서는 세로 정렬 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 왼쪽: 설정 카드 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold tracking-tight">
                AI 챗봇 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>프로필</Label>
                <div className="flex items-center gap-4">
                  <Image
                    src="/desker-icon.png"
                    width={64}
                    height={64}
                    alt="Desker Logo"
                    className="rounded-full border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="chatbot-name">이름</Label>
                <Input
                  id="chatbot-name"
                  value={chatbotName}
                  onChange={(e) => setChatbotName(e.target.value)}
                  placeholder="예: 고객센터 AI"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-url">회사 홈페이지 URL</Label>
                <Input
                  id="company-url"
                  value={companyUrl}
                  onChange={(e) => setCompanyUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-desc">역할 설명</Label>
                <Textarea
                  id="role-desc"
                  value={roleDesc}
                  onChange={(e) => setRoleDesc(e.target.value)}
                  placeholder="챗봇의 역할과 말투를 자유롭게 설명해주세요."
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keyword-rules">키워드 답변 규칙</Label>
                <Textarea
                  id="keyword-rules"
                  placeholder='예시) Q: "배송조회" A: "배송조회는 홈페이지에서 가능합니다."'
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="conversation-rules">대화 규칙 설정</Label>
                <Textarea
                  id="conversation-rules"
                  placeholder='예시) 사용자가 "상담원"이라고 말하면, "담당자를 연결해드릴까요?"라고 물어봐줘.'
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-6">
              {/* TODO: 학습하기 버튼 기능 구현 필요 */}
              <Button disabled={isTraining}>
                {isTraining ? "학습 중..." : "데스커 AI 학습"}
              </Button>

              {isTrained && (
                <div className="w-full space-y-4">
                  <h3 className="font-semibold">Web 설치하기</h3>
                  <p className="text-sm text-muted-foreground">
                    복사/붙여넣기 설치 코드
                  </p>
                  <CodeBlock code={installationScript} language="html">
                    <CodeBlockCopyButton />
                  </CodeBlock>
                  <div>
                    <h4 className="font-semibold mb-2">설치 가이드 보기</h4>
                    <Image
                      src="/information-section-image.png"
                      width={400}
                      height={266}
                      alt="Installation Guide"
                      className="rounded-md border"
                    />
                  </div>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>

        {/* 오른쪽: 모의 채팅방 */}
        <div className="lg:col-span-1">
          <Card className="h-[700px] flex flex-col">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-lg">{chatbotName}</CardTitle>
                <CardDescription>
                  데스커 상담사가 여러분을 돕기 위해 기다리고 있어요
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
              <Message from="assistant" className="py-2">
                <Avatar className="size-8">
                  <AvatarImage src="/desker-icon.png" alt="AI Avatar" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <MessageContent>
                  안녕하세요. 저는 {chatbotName} AI 입니다. <br />
                  고객이 궁금해 할만한 질문을 해보세요.
                </MessageContent>
              </Message>
            </CardContent>
            <CardFooter className="p-2">
              <Input
                disabled
                placeholder={`${chatbotName}에게 질문해 보세요.`}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
