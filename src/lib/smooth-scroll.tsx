"use client";

import { ReactNode, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks";
import { LenisContext } from "./lenis-context";

const ANCHOR_TARGET = "data-anchor-target";

const isPlainClick = (event: MouseEvent) =>
  !event.defaultPrevented &&
  event.button === 0 &&
  !event.metaKey &&
  !event.ctrlKey &&
  !event.shiftKey &&
  !event.altKey;

const samePageTarget = (event: MouseEvent): HTMLElement | null => {
  if (!(event.target instanceof Element)) return null;
  const link = event.target.closest("a[href]");
  if (!(link instanceof HTMLAnchorElement)) return null;
  if (link.target && link.target !== "_self") return null;
  const url = new URL(link.href);
  const here = window.location;
  if (
    !url.hash ||
    url.origin !== here.origin ||
    url.pathname !== here.pathname ||
    url.search !== here.search
  ) {
    return null;
  }
  return document.getElementById(decodeURIComponent(url.hash.slice(1)));
};

const focusTarget = (target: HTMLElement) => {
  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1");
    target.setAttribute(ANCHOR_TARGET, "");
    target.addEventListener(
      "blur",
      () => {
        target.removeAttribute("tabindex");
        target.removeAttribute(ANCHOR_TARGET);
      },
      { once: true },
    );
  }
  target.focus({ preventScroll: true });
};

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    if (reduced) {
      return () => window.removeEventListener("load", refresh);
    }

    const instance = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      stopInertiaOnNavigate: true,
    });

    instance.on("scroll", () => ScrollTrigger.update());

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (event: MouseEvent) => {
      if (!isPlainClick(event)) return;
      const target = samePageTarget(event);
      if (!target) return;
      event.preventDefault();
      const hash = `#${encodeURIComponent(target.id)}`;
      if (window.location.hash !== hash) {
        window.history.pushState(window.history.state, "", hash);
      }
      instance.scrollTo(target);
      focusTarget(target);
    };
    window.addEventListener("click", onClick);

    const lateRefresh = setTimeout(refresh, 1200);
    setLenis(instance);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("click", onClick);
      clearTimeout(lateRefresh);
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
