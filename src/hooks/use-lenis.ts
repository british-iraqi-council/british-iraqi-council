"use client";

import { useContext } from "react";
import type Lenis from "lenis";
import { LenisContext } from "@/lib/lenis-context";

export default function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
