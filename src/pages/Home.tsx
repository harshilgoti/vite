import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DataTableDemo } from "./dashboard/table";
export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div>Demo app</div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className=" min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <DataTableDemo />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
