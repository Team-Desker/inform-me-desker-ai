import "@/app/ui/global.css";
import SideBar from "@/app/ui/dashboard/side-bar";
import SideNavBar from "@/app/ui/dashboard/side-nav-bar";

const user_id = 1234; // 임시 user_id (확인용)

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <div className="flex h-full">
        <div className="w-28 flex-none">
          <SideBar user_id={user_id} />
        </div>
        <div className="w-64 flex-none border-l border-brown-200">
          <SideNavBar user_id={user_id} />
        </div>
      </div>
      <div className="flex-grow p-6 md:p-12">{children}</div>
    </div>
  );
};

export default Layout;
