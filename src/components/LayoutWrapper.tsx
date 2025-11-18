import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { useLocation } from "@tanstack/react-router";
import Header from "./Header";

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <main className="flex flex-col min-h-screen w-full grid-bg-effect">
      {!isLoginPage && <Header />}
      {children}
      <Toaster richColors />
    </main>
  );
};

export default LayoutWrapper;
