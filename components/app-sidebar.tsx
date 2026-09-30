"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup } from "@/components/ui/sidebar";
import { NavGroup } from "@/components/nav-group";
import { navGroups } from "@/components/app-shared";
import { buttonVariants } from "@/components/ui/button";

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="border-r border-border/40 bg-card"
    >
      <SidebarContent className="px-2 py-3 space-y-4">
        <SidebarGroup>
          <Link
            href="/#onboard"
            className={buttonVariants({
              className:
                "w-full h-10 font-semibold text-xs rounded-xl shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2",
            })}
          >
            <Plus className="h-4 w-4" />
            <span>Spawn Your Agent</span>
          </Link>
        </SidebarGroup>

        {navGroups.map((group, index) => (
          <NavGroup key={`sidebar-group-${index}`} {...group} />
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
