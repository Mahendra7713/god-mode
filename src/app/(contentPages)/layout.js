"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function ContentLayout({ children }) {
  const pathname = usePathname();

  const formattedPathname = pathname
    .replace(/^\/+/, "") // Remove leading slashes
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\//g, ""); // Remove any remaining slashes

  const userData = {
    name: "Admin",
    email: "admin@codesis.io",
    avatar: "/avatars/shadcn.jpg",
  };

  console.log(pathname, "pathname");
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="w-full p-10 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="w-full flex items-center gap-2 justify-between ">
            <div className="flex items-center gap-2">
              {/* <SidebarTrigger className="-ml-1" /> */}
              <p className="capitalize">{formattedPathname}</p>
            </div>

            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
          </div>
        </header>
        {children}
      </SidebarInset>{" "}
    </SidebarProvider>
  );
}
