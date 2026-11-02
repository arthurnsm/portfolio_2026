"use client";

import WireframeGlobe from "@/components/WireframeGlobe";
import WireframeMonitor from "@/components/WireframeMonitor";
import Navbar from "@/components/navbar";
import { BsGithub } from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa";
import Socialmedia from "@/components/socialmedia";
import Stack from "@/components/stack";
import TypingTitle from "@/components/TypingTitle";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-zinc-100 flex flex-col font-body selection:bg-[#00ff41] selection:text-black overflow-x-hidden relative">
      {/* Top Mask Overlay with Gradient */}
      <div 
        className="fixed top-0 left-0 right-0 h-[110px] z-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #0a0a0a 0px, #0a0a0a 50px, transparent 100%)"
        }}
      />

      {/* Floating Top Navigation Bar */}
      <div className="fixed top-[20px] left-0 right-0 z-50 flex justify-center px-6 sm:px-12 md:px-20 lg:px-[144px] pointer-events-none">
        <Navbar />
      </div>

      {/* Main Portfolio Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Hero Section - Full Screen with Balanced 3D Globe */}
        <section id="about" className="w-full min-h-screen flex items-center justify-between px-6 sm:px-12 md:px-20 lg:px-[144px] pt-24 pb-12 lg:py-0 relative overflow-hidden scroll-mt-24">
          {/* Permanent Subtle Grid Background (Layered at z-0 so it is always 100% visible) */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div 
              className="w-full h-full opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0, 255, 65, 0.16) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0, 255, 65, 0.16) 1px, transparent 1px)
                `,
                backgroundSize: "44px 44px",
              }}
            />
            {/* Smooth Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_20%,#0a0a0a_88%)]" />
          </div>

          {/* Subtle Matrix glow backdrop */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3/5 h-4/5 bg-[#00ff41]/5 rounded-full blur-3xl z-0 pointer-events-none" />

          {/* Left Column (Content) */}
          <div className="w-full lg:w-[62%] xl:w-[64%] flex flex-col items-start justify-center gap-7 z-20 py-10 lg:py-0 pointer-events-auto lg:mt-20 mt-10">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-[6.2rem] 2xl:text-[7rem] font-title font-bold tracking-tight text-white leading-[1.06] opacity-0 animate-fade-in-up">
              <span className="block">Arthur Roberto</span>
              <div className="bg-[#00ff41] block w-fit px-4 py-1.5 sm:px-5 sm:py-2 mt-3 rounded-sm">
                <span className="text-black text-2xl sm:text-4xl lg:text-5xl font-subtitle font-black tracking-tight block">
                  Desenvolvedor Full Stack
                </span>
              </div>
            </h1>
            <div className="flex flex-wrap gap-3.5 mb-2 opacity-0 animate-fade-in-up [animation-delay:150ms]">
              <Stack name="ReactJS"/>
              <Stack name="NextJS"/>
              <Stack name="TailwindCSS"/>
              <Stack name="Typescript"/>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-[1.55rem] font-body text-zinc-400 max-w-2xl xl:max-w-3xl leading-relaxed opacity-0 animate-fade-in-up [animation-delay:300ms]">
              Construo interfaces web modernas de alta fidelidade com React, Next.js e TypeScript, unindo precisão visual em UI/UX a arquiteturas robustas e performáticas.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-16 sm:pt-24 opacity-0 animate-fade-in-up [animation-delay:450ms]">
              <a 
                href="#projects"
                className="px-8 py-4 sm:px-10 sm:py-4.5 rounded-xl bg-[#00ff41] text-black font-title font-bold text-base sm:text-lg lg:text-xl hover:bg-[#00e038] transition-all cursor-pointer active:scale-95"
              >
                Entrar em Contato
              </a>
              <a 
                href="#contact"
                className="px-8 py-4 sm:px-9 sm:py-4.5 rounded-xl border-2 border-zinc-700 bg-zinc-900/80 font-bold hover:bg-zinc-800 hover:border-[zinc-500 text-zinc-200 font-title text-base sm:text-lg lg:text-xl transition-all cursor-pointer flex items-center gap-2 active:scale-95"
              >
                Ver meus Projetos
              </a>
            </div>

            <div className="flex flex-row items-center gap-4 mt-3 opacity-0 animate-fade-in-up [animation-delay:600ms]">
              <Socialmedia url="https://github.com" icon={BsGithub} label="GitHub" />
              <Socialmedia url="mailto:arthur.roberto@example.com" icon={BiLogoGmail} label="E-mail" />
              <Socialmedia url="https://linkedin.com" icon={FaLinkedinIn} label="LinkedIn" />
            </div>
          </div>

          {/* Right Column - 3D Globe anchored to right */}
          <div className="absolute right-[100px] sm:right-[140px] lg:right-[180px] xl:right-[200px] top-1/2 -translate-y-1/2 translate-x-[50%] w-[400px] sm:w-[560px] lg:w-[860px] xl:w-[1260px] 2xl:w-[1560px] h-[400px] sm:h-[560px] lg:h-[860px] xl:h-[1260px] 2xl:h-[1560px] flex-shrink-0 flex items-center justify-center pointer-events-auto z-10 group opacity-0 animate-globe-in [animation-delay:300ms]">
            <WireframeGlobe color="#00FF4C" />
          </div>
        </section>

        {/* Setup / 3D Wireframe Monitor Section */}
        <section id="setup" className="w-full px-6 sm:px-12 md:px-20 lg:px-[144px] py-24 border-t border-zinc-800/60 bg-zinc-950/60 relative z-20 scroll-mt-24">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-5">
              <TypingTitle 
                text="Estação de Trabalho & Filosofia"
                className="text-2xl sm:text-4xl font-title font-bold text-white" 
              />
              <p className="text-zinc-400 text-base sm:text-lg lg:text-xl font-body leading-relaxed max-w-2xl">
                Acredito que o código limpo e o design intencional devem caminhar juntos. Trabalho com foco em ergonomia digital, microinterações responsivas e modelos 3D em WebGL que não sacrificam a velocidade da aplicação.
              </p>
            </div>

            {/* 3D Monitor Canvas */}
            <div className="w-full h-[420px] sm:h-[500px] flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[#00ff41]/5 rounded-full blur-3xl pointer-events-none" />
              <WireframeMonitor color="#00FF4C" className="w-full h-full max-w-[540px]" />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full px-6 sm:px-12 md:px-20 lg:px-[144px] py-24 border-t border-zinc-800/60 bg-zinc-950/30 relative z-20 scroll-mt-24">
          <div className="w-full flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <TypingTitle 
                text="Projetos em Destaque"
                className="text-2xl sm:text-4xl font-title font-bold text-white" 
              />
              <p className="text-zinc-400 text-sm sm:text-base font-subtitle">Aplicações, arquiteturas interativas e produtos em produção.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: "01",
                  title: "Cyberpunk Terminal Dashboard",
                  desc: "Painel de controle em tempo real com telemetria WebGL, tema Matrix e visualização de dados reativa.",
                  stack: ["Next.js 15", "TypeScript", "Three.js", "Tailwind"],
                  status: "ONLINE",
                },
                {
                  id: "02",
                  title: "Nexus Design System & UI Kit",
                  desc: "Biblioteca de componentes acessíveis, tokens semânticos e documentação interativa para equipes ágeis.",
                  stack: ["React", "Tailwind CSS", "Storybook", "Framer"],
                  status: "STABLE",
                },
                {
                  id: "03",
                  title: "Vector AI Canvas Engine",
                  desc: "Interface para exploração de grafos vetoriais e conexões semânticas com renderização acelerada por GPU.",
                  stack: ["TypeScript", "WebGL", "Canvas API", "Zustand"],
                  status: "PROTOTYPE",
                },
              ].map((proj) => (
                <div 
                  key={proj.id}
                  className="group relative rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-7 hover:border-[#00ff41]/60 hover:bg-zinc-900/70 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(0,255,65,0.12)] hover:-translate-y-1"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                       <span className="text-xs font-mono text-[#00ff41] tracking-wider">PROJECT_{proj.id}.tsx</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#00ff41]/30 bg-[#00ff41]/10 text-[#00ff41]">
                        {proj.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-title font-bold text-zinc-100 group-hover:text-[#00ff41] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-zinc-400 font-body leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-6 text-xs font-mono">
                    {proj.stack.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-md bg-zinc-800/70 text-zinc-300 border border-zinc-700/40">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="w-full px-6 sm:px-12 md:px-20 lg:px-[144px] py-24 border-t border-zinc-800/60 relative z-20 scroll-mt-24">
          <div className="w-full flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <TypingTitle 
                text="Tech Stack & Habilidades"
                className="text-2xl sm:text-4xl font-title font-bold text-white" 
              />
              <p className="text-zinc-400 text-sm sm:text-base font-subtitle">Domínio técnico estruturado por especialidades de desenvolvimento.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  category: "Frontend & Core",
                  items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5 & Semantic Web", "Tailwind CSS"],
                },
                {
                  category: "Creative & 3D Web",
                  items: ["Three.js", "WebGL / Shaders", "CSS Animations", "UI/UX Design", "Figma", "Microinteractions"],
                },
                {
                  category: "Ecossistema & Ferramentas",
                  items: ["Git & GitHub", "REST APIs", "Node.js", "PostgreSQL", "Docker", "Linux / Bash"],
                },
              ].map((cat) => (
                <div key={cat.category} className="p-6 rounded-xl border border-zinc-800/80 bg-zinc-900/30 flex flex-col gap-4">
                  <div className="text-sm font-mono text-[#00ff41] border-b border-zinc-800/80 pb-2 flex items-center justify-between">
                    <span>// {cat.category}</span>
                    <span className="text-[10px] text-zinc-500">{cat.items.length} ITENS</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-300 font-subtitle text-xs sm:text-sm hover:border-[#00ff41]/50 hover:text-[#00ff41] hover:bg-zinc-900 transition-colors shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full px-6 sm:px-12 md:px-20 lg:px-[144px] py-20 relative z-20 scroll-mt-24">
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-8 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#00ff41]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col gap-2 text-center sm:text-left z-10">
              <TypingTitle 
                text="Vamos construir algo incrível juntos?"
                className="text-2xl sm:text-3xl font-title font-bold text-white justify-center sm:justify-start"
                showPrefix={false}
              />
              <p className="text-sm sm:text-base text-zinc-400 font-subtitle">Entre em contato para novas oportunidades, projetos desafiadores ou parcerias.</p>
            </div>
            <a 
              href="mailto:arthur.roberto@example.com"
              className="px-8 py-4 rounded-lg bg-[#00ff41] text-black font-title font-bold text-sm hover:bg-[#00e038] transition-all whitespace-nowrap active:scale-95 z-10"
            >
              Iniciar Conversa
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800/80 py-8 px-6 sm:px-12 md:px-20 lg:px-[144px] text-center text-xs text-zinc-500 font-mono relative z-20">
          © {new Date().getFullYear()} Arthur Roberto. Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
}
