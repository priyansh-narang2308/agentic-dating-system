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
    <SidebarGroup className="px-2">
      {label && (
        <SidebarGroupLabel className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#60717A] group-data-[collapsible=icon]:hidden">
          {label}
        </SidebarGroupLabel>
      )}

      <SidebarMenu className="gap-1">
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
                className={[
                  "relative h-11 w-full rounded-lg px-3",
                  "bg-transparent! border-0!",
                  "shadow-none!",
                  "transition-colors duration-150",
                  "hover:bg-white/[0.035]!",
                  "hover:text-[#D9E0E3]!",
                  "focus-visible:ring-1 focus-visible:ring-[#FF69B4]/30",
                  isActive
                    ? "bg-[#FF69B4]/10! text-[#FFD1E6]!"
                    : "text-[#8A989F]!",
                ].join(" ")}
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span
                    className={[
                      "flex shrink-0 items-center justify-center",
                      "[&>svg]:size-[19px]",
                      isActive ? "text-[#FF69B4]" : "text-[#7C8A92]",
                    ].join(" ")}
                  >
                    {item.icon}
                  </span>

                  <span className="truncate text-[14px] font-medium group-data-[collapsible=icon]:hidden">
                    {item.title}
                  </span>
                </div>

                {item.badge && (
                  <Badge
                    variant="outline"
                    className={[
                      "h-5 rounded-full px-2 text-[10px] font-medium",
                      "group-data-[collapsible=icon]:hidden",
                      "bg-transparent!",
                      isActive
                        ? "border-[#FF69B4]/25! text-[#FF9DCA]!"
                        : "border-white/10! text-[#68777F]!",
                    ].join(" ")}
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