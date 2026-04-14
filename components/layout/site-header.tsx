import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/countries", label: "Countries" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-text-primary)]"
        >
          Taylor Travels
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
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
