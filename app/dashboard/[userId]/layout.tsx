import "@/app/ui/global.css";
import SideBar from "@/app/ui/dashboard/side-bar";
import SideNavBar from "@/app/ui/dashboard/side-nav-bar";

type LayoutProps = {
  params: { userId: string; sessionId: string };
  children: React.ReactNode;
};

const Layout = ({ params, children }: LayoutProps) => {
  const { userId, sessionId } = params;
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <div className="flex h-full">
        <div className="w-28 flex-none">
          <SideBar userId={userId} sessionId={sessionId} />
        </div>
        <div className="w-64 flex-none border-l border-brown-200">
          <SideNavBar userId={userId} sessionId={sessionId} />
        </div>
      </div>
      <div className="flex-grow p-6 md:p-12">{children}</div>
    </div>
  );
};

export default Layout;
