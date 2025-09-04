import { cookies } from "next/headers";

type PageProps = {
  params: { userId: string; sessionId: string };
};

const sessionsMessagesPage = async ({ params }: PageProps) => {
  const { userId, sessionId } = await params;

  const cookieHeader = await cookies();
  const cookieHeaderChangeString = await cookieHeader.toString();

  const dataResponse = await fetch(
    `http://localhost:3000/api/dashboard/sessions/${sessionId}/messages`,
    { headers: { cookie: cookieHeaderChangeString }, cache: "no-store" }
  );

  const responseJson = await dataResponse.json();
  const chatMessages: any[] = responseJson.parsedMessage;

  return (
    <div>
      <header className="mb-2">
        <h2 className="text-lg font-bold">대화 내용</h2>
        <p className="text-xs text-gray">
          userId: {userId}
          <br />
          sessionId: {sessionId}
        </p>
      </header>

      <ul className="space-y-2">
        {chatMessages.map((message) => {
          const text = String(message.content);
          return (
            <li
              key={message.messageId}
              className="rounded-md border border-gray-200 p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl text-gray-500">{message.sender}</span>
                <span className="text-xs text-gray-400">
                  {new Date(message.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="mt-2 text-sm whitespace-pre-wrap">{text}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default sessionsMessagesPage;
