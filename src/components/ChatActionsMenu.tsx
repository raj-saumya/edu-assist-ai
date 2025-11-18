import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import SubjectSelectionDrawer from "./SubjectSelectionDrawer";

const ChatActionsMenu = () => {
  const [isSubjectDrawerOpen, setIsSubjectDrawerOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center bg-[#f6f6f6] p-2 h-12 w-12 rounded-full hover:bg-gray-300 transition-colors">
            <img src="/images/icon-more.svg" alt="more" className="w-6 h-6" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="flex flex-col gap-2 p-2 bg-white rounded-lg shadow-lg min-w-60"
        >
          <DropdownMenuItem
            onClick={() => setIsSubjectDrawerOpen(true)}
            className="cursor-pointer"
          >
            <img
              src="/images/icon-book.svg"
              alt="book"
              className="w-6 h-6 mr-2"
            />
            <span className="text-lg font-afacad">Subjects</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <img
              src="/images/icon-draw.svg"
              alt="draw"
              className="w-6 h-6 mr-2"
            />
            <span className="text-lg font-afacad">Canvas</span>
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
