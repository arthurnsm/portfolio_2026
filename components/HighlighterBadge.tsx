import React from "react";

interface HighlighterBadgeProps {
  text: string;
  className?: string;
}

export default function HighlighterBadge({ text, className = "" }: HighlighterBadgeProps) {
  return (
    <div
      className={`relative inline-block w-fit mt-3 rounded-[2rem_0.6rem_1.4rem_0.8rem/1.6rem_0.5rem_1rem_0.7rem] select-none cursor-default overflow-hidden ${className}`}
    >
      {/* Base Layer: Low-opacity text waiting to be highlighted */}
      <div className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-[0.75rem] ">
        <span className="text-zinc-500/40 text-xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-subtitle font-black tracking-tight block whitespace-nowrap">
          {text}
        </span>
      </div>

      {/* Highlighter Layer: Green highlighter overlay that sweeps across once on startup */}
      <div
        className="absolute inset-0 bg-[#00ff41] bg-opacity-70 px-4 py-1.5 sm:px-5 sm:py-2 rounded-[0.75rem] overflow-hidden flex items-center shadow-[0_0_20px_rgba(0,255,65,0.25)] animate-highlighter [animation-delay:600ms]"
        style={{
          clipPath: "polygon(0% 0%, 0% 0%, -7% 100%, 0% 100%)",
        }}
      >
        <span className="text-black text-xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-subtitle font-black tracking-tight block whitespace-nowrap">
          {text}
        </span>
      </div>
    </div>
  );
}
