import "@/app/ui/global.css";
import SideBar from "../ui/dashboard/side-bar";
import SideNavBar from "../ui/dashboard/side-nav-bar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <div className="flex h-full">
        <div className="w-28 flex-none">
          <SideBar />
        </div>
        <div className="w-64 flex-none border-l border-brown-200">
          <SideNavBar />
        </div>
      </div>
      <div className="flex-grow p-6 md:p-12">{children}</div>
    </div>
  );
};

export default Layout;
