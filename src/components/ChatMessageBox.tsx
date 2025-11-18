import { useChatStore } from "~/store/chatStore";

const UserReplyBox = ({ content }: { content: string }) => {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] py-3 px-4 rounded-lg bg-blue-500 text-white">
        <span className="font-afacad text-base break-words whitespace-pre-wrap">{content}</span>
      </div>
    </div>
  );
};

const AIReplyBox = ({ content }: { content: string }) => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] flex flex-col p-3 rounded-lg">
        <span className="font-afacad text-sm font-medium mb-1 opacity-70">
          AI Assistant
        </span>
        <span className="font-afacad text-base break-words whitespace-pre-wrap">{content}</span>
      </div>
    </div>
  );
};

const ChatMessageBox = () => {
  const messages = useChatStore((state) => state.messages);

  return (
    <div className="h-full overflow-y-auto flex flex-col gap-4 py-4">
      {messages.map((message) => (
        <div key={message.id}>
          {message.type === "user" ? (
            <UserReplyBox content={message.content} />
          ) : (
            <AIReplyBox content={message.content} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatMessageBox;
