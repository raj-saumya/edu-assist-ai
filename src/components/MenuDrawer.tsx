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
        <div className="flex flex-col gap-5">
          <MenuItem to="/" onClose={handleClose}>
            Home
          </MenuItem>
          <MenuItem to="/dashboard" onClose={handleClose}>
            Dashboard
          </MenuItem>
          <MenuItem to="/guardian" onClose={handleClose}>
            Guardian
          </MenuItem>
          <MenuItem to="/chat" onClose={handleClose}>
            Chat
          </MenuItem>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuDrawer;
