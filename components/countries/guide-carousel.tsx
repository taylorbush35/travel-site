"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { hasPhotographicAsset } from "@/lib/country-media";

export type GuideCarouselItem = {
  kicker: string;
  title: string;
  meta?: string;
  body?: string;
  image?: string;
};

type GuideCarouselProps = {
  label: string;
  items: GuideCarouselItem[];
  variant?: "split" | "stack" | "cover" | "peek";
};

const WIDTH: Record<NonNullable<GuideCarouselProps["variant"]>, string> = {
  split:
    "w-[min(100%,calc(100%-1.75rem))] md:w-[min(34rem,calc(100%-5.5rem))]",
  stack:
    "w-[min(100%,calc(100%-2.25rem))] md:w-[min(19.5rem,calc(42%-0.5rem))]",
  cover:
    "w-[min(100%,calc(100%-2.25rem))] md:w-[min(21rem,calc(44%-0.5rem))]",
  peek: "w-[calc((100%-0.4rem)/1.1)] md:w-[calc((100%-1rem)/1.65)] lg:w-[calc((100%-2rem)/2.25)]",
};

export function GuideCarousel({
  label,
  items,
  variant = "split",
}: GuideCarouselProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const reactId = useId();
  const total = items.length;

  const goTo = useCallback(
    (next: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(next, el.children.length - 1));
      setIndex(clamped);

      const styles = getComputedStyle(el);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "16") || 16;
      let left = 0;
      for (let i = 0; i < clamped; i += 1) {
        left += (el.children[i] as HTMLElement).offsetWidth + gap;
      }
      el.scrollLeft = left;
    },
    [],
  );

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const updateFromScroll = () => {
      const slides = Array.from(el.children) as HTMLElement[];
      if (slides.length === 0) return;
      let closest = 0;
      let min = Number.POSITIVE_INFINITY;
      slides.forEach((slide, i) => {
        const dist = Math.abs(slide.offsetLeft - el.scrollLeft);
        if (dist < min) {
          min = dist;
          closest = i;
        }
      });
      setIndex(closest);
    };

    el.addEventListener("scroll", updateFromScroll, { passive: true });
    return () => el.removeEventListener("scroll", updateFromScroll);
  }, [items.length]);

  if (total === 0) return null;

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="mb-5 flex items-end justify-between gap-4">
        <p
          className="text-sm tabular-nums tracking-wide text-[#A39B95]"
          aria-live="polite"
        >
          {String(index + 1).padStart(2, "0")}
          <span className="mx-1.5 text-[#d4cdc6]">/</span>
          {String(total).padStart(2, "0")}
        </p>
        {total > 1 ? (
          <div className="flex items-center gap-2">
            <CarouselButton
              direction="prev"
              disabled={index === 0}
              onClick={() => goTo(index - 1)}
            />
            <CarouselButton
              direction="next"
              disabled={index === total - 1}
              onClick={() => goTo(index + 1)}
            />
          </div>
        ) : null}
      </div>

      <ul
        ref={scrollerRef}
        className="-mx-1 flex snap-x snap-proximity gap-4 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <li
            key={`${item.kicker}-${item.title}-${i}`}
            id={`${reactId}-slide-${i}`}
            className={`shrink-0 snap-start ${WIDTH[variant]}`}
            aria-hidden={i !== index}
            aria-label={`${i + 1} of ${total}`}
          >
            <CarouselCard item={item} variant={variant} />
          </li>
        ))}
      </ul>

      {total > 1 ? (
        <div className="mt-5 flex justify-center gap-1.5" aria-hidden>
          {items.map((item, i) => (
            <button
              key={`${item.title}-dot-${i}`}
              type="button"
              className={[
                "h-1.5 rounded-full transition-[width,background-color] duration-200",
                i === index
                  ? "w-6 bg-[var(--color-signature)]"
                  : "w-1.5 bg-[rgba(31,29,27,0.18)] hover:bg-[rgba(31,29,27,0.32)]",
              ].join(" ")}
              onClick={() => goTo(i)}
              aria-label={`Go to ${item.title}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CarouselCard({
  item,
  variant,
}: {
  item: GuideCarouselItem;
  variant: NonNullable<GuideCarouselProps["variant"]>;
}) {
  const photo = item.image && hasPhotographicAsset(item.image) ? item.image : null;
  const imageLed = variant === "peek" || variant === "stack";

  if (variant === "peek") {
    return (
      <figure className="flex h-full flex-col">
        {photo ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[0.65rem] bg-[var(--color-guide-surface)]">
            <Image
              src={photo}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 22rem, (min-width: 768px) 40vw, 90vw"
            />
          </div>
        ) : (
          <div className="h-px w-8 bg-[var(--color-signature)]/30" aria-hidden />
        )}
        <figcaption className={photo ? "mt-3.5 flex-1" : "mt-4 flex-1"}>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#A39B95]">
            {item.kicker}
            {item.meta ? ` · ${item.meta}` : ""}
          </p>
          <h3 className="mt-1 font-display text-[1.2rem] leading-[1.25] tracking-tight text-[var(--color-text-primary)]">
            {item.title}
          </h3>
          {item.body ? (
            <p className="mt-1.5 text-[0.875rem] leading-[1.5] text-[var(--color-text-muted)]">
              {item.body}
            </p>
          ) : null}
        </figcaption>
      </figure>
    );
  }

  const copy = (
    <div
      className={
        variant === "split"
          ? "flex min-h-0 flex-1 flex-col justify-center px-6 py-6 md:w-[45%] md:px-7 md:py-8"
          : imageLed
            ? `flex flex-1 flex-col px-5 ${photo ? "py-4" : "py-5"} md:px-5`
            : "flex flex-1 flex-col px-5 pb-6 pt-5 md:px-6"
      }
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#A39B95]">
        {variant === "cover" && !photo ? "Must do" : item.kicker}
      </p>
      <h3
        className={[
          "mt-2 font-display tracking-tight text-[var(--color-text-primary)]",
          variant === "cover"
            ? "mt-3 text-[1.35rem] leading-[1.25] md:text-[1.45rem]"
            : "mt-3 text-[1.45rem] leading-[1.2] md:text-[1.6rem]",
        ].join(" ")}
      >
        {item.title}
      </h3>
      {item.meta ? (
        <p className="mt-1.5 text-sm leading-relaxed text-[#8a827a]">{item.meta}</p>
      ) : null}
      {item.body ? (
        <p className="mt-4 text-[0.925rem] leading-[1.75] text-[var(--color-text-muted)]">
          {item.body}
        </p>
      ) : null}
    </div>
  );

  return (
    <article
      className={[
        "flex h-full overflow-hidden rounded-[1.15rem] border border-[rgba(31,29,27,0.08)] bg-[var(--color-surface)]",
        variant === "split" ? "flex-col md:min-h-[18.5rem] md:flex-row" : "flex-col",
      ].join(" ")}
    >
      {photo ? (
        <div
          className={
            variant === "split"
              ? "relative aspect-[5/4] w-full md:aspect-auto md:w-[55%] md:self-stretch"
              : "relative aspect-[4/3] w-full"
          }
        >
          <Image
            src={photo}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 22rem, (min-width: 768px) 40vw, 90vw"
          />
        </div>
      ) : variant === "cover" ? (
        <div className="px-5 pt-6 md:px-6 md:pt-7" aria-hidden>
          <span className="font-display text-[3.25rem] leading-none text-[rgba(91,58,142,0.16)]">
            {item.kicker}
          </span>
        </div>
      ) : null}
      {copy}
    </article>
  );
}

function CarouselButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(91,58,142,0.22)] bg-transparent text-[var(--color-signature)] transition-colors hover:bg-[var(--color-signature-soft)] disabled:cursor-not-allowed disabled:opacity-35"
    >
      <svg aria-hidden viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
        <path
          d={
            direction === "prev"
              ? "M11.75 4.75L6.5 10l5.25 5.25"
              : "M8.25 4.75L13.5 10l-5.25 5.25"
          }
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
