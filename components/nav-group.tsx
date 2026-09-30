"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import type { SidebarNavGroup } from "@/components/app-shared";
import { Badge } from "@/components/ui/badge";

export function NavGroup({ label, items }: SidebarNavGroup) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      {label && (
        <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 group-data-[collapsible=icon]:hidden">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path !== "/" && pathname?.startsWith(item.path));
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                render={<Link href={item.path} />}
                isActive={isActive}
                tooltip={item.title}
                className="flex items-center justify-between w-full rounded-xl py-5 px-3 text-sm font-medium transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="[&>svg]:size-5">{item.icon}</span>
                  <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                </div>
                {item.badge && (
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-4 border-primary/30 text-primary group-data-[collapsible=icon]:hidden"
                  >
                    {item.badge}
                  </Badge>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
