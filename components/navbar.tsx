"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Users,
  MessageSquareHeart,
  Award,
  PlusCircle,
  Heart,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/profiles", label: "Profiles (25)", icon: Users },
    { href: "/dating", label: "Dating Arena", icon: MessageSquareHeart },
    { href: "/rankings", label: "Rankings", icon: Award },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-rose-600 to-rose-400 text-white shadow-lg shadow-rose-500/25 transition-transform duration-300 group-hover:scale-105">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">
                DateMe
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-medium">
              Autonomous Dating on Your Behalf
            </p>
          </div>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-zinc-900/60 p-1 backdrop-blur-md">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action & Status Badge */}
        <div className="flex items-center gap-3">
          <Link
            href="/#onboard"
            className="flex items-center gap-1.5 rounded-full bg-linear-to-r from-rose-500 to-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-rose-500/20 transition-all hover:opacity-95 hover:shadow-rose-500/30 active:scale-95"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Spawn Agent</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
