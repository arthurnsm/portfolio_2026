"use client";

import { useState, useEffect } from "react";

interface TerminalIntroProps {
  onComplete: () => void;
}

const asciiArt = [
  "  __      __       .__                                  __                                                 __    _____      .__  .__        ",
  "/  \\    /  \\ ____ |  |   ____  ____   _____   ____   _/  |_  ____     _____ ___.__. ______   ____________/  |__/ ____\\____ |  | |__| ____  ",
  "\\   \\/\\/   // __ \\|  | _/ ___\\/  _ \\ /     \\_/ __ \\  \\   __\\/  _ \\   /     <   |  | \\____ \\ /  _ \\_  __ \\   __\\   __\\/  _ \\|  | |  |/  _ \\ ",
  " \\        /\\  ___/|  |_\\  \\__(  <_> )  Y Y  \\  ___/   |  | (  <_> ) |  Y Y  \\___  | |  |_> >  <_> )  | \\/|  |  |  | (  <_> )  |_|  (  <_> )",
  "  \\__/\\  /  \\___  >____/\\___  >____/|__|_|  /\\___  >  |__|  \\____/  |__|_|  / ____| |   __/ \\____/|__|   |__|  |__|  \\____/|____/__|\\____/ ",
  "       \\/       \\/          \\/            \\/     \\/                       \\/\\/      |__|                                                   "
];

const scriptLines = [
  "root@host:~$ ./portfolio.sh --env=production --force",
  "[INIT] Loading kernel modules: x86_64-matrix-core-v5.4...",
  "[OK] Memory allocation: 32768MB VRAM / 65536MB RAM synchronized.",
  "[OK] Establishing encrypted tunnel: TLS 1.3 / RSA-4096 cipher...",
  "[OK] Neural connection handshake verified with node: 127.0.0.1:8080.",
  "[INFO] Fetching repository packages: origin/main...",
  "[OK] 142 objects unpacked. 0 conflicts detected.",
  "[OK] Verifying tech stack: Next.js 16, React 19, TypeScript 5, Tailwind 4...",
  "[OK] Compiling optimized client & server runtime bundles...",
  "[SEC] Decrypting portfolio database & credentials payload...",
  "Loading assets & visual shaders:",
  "LOADER",
  "[OK] Interface hydrated successfully (0ms latency).",
  "[OK] WebGL terminal visual engine online.",
  "",
  ...asciiArt,
  "",
  "Initialization completed. Launching workspace environment..."
];

export default function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 1200);
    return () => clearInterval(cursorInterval);
  }, []);

  // Main typing & execution loop
  useEffect(() => {
    if (currentLineIndex >= scriptLines.length) {
      // Trigger pure fade-out transition after brief completion pause
      const finishTimeout = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete();
        }, 500); // Wait for fade-out duration
      }, 400);
      return () => clearTimeout(finishTimeout);
    }

    const currentLine = scriptLines[currentLineIndex];

    // Handle interactive terminal loader
    if (currentLine === "LOADER") {
      if (loaderProgress < 40) {
        const timeout = setTimeout(() => {
          setLoaderProgress((prev) => prev + 1);
        }, Math.random() * 6 + 2); // Ultra fast loader progression
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + `[${"#".repeat(40)}] 100% Complete\n`);
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 40);
        return () => clearTimeout(timeout);
      }
    }

    // Fast line printing for ASCII art
    const isAsciiLine = asciiArt.includes(currentLine);

    if (isAsciiLine) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentLine + "\n");
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 15);
      return () => clearTimeout(timeout);
    }

    // Ultra fast typing effect for regular terminal lines
    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentLine[currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      }, Math.random() * 4 + 1); // 1-5ms per character
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + "\n");
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, Math.random() * 20 + 10); // Quick line break delay
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, loaderProgress, onComplete]);

  const currentLine = scriptLines[currentLineIndex];
  const isLoaderRunning = currentLine === "LOADER";

  // Current rendering text including active loader
  const renderCurrentContent = () => {
    if (isLoaderRunning) {
      const totalBars = 40;
      const filled = "#".repeat(loaderProgress);
      const empty = "-".repeat(totalBars - loaderProgress);
      const pct = Math.floor((loaderProgress / totalBars) * 100);
      return `${displayedText}[${filled}${empty}] ${pct}%`;
    }
    return displayedText;
  };

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black text-[#00ff41] p-4 sm:p-6 md:p-8 flex flex-col justify-start select-none overflow-x-auto transition-opacity duration-500 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        fontFamily: 'var(--font-vt323), monospace',
        textShadow: "0 0 6px rgba(0, 255, 65, 0.65)"
      }}
    >
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleSkip}
          className="text-xs sm:text-sm border border-[#00ff41]/40 px-3 py-1 text-[#00ff41]/70 hover:text-[#00ff41] hover:border-[#00ff41] transition-colors rounded cursor-pointer tracking-wider"
        >
          [ ESC / PULAR ]
        </button>
      </div>

      <main className="w-full flex-1">
        <pre className="font-mono whitespace-pre leading-[1.08] text-[clamp(9px,1.08vw,21px)] tracking-tight">
          {renderCurrentContent()}
          <span 
            className={`inline-block w-[0.6em] h-[1.1em] bg-[#00ff41] align-middle ml-0.5 ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
            style={{ boxShadow: "0 0 8px #00ff41" }}
          ></span>
        </pre>
      </main>
    </div>
  );
}
