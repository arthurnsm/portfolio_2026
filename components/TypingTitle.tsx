"use client";

import { useEffect, useRef, useState } from "react";

interface TypingTitleProps {
  text: string;
  className?: string;
}

export default function TypingTitle({ text, className = "" }: TypingTitleProps) {
  const [displayedText, setDisplayedText] = useState(text);
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      setDisplayedText("");
      let index = 0;
      interval = setInterval(() => {
        index += 1;
        setDisplayedText(text.slice(0, index));
        if (index >= text.length) clearInterval(interval);
      }, 60);
    }, { threshold: 0.25 });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [text]);

  return (
    <h2 ref={containerRef} aria-label={text} className={`min-w-0 leading-snug ${className}`}>
      <span aria-hidden="true" className="relative block">
        {/* Reserve the complete heading's height so typing never shifts the layout. */}
        <span className="invisible">{text}<span className="inline-block w-[0.45em] ml-2 sm:ml-3" /></span>
        <span className="absolute inset-0 motion-reduce:hidden">
          {displayedText}<span className="inline-block bg-[#00ff41] ml-2 sm:ml-3 animate-blink w-[0.45em] h-[0.9em] align-baseline" />
        </span>
        <span className="absolute inset-0 hidden motion-reduce:block">{text}</span>
      </span>
    </h2>
  );
}
