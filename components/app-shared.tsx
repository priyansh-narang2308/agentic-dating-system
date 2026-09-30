import type { ReactNode } from "react";
import {
  UsersIcon,
  MessageSquareHeartIcon,
  AwardIcon,
  ShieldCheckIcon,
  CpuIcon,
} from "lucide-react";

export type SidebarNavItem = {
  title: string;
  path: string;
  icon?: ReactNode;
  badge?: string;
  isActive?: boolean;
};

export type SidebarNavGroup = {
  label?: string;
  items: SidebarNavItem[];
};

export const navGroups: SidebarNavGroup[] = [
  {
    items: [
      {
        title: "All Profiles (25)",
        path: "/profiles",
        icon: <UsersIcon className="h-4 w-4" />,
      },
      {
        title: "Dating Arena",
        path: "/dating",
        icon: <MessageSquareHeartIcon className="h-4 w-4" />,
      },
      {
        title: "Match Rankings",
        path: "/rankings",
        icon: <AwardIcon className="h-4 w-4" />,
      },
    ],
  },
];

export const footerNavLinks: SidebarNavItem[] = [
  {
    title: "Dual-Source Grounded",
    path: "/profiles",
    icon: <ShieldCheckIcon className="h-4 w-4 text-emerald-400" />,
  },
  {
    title: "Gemini 2.5 Flash Online",
    path: "/dating",
    icon: <CpuIcon className="h-4 w-4 text-primary" />,
  },
];
