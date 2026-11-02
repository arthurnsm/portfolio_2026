"use client";

import { useEffect, useState } from "react";
import { HouseIcon, UserIcon, NoteIcon, StudentIcon, PaperPlaneTiltIcon  } from "@phosphor-icons/react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");

  const navLinks = [
    { label: "Início", href: "#about", id: "about", icon: HouseIcon },
    { label: "Sobre Mim", href: "#setup", id: "setup", icon: UserIcon },
    { label: "Projetos", href: "#projects", id: "projects", icon: NoteIcon },
    { label: "Habilidades", href: "#skills", id: "skills", icon: StudentIcon },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["about", "setup", "projects", "skills"];
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Se estiver no final da página, ativa a última seção
      if (scrollY + windowHeight >= documentHeight - 120) {
        setActiveSection("skills");
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

    if (id === "about") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      window.history.pushState(null, "", "#about");
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const navOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <header className="w-full h-14 px-6 sm:px-8 py-3.5 rounded-xl backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.7)] flex items-center justify-between pointer-events-auto transition-all">
      {/* Brand / Logo */}
      <a 
        href="#about" 
        onClick={(e) => handleClick(e, "about")}
        className="group flex items-center gap-2 font-title font-bold text-[17px] sm:text-[19px] tracking-tight text-white hover:opacity-90 transition-opacity"
      >
        <span className="font-mono text-[#00ff41] text-[15px] opacity-75">&lt;</span>
        <span className="tracking-wider">AR</span>
        <span className="font-mono text-[#00ff41] text-[15px] opacity-75">/&gt;</span>
      </a>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-2 lg:gap-3">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeSection === link.id;

          return (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.id)}
              className={`flex items-center py-1.5 px-3 rounded-lg  transition-all duration-300 relative group cursor-pointer ${
                isActive
                  ? "bg-zinc-800/80 border-zinc-700/70 text-white "
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
      <div className="flex items-center">
        <a
          href="#contact"
          onClick={(e) => handleClick(e, "contact")}
          className="group/btn inline-flex items-center font-geist px-5 py-2 rounded-xl border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-zinc-900 duration-200 transition-colors text-[15px] tracking-wider transition-all cursor-pointer font-medium"
        >
          <span className="hidden sm:flex items-center gap-2">
            Entrar em contato
            <div className="relative overflow-hidden w-5 h-5 flex items-center justify-center shrink-0">
              <PaperPlaneTiltIcon
                size={18}
                className="transition-transform duration-200 ease-out group-hover/btn:transition-none group-hover/btn:animate-plane-fly will-change-transform"
              />
            </div>
          </span>
          <span className="sm:hidden flex items-center gap-1.5">
            CONTATO
            <div className="relative overflow-hidden w-4 h-4 flex items-center justify-center shrink-0">
              <PaperPlaneTiltIcon
                size={15}
                className="transition-transform duration-200 ease-out group-hover/btn:transition-none group-hover/btn:animate-plane-fly will-change-transform"
              />
            </div>
          </span>
        </a>
      </div>
    </header>
  );
}
