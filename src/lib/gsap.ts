"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register GSAP plugins once (client-only). */
export function registerGsap() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  registered = true;
}

export { gsap, useGSAP, ScrollTrigger };
