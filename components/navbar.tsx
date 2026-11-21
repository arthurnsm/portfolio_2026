"use client";

import { useEffect, useRef, useState } from "react";
import {
  HouseIcon,
  UserIcon,
  NoteIcon,
  GitBranchIcon,
  PaperPlaneTiltIcon,
} from "@phosphor-icons/react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node))
        setMenuOpen(false);
    };
    const breakpoint = window.matchMedia("(min-width: 768px)");
    const closeOnResize = () => {
      if (breakpoint.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    breakpoint.addEventListener("change", closeOnResize);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      breakpoint.removeEventListener("change", closeOnResize);
    };
  }, [menuOpen]);

  const [activeSection, setActiveSection] = useState("about");

  const navLinks = [
    { label: "Início", href: "#about", id: "about", icon: HouseIcon },
    { label: "Sobre Mim", href: "#setup", id: "setup", icon: UserIcon },
    { label: "Projetos", href: "#projects", id: "projects", icon: NoteIcon },
    { label: "GitHub", href: "#github", id: "github", icon: GitBranchIcon },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        "about",
        "setup",
        "projects",
        "experience",
        "github",
        "contact",
      ];
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Se estiver no final da página, ativa a última seção
      if (scrollY + windowHeight >= documentHeight - 120) {
        setActiveSection("contact");
        return;
      }

      const threshold = windowHeight * 0.35;
      let current = "about";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold && rect.bottom > threshold) {
            current = id;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setMenuOpen(false);

    if (id === "about") {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      window.history.pushState(null, "", "#about");
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const navOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <header
      ref={headerRef}
      className="relative w-full min-h-16 md:min-h-14 px-3 sm:px-5 md:px-6 py-2 rounded-xl backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.7)] flex items-center justify-between pointer-events-auto transition-all"
    >
      {/* Brand / Logo */}
      <a
        href="#about"
        onClick={(e) => handleClick(e, "about")}
        aria-label="Arthur Roberto — início"
        className="group min-h-11 shrink-0 flex items-center gap-2 font-title font-bold text-[17px] sm:text-[19px] tracking-tight text-white hover:opacity-90 transition-opacity"
      >
        <span className="font-mono text-[#BFA8FF] text-[15px] opacity-75">
          &lt;
        </span>
        <span className="tracking-wider">AR</span>
        <span className="font-mono text-[#BFA8FF] text-[15px] opacity-75">
          /&gt;
        </span>
      </a>

      {/* Navigation Links */}
      <nav
        aria-label="Navegação principal"
        className="hidden md:flex items-center gap-1 lg:gap-2"
      >
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeSection === link.id;

          return (
            <a
              key={link.label}
              aria-current={isActive ? "location" : undefined}
              aria-label={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.id)}
              className={`flex min-h-11 items-center py-1.5 px-3 rounded-lg  transition-all duration-300 relative group cursor-pointer ${
                isActive
                  ? "bg-zinc-100/10 border-zinc-700/70 text-white trampare "
                  : "border-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/40"
              }`}
            >
              <Icon
                size={20}
                className={`transition-colors duration-300 shrink-0 ${
                  isActive ? "" : "text-zinc-400 "
                }`}
              />
              <span
                className={`font-geist text-[16px] tracking-wide overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
                  isActive
                    ? "max-w-[140px] opacity-100 ml-2 font-medium"
                    : "max-w-0 opacity-0 group-hover:max-w-[140px] group-hover:opacity-100 group-hover:ml-2 font-light"
                }`}
              >
                {link.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Right CTA / Action */}
      <div className="flex items-center gap-1 sm:gap-2">
        <a
          href="#contact"
          onClick={(e) => handleClick(e, "contact")}
          className="group/btn inline-flex items-center font-geist min-h-11 px-3 md:px-4 py-2 rounded-xl border border-[#BFA8FF] text-[#BFA8FF] hover:bg-[#BFA8FF] hover:text-zinc-900 duration-200 transition-colors text-[15px] tracking-wider transition-all cursor-pointer font-medium"
        >
          <span className="hidden lg:flex items-center gap-2">
            Entrar em contato
            <div className="relative overflow-hidden w-5 h-5 flex items-center justify-center shrink-0">
              <PaperPlaneTiltIcon
                size={18}
                className="transition-transform duration-200 ease-out group-hover/btn:transition-none group-hover/btn:animate-plane-fly will-change-transform"
              />
            </div>
          </span>
          <span className="lg:hidden flex items-center gap-1.5">
            Contato
            <div className="relative overflow-hidden w-4 h-4 flex items-center justify-center shrink-0">
              <PaperPlaneTiltIcon
                size={15}
                className="transition-transform duration-200 ease-out group-hover/btn:transition-none group-hover/btn:animate-plane-fly will-change-transform"
              />
            </div>
          </span>
        </a>
        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden min-h-11 min-w-11 flex items-center justify-center rounded-lg text-zinc-100 hover:bg-zinc-800 border border-zinc-700"
        >
          <svg
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <path d="m6 6 12 12M6 18 18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Navegação móvel"
        hidden={!menuOpen}
        className="md:hidden absolute top-full mt-2 left-0 right-0 p-2 rounded-xl border border-zinc-800 bg-zinc-950 backdrop-blur-md shadow-xl max-h-[70svh] overflow-y-auto"
      >
        {navLinks.map(({ label, href, id, icon: Icon }) => (
          <a
            key={id}
            href={href}
            onClick={(event) => handleClick(event, id)}
            aria-current={activeSection === id ? "location" : undefined}
            className={`flex items-center gap-3 min-h-12 px-4 py-3 rounded-lg font-geist text-base ${activeSection === id ? "bg-zinc-800 text-[#BFA8FF]" : "text-zinc-300 hover:bg-zinc-800"}`}
          >
            <Icon size={21} aria-hidden="true" />
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
