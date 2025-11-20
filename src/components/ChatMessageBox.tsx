import { useEffect, useRef } from "react";
import { useChatStore, Message } from "~/store/chatStore";

const UserReplyBox = ({ message }: { message: Message }) => {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] py-3 px-4 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-md">
        {message.imageUrl && (
          <div className="mb-3">
            <img
              src={message.imageUrl}
              alt="Canvas drawing"
              className="rounded-lg max-w-full h-auto border border-black/10"
            />
          </div>
        )}
        <span className="text-base break-words whitespace-pre-wrap">
          {message.content}
        </span>
      </div>
    </div>
  );
};

const AIReplyBox = ({ message }: { message: Message }) => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] flex flex-col p-3 rounded-lg bg-zinc-900 border border-zinc-800">
        <span className="text-sm font-medium mb-1 text-gray-400">
          AI Assistant
        </span>
        {message.imageUrl && (
          <div className="mb-3">
            <img
              src={message.imageUrl}
              alt="Canvas drawing"
              className="rounded-lg max-w-full h-auto border border-zinc-700"
            />
          </div>
        )}
        <span className="text-base break-words whitespace-pre-wrap text-gray-200">
          {message.content}
        </span>
      </div>
    </div>
  );
};

const ChatMessageBox = () => {
  const messages = useChatStore((state) => state.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full overflow-y-auto flex flex-col gap-4 py-4">
      {messages.map((message) => (
        <div key={message.id}>
          {message.type === "user" ? (
            <UserReplyBox message={message} />
          ) : (
            <AIReplyBox message={message} />
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageBox;
