import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { isAuthenticatedFn } from "~/utils/auth";
import ChatMessageBox from "~/components/ChatMessageBox";
import ChatBottomTray from "~/components/ChatBottomTray";
import Workspace from "~/components/Workspace";
import CanvasArea from "~/components/CanvasArea";
import { useChatStore } from "~/store/chatStore";

const PDFViewer = lazy(() => import("~/components/PDFViewer"));

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
  const activeWorkspace = useChatStore((state) => state.activeWorkspace);
  const isWorkspaceOpen = activeWorkspace !== null;

  const renderWorkspaceContent = () => {
    switch (activeWorkspace) {
      case "canvas":
        return <CanvasArea />;
      case "pdf":
        return (
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full bg-zinc-950">
                <div className="text-center text-zinc-500">
                  <div className="w-8 h-8 border-4 border-zinc-700 border-t-amber-500 rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-sm">Loading PDF Viewer...</p>
                </div>
              </div>
            }
          >
            <PDFViewer />
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <section className="flex h-[calc(100vh-96px)] px-6 bg-[#0f1117] gap-4 overflow-hidden">
      <div
        className={`flex flex-col h-full transition-all duration-300 ease-in-out ${
          isWorkspaceOpen ? "hidden md:flex md:w-1/3" : "w-full"
        }`}
      >
        <div className="flex-1 overflow-hidden">
          <ChatMessageBox />
        </div>
        <div className="flex-shrink-0 mt-4 pb-4">
          <ChatBottomTray />
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isWorkspaceOpen
            ? "w-full md:w-full opacity-100 translate-x-0"
            : "w-0 opacity-0 translate-x-full hidden"
        }`}
      >
        {isWorkspaceOpen && (
          <Workspace className="h-full pb-4">
            {renderWorkspaceContent()}
          </Workspace>
        )}
      </div>
    </section>
  );
}
