"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/countries", label: "Countries" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-[var(--color-bg)]">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3 md:px-10">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-text-primary)]"
        >
          Taylor Travels
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm transition-colors ${
                    (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
                      ? "text-[var(--color-signature)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-signature)]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
