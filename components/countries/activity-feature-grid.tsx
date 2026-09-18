import Image from "next/image";
import { hasPhotographicAsset, photosForCount } from "@/lib/country-media";

type ActivityFeatureGridProps = {
  items: string[];
  photos: string[];
  countryName: string;
};

export function ActivityFeatureGrid({
  items,
  photos,
  countryName,
}: ActivityFeatureGridProps) {
  if (items.length === 0) return null;

  const featured = items.slice(0, 3);
  const rest = items.slice(3);
  const featuredPhotos = photosForCount(
    photos.filter((src) => hasPhotographicAsset(src)),
    featured.length,
  );

  return (
    <div>
      <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-5">
        <ActivityTile
          index={0}
          title={featured[0]}
          image={featuredPhotos[0]}
          countryName={countryName}
          featured
        />
        {featured.length > 1 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 lg:gap-5">
            {featured.slice(1).map((title, i) => (
              <ActivityTile
                key={title}
                index={i + 1}
                title={title}
                image={featuredPhotos[i + 1]}
                countryName={countryName}
              />
            ))}
          </div>
        ) : null}
      </div>

      {rest.length > 0 ? (
        <div className="mt-10 border-t border-[rgba(31,29,27,0.08)] pt-8 md:mt-11 md:pt-9">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#A39B95]">
            More to do
          </p>
          <ol className="mt-5 divide-y divide-[rgba(31,29,27,0.08)]">
            {rest.map((title, i) => (
              <li
                key={title}
                className="grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <span className="font-mono text-xs tracking-[0.16em] text-[#A39B95]">
                  {String(i + 4).padStart(2, "0")}
                </span>
                <p className="font-display text-[1.15rem] leading-snug tracking-tight text-[var(--color-text-primary)] md:text-[1.25rem]">
                  {title}
                </p>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}

function ActivityTile({
  index,
  title,
  image,
  countryName,
  featured = false,
}: {
  index: number;
  title: string;
  image?: string;
  countryName: string;
  featured?: boolean;
}) {
  const kicker = String(index + 1).padStart(2, "0");
  const photo = image && hasPhotographicAsset(image) ? image : null;

  if (photo) {
    return (
      <article
        className={[
          "relative isolate overflow-hidden rounded-[1.15rem]",
          featured
            ? "h-full min-h-[18rem] sm:min-h-[22rem]"
            : "min-h-[11.5rem] sm:min-h-[13rem] lg:h-full",
        ].join(" ")}
      >
        <Image
          src={photo}
          alt={`Photography from ${countryName}`}
          fill
          className={[
            "object-cover",
            index === 1 ? "object-[center_35%]" : "object-center",
          ].join(" ")}
          sizes={
            featured
              ? "(min-width: 1024px) 28rem, 100vw"
              : "(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
          }
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(20,16,14,0.72)] via-[rgba(20,16,14,0.12)] to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/75">
            {kicker}
          </p>
          <h3
            className={[
              "mt-1.5 font-display leading-[1.2] tracking-tight text-white",
              featured
                ? "text-[1.45rem] md:text-[1.7rem]"
                : "text-[1.2rem] md:text-[1.3rem]",
            ].join(" ")}
          >
            {title}
          </h3>
        </div>
      </article>
    );
  }

  return (
    <article
      className={[
        "flex h-full flex-col justify-between rounded-[1.15rem] border border-[rgba(31,29,27,0.08)] bg-[var(--color-surface)]",
        featured ? "min-h-[16rem] px-6 py-6 md:px-7 md:py-7" : "px-5 py-5 md:px-6",
      ].join(" ")}
    >
      <p
        className={[
          "font-display leading-none text-[rgba(91,58,142,0.22)]",
          featured ? "text-[4.5rem] md:text-[5.5rem]" : "text-[3rem]",
        ].join(" ")}
        aria-hidden
      >
        {kicker}
      </p>
      <h3
        className={[
          "mt-2 font-display leading-[1.2] tracking-tight text-[var(--color-text-primary)]",
          featured
            ? "text-[1.45rem] md:text-[1.7rem]"
            : "text-[1.2rem] md:text-[1.3rem]",
        ].join(" ")}
      >
        {title}
      </h3>
    </article>
  );
}
