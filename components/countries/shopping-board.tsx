import type { ShoppingEntry } from "@/lib/country-guide-types";

/**
 * A quiet, typographic list — deliberately not another carousel. Keeps
 * Shopping feeling like scannable notes rather than a wall of UI cards.
 */
export function ShoppingBoard({ items }: { items: ShoppingEntry[] }) {
  if (items.length === 0) return null;

  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);

  return (
    <div className="grid gap-x-14 md:grid-cols-2">
      <ul className="divide-y divide-[rgba(31,29,27,0.08)]">
        {left.map((item) => (
          <ShoppingRow key={item.name} item={item} />
        ))}
      </ul>
      {right.length > 0 ? (
        <ul className="mt-2 divide-y divide-[rgba(31,29,27,0.08)] border-t border-[rgba(31,29,27,0.08)] md:mt-0 md:border-t-0">
          {right.map((item) => (
            <ShoppingRow key={item.name} item={item} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function ShoppingRow({ item }: { item: ShoppingEntry }) {
  return (
    <li className="py-5 first:pt-0 last:pb-0 sm:py-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#A39B95]">
        {item.category}
        {item.area ? ` · ${item.area}` : ""}
      </p>
      <h3 className="mt-1.5 font-display text-[1.3rem] leading-[1.2] tracking-tight text-[var(--color-text-primary)] sm:text-[1.4rem]">
        {item.name}
      </h3>
      <p className="mt-1.5 text-[0.925rem] leading-[1.55] text-[var(--color-text-muted)]">
        {item.note}
      </p>
    </li>
  );
}
