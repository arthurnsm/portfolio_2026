"use client";

import { useEffect, useRef, useState } from "react";

interface TypingTitleProps {
  text: string;
  className?: string;
  showPrefix?: boolean;
}

export default function TypingTitle({ text, className = "", showPrefix = true }: TypingTitleProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 } // Start typing when 50% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, 60); // Speed of typing

    return () => clearInterval(interval);
  }, [hasStarted, text]);

  return (
    <h2 ref={containerRef} className={`flex items-center flex-wrap gap-2 sm:gap-3 ${className}`}>
      {showPrefix }
      <span className="inline-flex items-center">
        {displayedText}
        <span 
          className="inline-block bg-[#00ff41] ml-2 sm:ml-3 animate-blink" 
          style={{ width: '0.45em', height: '0.9em', transform: 'translateY(2px)' }}
        />
      </span>
    </h2>
  );
}
