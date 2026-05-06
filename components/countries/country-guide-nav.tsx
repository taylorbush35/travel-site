"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { COUNTRY_GUIDE_NAV_ITEMS } from "@/lib/country-guide-nav-config";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function CountryGuideNav() {
  const [activeId, setActiveId] = useState<string>(
    COUNTRY_GUIDE_NAV_ITEMS[0]?.id ?? "overview",
  );
  const [revealed, setRevealed] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const stuckSentinelRef = useRef<HTMLDivElement>(null);

  const updateActiveFromScroll = useCallback(() => {
    const items = COUNTRY_GUIDE_NAV_ITEMS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return { id, top: Number.POSITIVE_INFINITY };
      const rect = el.getBoundingClientRect();
      return { id, top: rect.top };
    });

    const line = window.innerHeight * 0.38;
    let current: string = COUNTRY_GUIDE_NAV_ITEMS[0]?.id ?? "overview";
    for (const { id, top } of items) {
      if (top <= line + 72) current = id;
    }
    setActiveId(current);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setRevealed(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const sentinel = stuckSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      { threshold: [0], rootMargin: "0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    updateActiveFromScroll();
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveFromScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateActiveFromScroll]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  return (
    <>
      {/* When this leaves the viewport, the sticky nav is pinned */}
      <div
        ref={stuckSentinelRef}
        className="pointer-events-none h-px w-full shrink-0"
        aria-hidden
      />
      <nav
        aria-label="On this page"
        className={[
          "sticky top-3 z-20 mb-10 md:top-5 md:mb-12",
          "transition-[opacity,transform] duration-500 ease-out",
          revealed ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        ].join(" ")}
      >
        <div
          className={[
            "rounded-2xl border px-3 py-3 backdrop-blur-xl md:px-4 md:py-3.5",
            "transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-out",
            /* Warm charcoal — darker than page canvas (#faf9f7), still soft */
            "border-white/[0.1] bg-[rgba(44,41,38,0.94)] shadow-[0_12px_36px_rgba(0,0,0,0.2)]",
            isStuck
              ? "border-white/[0.12] bg-[rgba(36,33,31,0.96)] shadow-[0_18px_50px_rgba(0,0,0,0.26)] backdrop-blur-2xl"
              : "",
          ].join(" ")}
        >
          <p className="mb-2.5 px-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#a39d96]">
            On this page
          </p>
          <div className="-mx-1 overflow-x-auto px-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:overflow-visible [&::-webkit-scrollbar]:hidden">
            <ul className="flex w-max min-w-full flex-nowrap gap-1 sm:w-auto sm:flex-wrap sm:gap-x-1 sm:gap-y-2">
              {COUNTRY_GUIDE_NAV_ITEMS.map(({ id, label }) => {
                const active = activeId === id;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(id)}
                      className={[
                        "flex items-center gap-2 rounded-full px-3 py-2 text-left text-[10px] uppercase tracking-[0.14em] sm:py-1.5 sm:text-[11px]",
                        "transition-[color,background-color,transform,box-shadow,font-weight] duration-200 ease-out",
                        "motion-reduce:transition-colors motion-reduce:hover:translate-y-0",
                        active
                          ? [
                              "bg-[rgba(235,228,244,0.22)] font-semibold text-[#f2ecf8]",
                              "shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(0,0,0,0.22)]",
                              "ring-1 ring-inset ring-[rgba(200,180,235,0.35)]",
                            ].join(" ")
                          : [
                              "font-medium text-[#c9c3bb]",
                              "hover:translate-y-[-2px] hover:bg-white/[0.08] hover:text-[#f5f4f2]",
                            ].join(" "),
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "h-1 w-1 shrink-0 rounded-full transition-colors duration-200",
                          active
                            ? "bg-[#c9b8e8] shadow-[0_0_0_1px_rgba(200,180,235,0.45)]"
                            : "bg-white/35",
                        ].join(" ")}
                        aria-hidden
                      />
                      <span className="whitespace-nowrap">{label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
