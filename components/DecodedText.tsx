"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./DecodedText.module.css";

interface DecodedTextProps {
  text: string;
  className?: string;
  /** Short offset lets the name resolve before the role. */
  delay?: number;
}

const GLYPHS = "01<>/_-+*";
const DURATION = 680;

/** A brief terminal decode; the original text always determines layout and meaning. */
export default function DecodedText({
  text,
  className = "",
  delay = 0,
}: DecodedTextProps) {
  const [displayedText, setDisplayedText] = useState(text);
  const frameRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const lastRunRef = useRef(-Infinity);

  const decode = useCallback(() => {
    if (
      runningRef.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const now = performance.now();
    // A hover across the title should read as one interaction, not repeated noise.
    if (now - lastRunRef.current < 1200) return;
    lastRunRef.current = now;
    runningRef.current = true;
    const startedAt = now;
    let previousStep = -1;

    const tick = (timestamp: number) => {
      const elapsed = timestamp - startedAt;
      const progress = Math.min(elapsed / DURATION, 1);
      const step = Math.floor(elapsed / 45);
      if (progress >= 1 || document.hidden) {
        setDisplayedText(text);
        runningRef.current = false;
        frameRef.current = null;
        return;
      }
      if (step !== previousStep) {
        previousStep = step;
        const resolved = Math.floor(progress * (text.length + 3));
        setDisplayedText(
          Array.from(text, (character, index) => {
            if (/\s/.test(character) || index < resolved) return character;
            // Only the short leading edge scrambles; the rest stays readable.
            if (index > resolved + 2) return character;
            return GLYPHS[(index * 3 + step) % GLYPHS.length];
          }).join(""),
        );
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => {
    const timer = window.setTimeout(decode, 180 + delay);
    return () => {
      window.clearTimeout(timer);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      runningRef.current = false;
    };
  }, [decode, delay]);

  const parts = Array.from(text.matchAll(/\S+|\s+/g));
  return (
    <span
      className={`${styles.root} ${className}`}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") decode();
      }}
    >
      <span className={styles.accessible}>{text}</span>
      <span aria-hidden="true">
        {parts.map((match) => {
          const part = match[0];
          const start = match.index;
          if (/^\s+$/.test(part)) return part;
          return (
            <span key={start} className={styles.word}>
              <span className={styles.measure}>{part}</span>
              <span className={styles.effect}>
                {displayedText.slice(start, start + part.length)}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
