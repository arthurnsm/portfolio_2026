"use client";

import { useEffect, useRef } from "react";
import styles from "./TypingTitle.module.css";

interface TypingTitleProps {
  text: string;
  className?: string;
}

/** Readable immediately; only a brief terminal marker animates on entry. */
export default function TypingTitle({
  text,
  className = "",
}: TypingTitleProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (
      !heading ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    delete heading.dataset.entered;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        heading.dataset.entered = "true";
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    observer.observe(heading);
    return () => observer.disconnect();
  }, [text]);

  return (
    <h2
      ref={headingRef}
      className={`${styles.heading} min-w-0 leading-snug ${className}`}
    >
      {text}
    </h2>
  );
}
