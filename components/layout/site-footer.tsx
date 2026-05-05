import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-bg)]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
          Travel inspiration, intentionally curated.
        </p>
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-signature)]"
          >
            Home
          </Link>
          <Link
            href="/countries"
            className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-signature)]"
          >
            Countries
          </Link>
          <p className="text-xs text-[var(--color-text-subtle)]">
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
