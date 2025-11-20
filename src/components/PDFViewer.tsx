import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { cn } from "~/utils/merge";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from "lucide-react";

// Configure PDF.js worker (client-side only)
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

type PDFViewerProps = {
  className?: string;
  pdfUrl?: string;
};

const PDFViewer = ({
  className,
  pdfUrl = "/pdf/sample.pdf",
}: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isClient, setIsClient] = useState<boolean>(false);

  // Ensure component only renders on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    setPageNumber(1);
    setScale(1.0);
    setRotation(0);
    setLoading(true);
    setError("");
  }, [pdfUrl, isClient]);

  // Don't render PDF on server
  if (!isClient) {
    return (
      <div className={cn("flex flex-col h-full bg-zinc-950", className)}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-zinc-500">
            <div className="w-8 h-8 border-4 border-zinc-700 border-t-amber-500 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm">Initializing PDF Viewer...</p>
          </div>
        </div>
      </div>
    );
  }

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError("");
  };

  const onDocumentLoadError = (error: Error) => {
    setLoading(false);
    setError(`Failed to load PDF: ${error.message}`);
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const rotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= numPages) {
      setPageNumber(value);
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-zinc-950", className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
        {/* Page Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1 || loading}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-200" />
          </button>

          <div className="flex items-center gap-2 text-sm text-zinc-300 font-heading">
            <input
              type="number"
              min={1}
              max={numPages}
              value={pageNumber}
              onChange={handlePageInputChange}
              disabled={loading}
              className="w-14 px-2 py-1 text-center bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:opacity-30"
            />
            <span className="text-zinc-500">/</span>
            <span className="text-zinc-400">{numPages || "--"}</span>
          </div>

          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages || loading}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4 text-zinc-200" />
          </button>
        </div>

        {/* Zoom and Rotate Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5 || loading}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4 text-zinc-200" />
          </button>

          <span className="text-sm text-zinc-400 font-heading min-w-[4rem] text-center">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={zoomIn}
            disabled={scale >= 3.0 || loading}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4 text-zinc-200" />
          </button>

          <div className="w-px h-6 bg-zinc-700 mx-1"></div>

          <button
            onClick={rotate}
            disabled={loading}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Rotate"
          >
            <RotateCw className="w-4 h-4 text-zinc-200" />
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-zinc-950 p-4">
        <div className="flex items-center justify-center min-h-full">
          {error ? (
            <div className="text-center text-red-400">
              <p className="text-sm font-medium">{error}</p>
              <p className="text-xs mt-2 text-zinc-500">
                Make sure the PDF file exists at {pdfUrl}
              </p>
            </div>
          ) : (
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="text-center text-zinc-500">
                  <div className="w-8 h-8 border-4 border-zinc-700 border-t-amber-500 rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-sm">Loading PDF...</p>
                </div>
              }
              className="flex justify-center"
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                rotate={rotation}
                loading={
                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
                    <div className="w-6 h-6 border-4 border-zinc-700 border-t-amber-500 rounded-full animate-spin"></div>
                  </div>
                }
                className="shadow-2xl rounded-lg overflow-hidden border border-zinc-800"
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </Document>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
