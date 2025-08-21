import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "../components/ui/sonner";
import useUserStore from "../store/store";

export const iframeHeight = "800px";

export const description = "A sidebar with a header and a search form.";

export default function DashboardPage({ children }) {
  const token = useUserStore((state) => state.token);

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="flex-1 overflow-auto">
            {children} {token}
          </SidebarInset>
        </div>
      </SidebarProvider>
      <Toaster />
    </div>
  );
}
