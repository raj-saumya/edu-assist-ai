import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { logout, getAuthToken } from "~/utils/auth";
import { isStudentProfile } from "~/utils/profile";

type MenuDrawerProps = {
  trigger: ReactNode;
};

type MenuItemProps = {
  to: string;
  children: ReactNode;
  onClose: () => void;
};

const MenuItem = ({ to, children, onClose }: MenuItemProps) => {
  const handleClick = () => {
    onClose();
  };

  return (
        <Link
          to={to}
          onClick={handleClick}
          className="text-xl text-left text-white hover:text-amber-400 transition-colors"
        >
      {children}
    </Link>
  );
};

const MenuDrawer = ({ trigger }: MenuDrawerProps) => {
  const [open, setOpen] = useState(false);
  const isLoggedIn = !!getAuthToken();
  const isStudent = isStudentProfile();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="p-8 bg-zinc-900 border-zinc-800">
        <DrawerHeader className="p-0 text-left mb-6">
          <DrawerTitle className="font-heading font-semibold text-2xl text-white">
            Menu
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-5 h-full">
          <MenuItem to="/" onClose={handleClose}>
            Home
          </MenuItem>
          <MenuItem to="/dashboard" onClose={handleClose}>
            Dashboard
          </MenuItem>
          {!isStudent && (
            <MenuItem to="/guardian" onClose={handleClose}>
              Guardian
            </MenuItem>
          )}
          <MenuItem to="/chat" onClose={handleClose}>
            Chat
          </MenuItem>
          {isLoggedIn && (
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-sm rounded-full py-3 px-6 w-fit mt-auto mb-10 hover:shadow-lg hover:shadow-amber-500/30 transition-all"
            >
              <span className="text-black text-sm font-bold">LOGOUT</span>
              <img
                src="/images/icon-logout.svg"
                alt="logout"
                className="w-5 h-5"
              />
            </button>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuDrawer;
