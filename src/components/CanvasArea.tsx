import { cn } from "~/utils/merge";
import { useChatStore } from "~/store/chatStore";
import { X } from "lucide-react";

interface CanvasAreaProps {
  className?: string;
}

const CanvasArea = ({ className }: CanvasAreaProps) => {
  const toggleCanvas = useChatStore((state) => state.toggleCanvas);

  return (
    <div className={cn("flex flex-col h-full bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <img src="/images/icon-draw.svg" alt="Canvas" className="w-5 h-5 brightness-0 invert opacity-70" />
          <span className="text-sm font-medium text-zinc-200">Canvas</span>
        </div>
        <button 
          onClick={toggleCanvas}
          className="p-1 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center text-zinc-500">
          <p className="text-sm">Canvas Area</p>
          <p className="text-xs mt-1 opacity-70">Start drawing or adding content here</p>
        </div>
      </div>
    </div>
  );
};

export default CanvasArea;
