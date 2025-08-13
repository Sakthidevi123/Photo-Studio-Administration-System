import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/AppSidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <header className="h-14 flex items-center border-b bg-background/80 backdrop-blur">
        <div className="container flex items-center gap-3">
          <SidebarTrigger className="hover-scale" />
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md" style={{ background: "var(--gradient-primary)" }} />
            <span className="font-display text-lg">Studio Manager</span>
          </div>
        </div>
      </header>
      <div className="flex min-h-[calc(100vh-56px)] w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="container py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
