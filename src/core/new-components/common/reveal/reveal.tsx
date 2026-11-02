"use client";

import { createElement, useRef } from "react";
import type { HTMLAttributes, RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks";
import { RevealProps, RevealVariant } from "./reveal-props";

const RISE = 24;
const ZOOM = 1.04;
const ROOT_MARGIN = "100000px 0px -8% 0px";
const STEP: Record<RevealVariant, number> = {
  rise: 0,
  frame: 0,
  sequence: 0.1,
  stagger: 0.08,
};

const childrenOf = (element: HTMLElement) =>
  Array.from(element.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );

const isRule = (element: HTMLElement) =>
  element.getAttribute("data-reveal") === "rule";

const zoomsIn = (element: HTMLElement) =>
  Array.from(element.querySelectorAll<HTMLElement>("[data-reveal-zoom]"));

const drawsIn = (element: HTMLElement) =>
  Array.from(element.querySelectorAll<HTMLElement>("[data-reveal-draw]"));

export default function Reveal({
  as = "div",
  variant = "rise",
  delay = 0,
  className,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    (_context, contextSafe) => {
      const root = ref.current;
      if (!root || reduced || !contextSafe) return;

      const triggers = variant === "stagger" ? childrenOf(root) : [root];
      const itemsOf = (trigger: HTMLElement) =>
        variant === "sequence" ? childrenOf(root) : [trigger];
      const fold = window.innerHeight;
      const pending = triggers.filter(
        (trigger) => trigger.getBoundingClientRect().top >= fold,
      );
      if (pending.length === 0) return;

      pending.flatMap(itemsOf).forEach((item) => {
        if (isRule(item)) {
          gsap.set(item, { scaleX: 0 });
        } else {
          gsap.set(
            item,
            variant === "frame" ? { opacity: 0 } : { opacity: 0, y: RISE },
          );
        }
        const zooms = zoomsIn(item);
        if (zooms.length > 0) gsap.set(zooms, { scale: ZOOM });
        const draws = drawsIn(item);
        if (draws.length > 0) gsap.set(draws, { scaleY: 0 });
      });

      const show = contextSafe((entering: HTMLElement[], instant: boolean) => {
        const items = entering.flatMap(itemsOf);
        const extras = items.flatMap((item) => [
          ...zoomsIn(item),
          ...drawsIn(item),
        ]);
        const finish = () =>
          gsap.set([...items, ...extras], { clearProps: "opacity,transform" });

        if (instant) {
          finish();
          return;
        }

        const timeline = gsap.timeline({ delay, onComplete: finish });
        items.forEach((item, index) => {
          const at = index * STEP[variant];
          if (isRule(item)) {
            timeline.to(
              item,
              { scaleX: 1, duration: 0.9, ease: "expo.out" },
              at + 0.05,
            );
          } else {
            timeline.to(
              item,
              {
                opacity: 1,
                y: 0,
                duration: variant === "frame" ? 1 : 0.9,
                ease: "power3.out",
              },
              at,
            );
          }
          const itemZooms = zoomsIn(item);
          if (itemZooms.length > 0) {
            timeline.to(
              itemZooms,
              { scale: 1, duration: 1.1, ease: "expo.out" },
              at,
            );
          }
          const itemDraws = drawsIn(item);
          if (itemDraws.length > 0) {
            timeline.to(
              itemDraws,
              { scaleY: 1, duration: 1.1, ease: "expo.out" },
              at + 0.2,
            );
          }
        });
      });

      const observer = new IntersectionObserver(
        (entries) => {
          const entering = entries
            .filter((entry) => entry.isIntersecting)
            .map((entry) => entry.target);
          if (entering.length === 0) return;
          entering.forEach((target) => observer.unobserve(target));
          const ordered = pending.filter((trigger) =>
            entering.includes(trigger),
          );
          const passed = ordered.filter(
            (trigger) => trigger.getBoundingClientRect().bottom <= 0,
          );
          const arriving = ordered.filter(
            (trigger) => !passed.includes(trigger),
          );
          if (passed.length > 0) show(passed, true);
          if (arriving.length > 0) show(arriving, false);
        },
        { rootMargin: ROOT_MARGIN },
      );

      pending.forEach((trigger) => observer.observe(trigger));
      return () => observer.disconnect();
    },
    {
      scope: ref,
      dependencies: [reduced, variant, delay],
      revertOnUpdate: true,
    },
  );

  return createElement(
    as,
    {
      ref,
      className,
      "data-reveal-root": "",
      ...rest,
    } as HTMLAttributes<HTMLElement> & {
      ref: RefObject<HTMLElement | null>;
    },
    children,
  );
}
