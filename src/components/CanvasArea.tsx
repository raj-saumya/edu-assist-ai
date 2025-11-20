import { useState, useRef, useEffect, useCallback } from "react";
import getStroke from "perfect-freehand";
import { cn } from "~/utils/merge";
import {
  Undo2,
  Redo2,
  Trash2,
  Download,
  Palette,
  Minus,
  Plus,
} from "lucide-react";

type Point = [number, number, number];

type Stroke = {
  points: Point[];
  color: string;
  size: number;
};

type CanvasAreaProps = {
  className?: string;
};

const getSvgPathFromStroke = (points: number[][]): string => {
  if (!points.length) {
    return "";
  }

  const d = points.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...points[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};

const COLORS = [
  { name: "White", value: "#ffffff" },
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Yellow", value: "#eab308" },
  { name: "Lime", value: "#84cc16" },
  { name: "Green", value: "#22c55e" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#a855f7" },
  { name: "Pink", value: "#ec4899" },
];

const CanvasArea = ({ className }: CanvasAreaProps) => {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const [strokeSize, setStrokeSize] = useState(8);
  const [undoneStrokes, setUndoneStrokes] = useState<Stroke[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getPointFromEvent = useCallback(
    (e: React.PointerEvent<SVGSVGElement>): Point => {
      const svg = svgRef.current;
      if (!svg) return [0, 0, 0.5];

      const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const pressure = e.pressure || 0.5;

      return [x, y, pressure];
    },
    []
  );

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    setUndoneStrokes([]);
    const point = getPointFromEvent(e);
    setCurrentStroke([point]);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDrawing) {
      return;
    }
    e.preventDefault();
    const point = getPointFromEvent(e);
    setCurrentStroke((prev) => [...prev, point]);
  };

  const handlePointerUp = () => {
    if (!isDrawing) {
      return;
    }
    setIsDrawing(false);
    if (currentStroke.length > 0) {
      setStrokes((prev) => [
        ...prev,
        { points: currentStroke, color: currentColor, size: strokeSize },
      ]);
      setCurrentStroke([]);
    }
  };

  const renderStroke = (stroke: Stroke, index: number) => {
    const outlinePoints = getStroke(stroke.points, {
      size: stroke.size,
      thinning: 0.5,
      smoothing: 0.5,
      streamline: 0.5,
      simulatePressure: true,
      last: true,
    });

    const pathData = getSvgPathFromStroke(outlinePoints);

    return <path key={index} d={pathData} fill={stroke.color} stroke="none" />;
  };

  const handleUndo = () => {
    if (strokes.length === 0) {
      return;
    }
    const lastStroke = strokes[strokes.length - 1];
    setUndoneStrokes((prev) => [...prev, lastStroke]);
    setStrokes((prev) => prev.slice(0, -1));
  };

  const handleRedo = () => {
    if (undoneStrokes.length === 0) {
      return;
    }
    const strokeToRedo = undoneStrokes[undoneStrokes.length - 1];
    setStrokes((prev) => [...prev, strokeToRedo]);
    setUndoneStrokes((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (strokes.length === 0) {
      return;
    }
    if (window.confirm("Are you sure you want to clear the canvas?")) {
      setStrokes([]);
      setUndoneStrokes([]);
      setCurrentStroke([]);
    }
  };

  const handleDownload = () => {
    if (!svgRef.current || strokes.length === 0) {
      return;
    }

    const svgData = svgRef.current.outerHTML;
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `canvas-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const increaseSize = () => {
    setStrokeSize((prev) => Math.min(prev + 2, 32));
  };

  const decreaseSize = () => {
    setStrokeSize((prev) => Math.max(prev - 2, 2));
  };

  if (!isClient) {
    return (
      <div className={cn("flex flex-col h-full bg-zinc-950", className)}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-zinc-500">
            <div className="w-8 h-8 border-4 border-zinc-700 border-t-amber-500 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm">Initializing Canvas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full bg-zinc-950", className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
        {/* Left side - Drawing tools */}
        <div className="flex items-center gap-2">
          {/* Color Picker */}
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center gap-2"
              aria-label="Select color"
            >
              <Palette className="w-4 h-4 text-zinc-200" />
              <div
                className="w-6 h-6 rounded border-2 border-zinc-700"
                style={{ backgroundColor: currentColor }}
              />
            </button>

            {showColorPicker && (
              <div className="absolute top-full left-0 mt-2 p-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-10 grid grid-cols-4 gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => {
                      setCurrentColor(color.value);
                      setShowColorPicker(false);
                    }}
                    className="w-8 h-8 rounded border-2 hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: color.value,
                      borderColor:
                        currentColor === color.value ? "#f59e0b" : "#3f3f46",
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-zinc-700 mx-1"></div>

          {/* Stroke Size */}
          <div className="flex items-center gap-2 bg-zinc-800 rounded-lg px-2 py-1">
            <button
              onClick={decreaseSize}
              disabled={strokeSize <= 2}
              className="p-1 hover:bg-zinc-700 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease size"
            >
              <Minus className="w-4 h-4 text-zinc-200" />
            </button>

            <div className="flex items-center gap-2 min-w-[4rem] justify-center">
              <div
                className="rounded-full bg-white"
                style={{
                  width: `${Math.max(strokeSize / 2, 4)}px`,
                  height: `${Math.max(strokeSize / 2, 4)}px`,
                }}
              />
              <span className="text-xs text-zinc-400 font-heading">
                {strokeSize}
              </span>
            </div>

            <button
              onClick={increaseSize}
              disabled={strokeSize >= 32}
              className="p-1 hover:bg-zinc-700 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Increase size"
            >
              <Plus className="w-4 h-4 text-zinc-200" />
            </button>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={strokes.length === 0}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Undo"
          >
            <Undo2 className="w-4 h-4 text-zinc-200" />
          </button>

          <button
            onClick={handleRedo}
            disabled={undoneStrokes.length === 0}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Redo"
          >
            <Redo2 className="w-4 h-4 text-zinc-200" />
          </button>

          <div className="w-px h-6 bg-zinc-700 mx-1"></div>

          <button
            onClick={handleDownload}
            disabled={strokes.length === 0}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Download"
          >
            <Download className="w-4 h-4 text-zinc-200" />
          </button>

          <button
            onClick={handleClear}
            disabled={strokes.length === 0}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Clear canvas"
          >
            <Trash2 className="w-4 h-4 text-zinc-200" />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <svg
          ref={svgRef}
          className="w-full h-full cursor-crosshair"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{ touchAction: "none" }}
        >
          {/* Render completed strokes */}
          {strokes.map((stroke, index) => renderStroke(stroke, index))}

          {/* Render current stroke being drawn */}
          {currentStroke.length > 0 && (
            <path
              d={getSvgPathFromStroke(
                getStroke(currentStroke, {
                  size: strokeSize,
                  thinning: 0.5,
                  smoothing: 0.5,
                  streamline: 0.5,
                  simulatePressure: true,
                  last: false,
                })
              )}
              fill={currentColor}
              stroke="none"
            />
          )}
        </svg>

        {/* Empty state */}
        {strokes.length === 0 && !isDrawing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-zinc-600">
              <p className="text-sm">Start drawing with your mouse or touch</p>
              <p className="text-xs mt-1 opacity-70">
                Use the toolbar to change colors and stroke size
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CanvasArea;
