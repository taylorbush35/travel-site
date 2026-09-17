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
      <div
        ref={stuckSentinelRef}
        className="pointer-events-none h-px w-full shrink-0"
        aria-hidden
      />
      <nav
        aria-label="On this page"
        className={[
          "sticky top-2 z-20 mb-8 md:top-3 md:mb-10",
          "transition-[opacity,transform] duration-500 ease-out",
          revealed ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-center gap-2 overflow-hidden rounded-xl px-2 py-1.5 md:gap-3 md:px-3 md:py-1.5",
            "bg-[rgba(40,37,34,0.94)] shadow-[0_8px_22px_rgba(31,29,27,0.14)]",
            "transition-[box-shadow,background-color] duration-300 ease-out",
            isStuck
              ? "bg-[rgba(34,32,29,0.96)] shadow-[0_10px_28px_rgba(31,29,27,0.2)]"
              : "",
          ].join(" ")}
        >
          <p className="hidden shrink-0 px-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-[#9c968e] md:block">
            On this page
          </p>
          <div className="min-w-0 flex-1 overflow-x-auto md:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <ul className="flex w-max gap-0.5 md:w-auto md:flex-wrap">
              {COUNTRY_GUIDE_NAV_ITEMS.map(({ id, label }) => {
                const active = activeId === id;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(id)}
                      className={[
                        "whitespace-nowrap rounded-full px-2.5 py-1.5 text-[10px] uppercase tracking-[0.12em] md:px-3 md:text-[10px]",
                        "transition-colors duration-200 ease-out",
                        active
                          ? "bg-[rgba(235,228,244,0.2)] font-medium text-[#f3edf8]"
                          : "font-medium text-[#c5bfb7] hover:bg-white/[0.06] hover:text-[#f5f4f2]",
                      ].join(" ")}
                    >
                      {label}
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
