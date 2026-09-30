"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { NavGroup } from "@/components/nav-group";
import { navGroups } from "@/components/app-shared";

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="offcanvas"
      variant="floating"
      className="border-0 bg-transparent"
    >
      <SidebarContent className="bg-[#0D1B23] px-3 py-5">
        <div className="space-y-6">
          {navGroups.map((group, index) => (
            <NavGroup key={index} {...group} />
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
