"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { NavGroup } from "@/components/nav-group";
import { navGroups } from "@/components/app-shared";

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" variant="floating" className="border-none">
      <SidebarContent className="px-2 py-3 space-y-4">
        {navGroups.map((group, index) => (
          <NavGroup key={`sidebar-group-${index}`} {...group} />
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
