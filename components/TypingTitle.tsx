"use client";

import { useEffect, useRef } from "react";

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
      className={`relative after:pointer-events-none after:absolute after:bottom-[-0.15em] after:left-0 after:h-0.5 after:w-[0.65em] after:bg-[#00ff41] after:opacity-0 after:content-[''] data-[entered=true]:after:animate-[terminal-mark_220ms_steps(3,end)_both] motion-reduce:data-[entered=true]:after:animate-none min-w-0 leading-snug ${className}`}
    >
      {text}
    </h2>
  );
}
