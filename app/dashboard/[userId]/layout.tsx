import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarShell from "@/app/ui/dashboard/side-bar-shell";
import { cookies } from "next/headers";

type LayoutProps = {
  params: Promise<{ userId: string }>;
  children: React.ReactNode;
};

const Layout = async ({ params, children }: LayoutProps) => {
  const { userId } = await params;

  return (
    <SidebarProvider
      defaultOpen={true}
      style={{ "--sidebar-width": "4.5rem" } as React.CSSProperties}
    >
      <SidebarShell userId={userId}>{children}</SidebarShell>
    </SidebarProvider>
  );
};

export default Layout;
