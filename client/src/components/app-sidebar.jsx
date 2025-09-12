import { Frame, List, Mail, Settings } from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useUserStore from "../store/store";

export function AppSidebar({ ...props }) {
  const loading = useUserStore((state) => state.loading);
  const user = useUserStore((state) => state.user);

  const data = {
    user: {
      name: user?.username,
      email: user?.email,
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        name: "Dashboard",
        url: "/dashboard",
        icon: Frame,
      },
      {
        name: "Send Email",
        url: "/send-email",
        icon: Mail,
      },
      {
        name: "Choose Email Template",
        url: "/list-email",
        icon: Frame,
      },
      {
        name: "Current Email Logs",
        url: "/logs",
        icon: List,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: Settings,
      },
    ],
  };

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Mail className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Email Dashboard</span>
                  <span className="truncate text-xs">Enterprise use</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.navMain} disabled={loading} />
        <NavSecondary
          items={data.navSecondary}
          className="mt-auto"
          disabled={loading}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
