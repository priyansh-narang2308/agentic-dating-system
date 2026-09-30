"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  // Do NOT render navbar on dashboard routes (which use the dashboard sidebar and header)
  if (pathname !== "/") {
    return null;
  }

  const navLinks = [
    { href: "/profiles", label: "Profiles" },
    { href: "/dating", label: "Dating Arena" },
    { href: "/rankings", label: "Rankings" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0D1B23]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-[#F8DDEB] transition-colors hover:text-[#FF69B4]"
        >
          DateMe
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-[#FF69B4]/15 bg-[#09151C] p-1 md:flex">
          {navLinks.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#FF69B4] text-[#0D1B23]"
                    : "text-[#9DAAB1] hover:bg-[#FF69B4]/10 hover:text-[#FFD1E6]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/dating"
          className="rounded-full cursor-pointer bg-[#FF69B4] px-5 py-2 text-sm font-bold text-[#0D1B23] shadow-[0_3px_0_#9D286B] transition-all hover:bg-[#FF85C1] active:translate-y-[2px] active:shadow-none"
        >
          Spawn Agent
        </Link>
      </div>
    </header>
  );
}
