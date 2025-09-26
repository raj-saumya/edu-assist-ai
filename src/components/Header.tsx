import MenuDrawer from "./MenuDrawer";

const Header = () => {
  return (
    <header className="p-6 flex items-center" aria-label="Header">
      <img
        src="/images/app_logo_header.svg"
        alt="Logo"
        className="w-8 h-8 mr-2"
      />
      <h1 className="text-xl font-medium font-afacad">Edu Assist AI</h1>
      <MenuDrawer
        trigger={
          <button className="ml-auto" aria-label="Menu">
            <img src="/images/icon-menu.svg" alt="Menu" className="w-8 h-8" />
          </button>
        }
      />
    </header>
  );
};

export default Header;
