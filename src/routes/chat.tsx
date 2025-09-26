import { createFileRoute } from "@tanstack/react-router";
import ChatMessageBox from "~/components/ChatMessageBox";
import ChatBottomTray from "~/components/ChatBottomTray";

export const Route = createFileRoute("/chat")({
  component: Chat,
  head: () => ({
    meta: [
      {
        title: "Edu Assist AI | Chat",
        description: "Edu Assist AI | Chat with your AI tutor",
      },
    ],
  }),
});

function Chat() {
  return (
    <section className="flex flex-col h-[calc(100vh-96px)] px-6">
      <div className="flex-1 overflow-hidden">
        <ChatMessageBox />
      </div>
      <div className="flex-shrink-0 mt-4">
        <ChatBottomTray />
      </div>
    </section>
  );
}
