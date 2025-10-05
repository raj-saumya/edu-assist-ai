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
      className="font-afacad text-xl text-left"
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
      <DrawerContent className="p-8">
        <DrawerHeader className="p-0 text-left mb-6">
          <DrawerTitle className="font-afacad font-medium text-2xl">
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
              className="flex items-center gap-2 bg-[#2B2A47] text-sm font-afacad rounded-full py-2 px-6 w-fit mt-auto mb-10"
            >
              <span className="text-white font-afacad text-sm">LOGOUT</span>
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
