"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import { MessageCircleMore, ContactRound, Bot, UserCog } from "lucide-react";
import {
  SIDE_BAR_TOOLTIP_MESSAGE,
  HEADER_BAR_DEATAIL_MESSAGE,
} from "@/config/constants";

import DescriptionBar from "./description-header-bar";

type SidebarShellProps = {
  userId: string;
  children: React.ReactNode;
};

const SideBarShell = ({ userId, children }: SidebarShellProps) => {
  const pathname = usePathname();

  const items = [
    {
      title: "MessageCircleMore",
      url: `/dashboard/${userId}/invoices/sessions`,
      icon: MessageCircleMore,
      text: SIDE_BAR_TOOLTIP_MESSAGE.SESSIONS_LIST,
      headerBarText: HEADER_BAR_DEATAIL_MESSAGE.SESSIONS_LIST,
    },
    {
      title: "ContactRound",
      url: `/dashboard/${userId}/invoices/inquiries`,
      icon: ContactRound,
      text: SIDE_BAR_TOOLTIP_MESSAGE.VISITOR_CONTACT,
      headerBarText: HEADER_BAR_DEATAIL_MESSAGE.VISITOR_CONTACT,
    },
    {
      title: "Bot",
      url: `/dashboard/${userId}/chatbot/setting`,
      icon: Bot,
      text: SIDE_BAR_TOOLTIP_MESSAGE.AI_SETTING,
      headerBarText: HEADER_BAR_DEATAIL_MESSAGE.AI_SETTING,
    },
    {
      title: "UserCog",
      url: `/dashboard/${userId}/user/setting`,
      icon: UserCog,
      text: SIDE_BAR_TOOLTIP_MESSAGE.PERSONAL_SETTINGS,
      headerBarText: HEADER_BAR_DEATAIL_MESSAGE.PERSONAL_SETTINGS,
    },
  ];

  const activeItem = items.find((it) => pathname.includes(it.url));

  return (
    <div className="flex h-screen w-full">
      <Sidebar className="border-r border-foreground">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-8 pt-9">
                {items.map((item) => {
                  const isActive =
                    pathname === item.url || pathname.includes(`${item.url}/`);

                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className="flex justify-center"
                    >
                      <SidebarMenuButton
                        asChild
                        className="flex h-14 w-14 items-center justify-center transition-colors hover:bg-accent"
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={item.url}>
                              <item.icon
                                className={`h-8 w-8 transition-colors ${
                                  isActive
                                    ? "text-primary"
                                    : "text-sidebar-foreground"
                                }`}
                              />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right" sideOffset={10}>
                            <p className="text-sm">{item.text}</p>
                          </TooltipContent>
                        </Tooltip>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <div className="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden">
        <DescriptionBar
          icon={activeItem?.icon}
          title={activeItem?.text}
          headerBarDetailText={activeItem?.headerBarText}
        />
        <main className="flex-1 min-h-0 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SideBarShell;
