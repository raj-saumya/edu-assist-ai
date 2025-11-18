import { createFileRoute } from "@tanstack/react-router";
import { isAuthenticatedFn } from "~/utils/auth";
import ChatMessageBox from "~/components/ChatMessageBox";
import ChatBottomTray from "~/components/ChatBottomTray";
import CanvasArea from "~/components/CanvasArea";
import { useChatStore } from "~/store/chatStore";

export const Route = createFileRoute("/chat")({
  component: Chat,
  beforeLoad: isAuthenticatedFn,
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
  const isCanvasOpen = useChatStore((state) => state.isCanvasOpen);

  return (
    <section className="flex h-[calc(100vh-96px)] px-6 bg-[#0f1117] gap-4 overflow-hidden">
      <div className={`flex flex-col h-full transition-all duration-300 ease-in-out ${isCanvasOpen ? 'hidden md:flex md:w-1/3' : 'w-full'}`}>
        <div className="flex-1 overflow-hidden">
          <ChatMessageBox />
        </div>
        <div className="flex-shrink-0 mt-4 pb-4">
          <ChatBottomTray />
        </div>
      </div>
      
      <div className={`transition-all duration-300 ease-in-out ${isCanvasOpen ? 'w-full md:w-full opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-full hidden'}`}>
        {isCanvasOpen && <CanvasArea className="h-full pb-4" />}
      </div>
    </section>
  );
}
