import Image from "next/image";
import { SketchArrow, SketchUnderline } from "@/components/countries/guide-art";
import { hasPhotographicAsset } from "@/lib/country-media";

type ActivityJournalListProps = {
  items: string[];
  accentPhoto?: string;
  countryName: string;
};

/**
 * Quiet, typography-led "things to do" list. Large serif numbers carry the
 * visual weight; at most one small editorial photo accent supports it.
 */
export function ActivityJournalList({
  items,
  accentPhoto,
  countryName,
}: ActivityJournalListProps) {
  if (items.length === 0) return null;

  const photo =
    accentPhoto && hasPhotographicAsset(accentPhoto) ? accentPhoto : null;
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);

  return (
    <div className="relative">
      {photo ? (
        <div
          className="pointer-events-none absolute -top-3 right-0 hidden w-[6.5rem] rotate-[3deg] lg:block xl:w-[7.5rem]"
          aria-hidden
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[0.4rem] border border-[rgba(31,29,27,0.12)] bg-[var(--color-guide-surface)] shadow-[0_10px_22px_-14px_rgba(31,29,27,0.35)]">
            <Image
              src={photo}
              alt=""
              fill
              className="object-cover"
              sizes="140px"
            />
          </div>
          <SketchArrow className="absolute -left-11 top-1/2 h-7 w-11 -translate-y-1/2 -scale-x-100 text-[var(--color-signature)] opacity-55" />
        </div>
      ) : null}

      <div className="grid gap-x-14 lg:grid-cols-2">
        <ol>
          {left.map((title, i) => (
            <ActivityRow
              key={title}
              index={i}
              title={title}
              mark={i === 0}
            />
          ))}
        </ol>
        {right.length > 0 ? (
          <ol className="border-t border-[rgba(31,29,27,0.08)] lg:border-t-0">
            {right.map((title, i) => (
              <ActivityRow key={title} index={half + i} title={title} />
            ))}
          </ol>
        ) : null}
      </div>
    </div>
  );
}

function ActivityRow({
  index,
  title,
  mark = false,
}: {
  index: number;
  title: string;
  mark?: boolean;
}) {
  const kicker = String(index + 1).padStart(2, "0");

  return (
    <li className="flex items-baseline gap-5 border-b border-[rgba(31,29,27,0.08)] py-6 first:pt-0 last:border-b-0 sm:gap-6 sm:py-7">
      <span className="relative shrink-0 font-display text-[2.1rem] leading-none tracking-tight text-[rgba(91,58,142,0.4)] sm:text-[2.5rem]">
        {kicker}
        {mark ? (
          <SketchUnderline
            className="absolute -bottom-2 left-0 h-2 w-9 text-[var(--color-signature)] opacity-60"
            aria-hidden
          />
        ) : null}
      </span>
      <h3 className="font-display text-[1.3rem] leading-[1.3] tracking-tight text-[var(--color-text-primary)] sm:text-[1.45rem]">
        {title}
      </h3>
    </li>
  );
}
