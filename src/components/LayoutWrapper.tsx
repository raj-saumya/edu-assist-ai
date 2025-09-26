import type { ReactNode } from "react";
import Header from "./Header";

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col min-h-screen w-full grid-bg-effect">
      <Header />
      {children}
    </main>
  );
};

export default LayoutWrapper;
