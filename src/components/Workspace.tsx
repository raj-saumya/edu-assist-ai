import { cn } from "~/utils/merge";
import { useChatStore, WorkspaceType } from "~/store/chatStore";
import { X } from "lucide-react";
import { ReactNode } from "react";

type WorkspaceConfig = {
  title: string;
  icon: string;
  iconAlt: string;
};

const workspaceConfigs: Record<
  Exclude<WorkspaceType, null>,
  WorkspaceConfig
> = {
  canvas: {
    title: "Canvas",
    icon: "/images/icon-draw.svg",
    iconAlt: "Canvas",
  },
  pdf: {
    title: "PDF Viewer",
    icon: "/images/icon-file.svg",
    iconAlt: "PDF",
  },
};

type WorkspaceProps = {
  className?: string;
  children: ReactNode;
};

const Workspace = ({ className, children }: WorkspaceProps) => {
  const activeWorkspace = useChatStore((state) => state.activeWorkspace);
  const closeWorkspace = useChatStore((state) => state.closeWorkspace);

  if (!activeWorkspace) return null;

  const config = workspaceConfigs[activeWorkspace];

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <img
            src={config.icon}
            alt={config.iconAlt}
            className="w-5 h-5 brightness-0 invert opacity-70"
          />
          <span className="text-sm font-medium text-zinc-200 font-heading">
            {config.title}
          </span>
        </div>
        <button
          onClick={closeWorkspace}
          className="p-1 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-200"
          aria-label="Close workspace"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
};

export default Workspace;
