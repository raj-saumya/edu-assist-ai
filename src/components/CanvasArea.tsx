import { cn } from "~/utils/merge";

type CanvasAreaProps = {
  className?: string;
};

const CanvasArea = ({ className }: CanvasAreaProps) => {
  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center text-zinc-500">
          <p className="text-sm">Canvas Area</p>
          <p className="text-xs mt-1 opacity-70">
            Start drawing or adding content here
          </p>
        </div>
      </div>
    </div>
  );
};

export default CanvasArea;
