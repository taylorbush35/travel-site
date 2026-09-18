import Image from "next/image";
import { GuideCarousel } from "@/components/countries/guide-carousel";
import type { ShoppingEntry } from "@/lib/country-guide-types";
import { hasPhotographicAsset } from "@/lib/country-media";

export function ShoppingBoard({ items }: { items: ShoppingEntry[] }) {
  if (items.length === 0) return null;

  if (items.length <= 2) {
    return (
      <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
        {items.map((item) => (
          <li key={item.name}>
            <ShoppingModule item={item} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <GuideCarousel
      label="Shopping picks"
      variant="peek"
      items={items.map((entry) => ({
        kicker: entry.category,
        title: entry.name,
        body: entry.note,
        image: entry.image,
      }))}
    />
  );
}

function ShoppingModule({ item }: { item: ShoppingEntry }) {
  const photo = item.image && hasPhotographicAsset(item.image) ? item.image : null;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-[rgba(31,29,27,0.08)] bg-[var(--color-surface)] md:min-h-[12.5rem] md:flex-row">
      {photo ? (
        <div className="relative hidden w-[40%] shrink-0 md:block">
          <Image
            src={photo}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 768px) 14rem, 40vw"
          />
        </div>
      ) : null}
      {photo ? (
        <div className="relative aspect-[5/4] w-full md:hidden">
          <Image
            src={photo}
            alt=""
            fill
            className="object-cover"
            sizes="90vw"
          />
        </div>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-5 md:px-6 md:py-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#A39B95]">
          {item.category}
        </p>
        <h3 className="mt-2 font-display text-[1.35rem] leading-[1.2] tracking-tight text-[var(--color-text-primary)] md:text-[1.5rem]">
          {item.name}
        </h3>
        <p className="mt-3 text-[0.925rem] leading-[1.7] text-[var(--color-text-muted)]">
          {item.note}
        </p>
      </div>
    </article>
  );
}
