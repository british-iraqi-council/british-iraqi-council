"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ParallaxProps } from "./parallax-props";

const SCALE = 1.12;
const CONDITIONS =
  "(prefers-reduced-motion: no-preference) and (pointer: fine)";

export default function Parallax({
  children,
  className = "",
  from = -5,
  to = 5,
  start = "top bottom",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const layer = ref.current;
      const frame = layer?.parentElement;
      if (!layer || !frame) return;

      const media = gsap.matchMedia();
      media.add(CONDITIONS, () => {
        gsap.fromTo(
          layer,
          { yPercent: from, scale: SCALE },
          {
            yPercent: to,
            scale: SCALE,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start,
              end: "bottom top",
              scrub: true,
              onToggle: (self) => {
                layer.style.willChange = self.isActive ? "transform" : "";
              },
            },
          },
        );
        return () => {
          layer.style.willChange = "";
        };
      });

      return () => media.revert();
    },
    { scope: ref, dependencies: [from, to, start] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
