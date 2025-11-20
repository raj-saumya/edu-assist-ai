import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import SubjectSelectionDrawer from "./SubjectSelectionDrawer";
import { useChatStore } from "~/store/chatStore";

const ChatActionsMenu = () => {
  const [isSubjectDrawerOpen, setIsSubjectDrawerOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center bg-zinc-900 border border-zinc-800 p-2 h-12 w-12 rounded-full hover:bg-zinc-800 transition-colors">
            <img
              src="/images/icon-more.svg"
              alt="more"
              className="w-6 h-6 brightness-0 invert"
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="flex flex-col gap-2 p-2 bg-zinc-900 border-zinc-800 rounded-lg shadow-lg min-w-60"
        >
          <DropdownMenuItem
            onClick={() => setIsSubjectDrawerOpen(true)}
            className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800"
          >
            <img
              src="/images/icon-book.svg"
              alt="book"
              className="w-6 h-6 mr-2 brightness-0 invert"
            />
            <span className="text-lg text-white">Subjects</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800"
            onClick={() => useChatStore.getState().toggleWorkspace("canvas")}
          >
            <img
              src="/images/icon-draw.svg"
              alt="draw"
              className="w-6 h-6 mr-2 brightness-0 invert"
            />
            <span className="text-lg text-white">Canvas</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800"
            onClick={() => useChatStore.getState().toggleWorkspace("pdf")}
          >
            <img
              src="/images/icon-file.svg"
              alt="pdf"
              className="w-6 h-6 mr-2 brightness-0 invert"
            />
            <span className="text-lg text-white">PDF Viewer</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SubjectSelectionDrawer
        trigger={<div />}
        open={isSubjectDrawerOpen}
        onOpenChange={setIsSubjectDrawerOpen}
      />
    </>
  );
};

export default ChatActionsMenu;
