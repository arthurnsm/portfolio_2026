"use client";

import WireframeGlobe from "@/components/WireframeGlobe";
import PortfolioContent from "@/components/PortfolioContent";
import DecodedText from "@/components/DecodedText";
import Navbar from "@/components/navbar";
import { BsGithub } from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa";
import Socialmedia from "@/components/socialmedia";
import Stack from "@/components/stack";
import "./portfolio.css";
import { portfolio } from "@/data/portfolio";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black text-zinc-100 flex flex-col font-body selection:bg-[#B9F503] selection:text-black overflow-x-hidden relative">
      {/* Top Mask Overlay with Gradient */}
   

      {/* Floating Top Navigation Bar */}
      <div className="fixed top-[max(12px,env(safe-area-inset-top))] md:top-[20px] left-0 right-0 z-50 flex justify-center px-5 sm:px-10 md:px-12 lg:px-16 xl:px-[144px] pointer-events-none">
        <Navbar />
      </div>

      {/* Main Portfolio Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Hero Section - Full Screen with Balanced 3D Globe */}
        <section
          id="about"
          className="w-full min-h-svh flex flex-col lg:flex-row items-center justify-between px-5 sm:px-10 md:px-12 lg:px-16 xl:px-[144px] pt-28 pb-10 lg:py-0 relative overflow-hidden scroll-mt-24"
        >
          {/* Permanent Subtle Grid Background (Layered at z-0 so it is always 100% visible) */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div
              className="w-full h-full opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(92, 41, 234, 0.16) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(92, 41, 234, 0.16) 1px, transparent 1px)
                `,
                backgroundSize: "44px 44px",
              }}
            />
            {/* Smooth Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_20%,#100C1A_88%)]" />
          </div>

          {/* Subtle Matrix glow backdrop */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3/5 h-4/5 bg-[#B9F503]/5 rounded-full blur-3xl z-0 pointer-events-none" />

          {/* Left Column (Content) */}
          <div className="w-full lg:w-[62%] xl:w-[64%] flex flex-col items-start justify-center gap-6 sm:gap-7 z-20 py-0 pointer-events-auto lg:mt-20">
            <h1 className="text-[clamp(2.25rem,9vw,4.5rem)] lg:text-[clamp(3.5rem,5.8vw,7rem)] font-title font-bold tracking-tight text-white leading-[1.06] ">
              <span className="block">
                <DecodedText text={portfolio.profile.name} />
              </span>
              <span className="bg-[#B9F503] block w-fit max-w-full px-4 py-1.5 sm:px-5 sm:py-2 mt-3 rounded-sm">
                <span className="text-black text-[clamp(1.15rem,4.8vw,2.25rem)] lg:text-[clamp(1.5rem,2.8vw,3rem)] font-subtitle font-black tracking-tight block">
                  <DecodedText text={portfolio.profile.role} delay={160} />
                </span>
              </span>
            </h1>
            <div className="flex flex-wrap gap-2 sm:gap-3.5 mb-2 ">
              <Stack name="ReactJS" />
              <Stack name="NextJS" />
              <Stack name="TailwindCSS" />
              <Stack name="Typescript" />
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-[1.55rem] font-body text-zinc-400 max-w-2xl xl:max-w-3xl leading-relaxed hero-copy-enter">
              Construo interfaces web modernas de alta fidelidade com React,
              Next.js e TypeScript, unindo precisão visual em UI/UX a
              arquiteturas robustas e performáticas.
            </p>

            <div className="flex w-full flex-col min-[420px]:flex-row flex-wrap items-stretch min-[420px]:items-center gap-3 sm:gap-5 pt-2 sm:pt-8 lg:pt-16 ">
              <a
                href="#contact"
                className="text-center px-6 py-4 sm:px-10 sm:py-4.5 rounded-xl bg-[#5827D0] font-title border-4 hover:border-[#5C28EA] hover:text-[#B9F503] border-transparent font-bold text-base sm:text-lg lg:text-xl hover:bg-[#4920BC] transition-all cursor-pointer active:scale-95"
              >
                Entrar em Contato
              </a>
              <a
                href="#projects"
                className="justify-center px-6 py-4 sm:px-9 sm:py-4.5 rounded-xl  border-transparent bg-[#5827D0]  hover:text-[#B9F503] font-bold hover:bg-[#4920BC] hover:border-[#5C28EA] border-4 font-title text-base sm:text-lg lg:text-xl transition-all cursor-pointer flex items-center gap-2 active:scale-95"
              >
                Ver meus Projetos
              </a>
            </div>

            <div className="flex w-full justify-center md:justify-start flex-row items-center gap-4 mt-3 ">
              <Socialmedia
                url={portfolio.profile.github}
                icon={BsGithub}
                label="GitHub"
              />
              <Socialmedia
                url={`mailto:${portfolio.profile.email}`}
                icon={BiLogoGmail}
                label="E-mail"
              />
              <Socialmedia
                url={portfolio.profile.linkedin}
                icon={FaLinkedinIn}
                label="LinkedIn"
              />
            </div>
          </div>

          {/* Right Column - 3D Globe anchored to right */}
          <div className="relative mt-4 w-full max-w-[420px] aspect-square lg:aspect-auto lg:mt-0 lg:max-w-none lg:absolute lg:right-[180px] xl:right-[200px] lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-[50%] lg:w-[860px] xl:w-[1260px] 2xl:w-[1560px] lg:h-[860px] xl:h-[1260px] 2xl:h-[1560px] flex-shrink-0 flex items-center justify-center pointer-events-auto z-10 group opacity-0 animate-globe-in [animation-delay:300ms]">
            <WireframeGlobe color="#B9F503" />
          </div>
        </section>

        <PortfolioContent />
      </div>
    </div>
  );
}
