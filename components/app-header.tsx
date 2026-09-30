"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CustomSidebarTrigger } from "@/components/custom-sidebar-trigger";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { Home } from "lucide-react";

export function AppHeader() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.startsWith("/profiles/")) return "Agent Persona Dossier";
    if (pathname.startsWith("/profiles")) return "All Agent Profiles (25)";
    if (pathname.startsWith("/dating/")) return "Simulated Date Session";
    if (pathname.startsWith("/dating")) return "Dating Arena";
    if (pathname.startsWith("/rankings/"))
      return "Candidate Compatibility Breakdown";
    if (pathname.startsWith("/rankings")) return "Mutual Match Rankings";
    return "Agentic Dating Network";
  };

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border/40 bg-card/80 px-4 md:px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <CustomSidebarTrigger />
        <Separator orientation="vertical" className="h-4 bg-border/60" />
        <div className="flex items-center gap-2">
          <span className="font-sans font-bold text-sm text-foreground">
            {getPageTitle()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <Link
          href="/"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className:
              "h-8 text-xs text-muted-foreground hover:text-foreground",
          })}
        >
          <Home className="h-3.5 w-3.5 mr-1.5" />
          Home
        </Link>
      </div>
    </header>
  );
}
