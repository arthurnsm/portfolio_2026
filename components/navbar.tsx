"use client";

export default function Navbar() {
  const navLinks = [
    { label: "INÍCIO", href: "#about" },
    { label: "SETUP", href: "#setup" },
    { label: "PROJETOS", href: "#projects" },
    { label: "HABILIDADES", href: "#skills" },
  ];

  return (
    <header className="w-full h-16 px-6 sm:px-8 py-3.5 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800/80 shadow-[0_12px_40px_rgba(0,0,0,0.7)] flex items-center justify-between pointer-events-auto transition-all">
      {/* Brand / Logo */}
      <a 
        href="#about" 
        className="group flex items-center gap-2 font-title font-bold text-[17px] sm:text-[19px] tracking-tight text-white hover:opacity-90 transition-opacity"
      >
        <span className="font-mono text-[#00ff41] text-[15px] opacity-75">&lt;</span>
        <span className="tracking-wider">Arthur Roberto</span>
        <span className="font-mono text-[#00ff41] text-[15px] opacity-75">/&gt;</span>
      </a>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-12 lg:gap-16">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-geist font-medium text-[17px] tracking-widest text-zinc-400 hover:text-white transition-colors relative py-1 group"
          >
            {link.label}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00ff41] shadow-[0_0_8px_#00ff41] transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </nav>

      {/* Right CTA / Action */}
      <div className="flex items-center gap-3">
        <a
          href="#contact"
          className="inline-flex items-center font-geist px-5 py-2 rounded-lg border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-zinc-900 duration-200 transition-colors text-[15px] tracking-wider transition-all cursor-pointer font-medium"
        >
          <span className="hidden sm:inline">Entrar em contato</span>
          <span className="sm:hidden">CONTATO</span>
        </a>
      </div>
    </header>
  );
}
