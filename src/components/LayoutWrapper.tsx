import type { ReactNode } from "react";
import { Toaster } from "sonner";
import Header from "./Header";

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col min-h-screen w-full grid-bg-effect">
      <Header />
      {children}
      <Toaster richColors />
    </main>
  );
};

export default LayoutWrapper;
