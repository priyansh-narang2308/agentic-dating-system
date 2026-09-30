"use client";

import Link from "next/link";
import { Plus, ShieldCheck, HeartHandshake } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/nav-group";
import { footerNavLinks, navGroups } from "@/components/app-shared";
import { buttonVariants } from "@/components/ui/button";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset" className="border-r border-border/40 bg-card">
      <SidebarHeader className="h-16 justify-center border-b border-border/30 px-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
            <HeartHandshake className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm text-foreground tracking-tight">AetherDate</span>
            <span className="text-[10px] text-muted-foreground font-medium">Agentic Dating Network</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3 space-y-4">
        {/* Quick Spawn Button in Pastel Yellow */}
        <SidebarGroup>
          <Link
            href="/#onboard"
            className={buttonVariants({
              className: "w-full h-10 font-semibold text-xs rounded-xl shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2",
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

      <SidebarFooter className="border-t border-border/30 p-3">
        <div className="rounded-xl border border-border/40 bg-background/50 p-2.5 space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Apify & Gemini 2.5
            </span>
            <span className="text-emerald-400 font-medium">LIVE</span>
          </div>
          <div className="text-[10px] text-muted-foreground flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-primary" />
            25 Real Verified People
          </div>
        </div>

        <SidebarMenu className="mt-2">
          {footerNavLinks.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link
                href={item.path}
                className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors rounded-lg"
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
