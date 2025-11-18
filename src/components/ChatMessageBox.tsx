import { useChatStore } from "~/store/chatStore";

const UserReplyBox = ({ content }: { content: string }) => {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] py-3 px-4 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-md">
        <span className="text-base break-words whitespace-pre-wrap">{content}</span>
      </div>
    </div>
  );
};

const AIReplyBox = ({ content }: { content: string }) => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] flex flex-col p-3 rounded-lg bg-zinc-900 border border-zinc-800">
        <span className="text-sm font-medium mb-1 text-gray-400">
          AI Assistant
        </span>
        <span className="text-base break-words whitespace-pre-wrap text-gray-200">{content}</span>
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
