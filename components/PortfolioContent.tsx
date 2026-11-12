"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Copy,
  Check,
  Plus,
  Minus,
  X,
  ArrowUp,
} from "@phosphor-icons/react";
import WireframeMonitor from "./WireframeMonitor";
import GitHubActivity from "./GitHubActivity";
import TypingTitle from "./TypingTitle";
import { portfolio, type PortfolioProject } from "@/data/portfolio";

function SectionTitle({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading" data-reveal>
      <p className="system-label">
        <span className="section-index">{index} /</span> {label}
      </p>
      <TypingTitle text={title} className="section-title" />
      {children ? <p className="section-description">{children}</p> : null}
    </div>
  );
}

function ProjectVisual({ project }: { project: PortfolioProject }) {
  return (
    <div
      className={`project-visual visual-${project.visual}`}
      aria-hidden="true"
    >
      {project.visual === "terminal" ? (
        <div className="preview-terminal">
          <div className="preview-sidebar">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="preview-console">
            <p>
              <span className="neon">$</span> status --all
            </p>
            <div className="preview-bars">
              {[42, 68, 52, 84, 61, 94, 75, 86, 56, 72, 92, 67].map((n, i) => (
                <i
                  key={i}
                  style={{ height: `${n}%`, animationDelay: `${i * 45}ms` }}
                />
              ))}
            </div>
            <p className="neon">● all systems operational</p>
          </div>
        </div>
      ) : project.visual === "system" ? (
        <div className="preview-system">
          <div className="preview-swatch">
            Aa<span>INTERFACE / 02</span>
          </div>
          <div className="preview-components">
            <span className="preview-button">
              Continue <ArrowRight />
            </span>
            <div className="flex gap-2">
              <span className="preview-toggle" />
              <span className="preview-input">Search_</span>
            </div>
            <div className="preview-lines">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      ) : (
        <div className="preview-orbit">
          <div className="orbit-ring orbit-one" />
          <div className="orbit-ring orbit-two" />
          <div className="orbit-ring orbit-three" />
          <span className="orbit-center" />
        </div>
      )}
    </div>
  );
}

function CaseStudy({
  project,
  onClose,
}: {
  project: PortfolioProject | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (project) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [project]);
  return (
    <dialog
      ref={dialogRef}
      className="case-dialog"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="case-title"
    >
      {project ? (
        <>
          <div className="dialog-top">
            <span className="system-label">
              CASE_{project.id} /{" "}
              {project.isDemo ? "CONCEITO DEMONSTRATIVO" : "ESTUDO DE CASO"}
            </span>
            <button
              type="button"
              className="icon-button"
              onClick={onClose}
              aria-label="Fechar estudo de caso"
            >
              <X size={23} />
            </button>
          </div>
          <div className="dialog-content">
            <p className="system-label neon">
              {project.category} / {project.year}
            </p>
            <h2
              id="case-title"
              className="font-title text-3xl sm:text-5xl font-bold leading-tight"
            >
              {project.title}
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              {project.summary}
            </p>
            <div className="case-meta">
              <div>
                <span>PAPEL</span>
                <p>{project.role}</p>
              </div>
              <div>
                <span>DURAÇÃO</span>
                <p>{project.duration}</p>
              </div>
            </div>
            <ProjectVisual project={project} />
            {[
              { title: "01 / O problema", text: project.challenge },
              { title: "02 / A decisão", text: project.solution },
              { title: "03 / O resultado", text: project.outcome },
            ].map((item) => (
              <div key={item.title} className="case-chapter">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
            <div className="tech-list">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            {project.links.map((link) => (
              <a
                className="text-link"
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <ArrowUpRight />
              </a>
            ))}
            {project.isDemo ? (
              <p className="demo-note">
                Estudo de caso fictício para demonstrar a apresentação. Conteúdo
                e links podem ser substituídos pelos seus projetos.
              </p>
            ) : null}
          </div>
        </>
      ) : null}
    </dialog>
  );
}

export default function PortfolioContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("Todos");
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const projectYears = portfolio.projects.map((project) => project.year).sort();
  const hasDemoExperience = portfolio.experience.some((item) => item.isDemo);
  const projects = portfolio.projects.filter(
    (project) => filter === "Todos" || project.category === filter,
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const elements = root.querySelectorAll<HTMLElement>(
      "[data-reveal], .portfolio-section",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    elements.forEach((element) => {
      // Progressive enhancement: content is readable before JS or without motion.
      if (element.hasAttribute("data-reveal"))
        element.classList.add("reveal-enabled");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolio.contact.email);
      setCopied(true);
      setCopyError(false);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  };

  return (
    <div ref={rootRef} className="portfolio-content">
      <section id="setup" className="portfolio-section section-workstation">
        <div className="content-width">
          <div className="workstation-grid">
            <div className="profile-copy" data-reveal>
              <SectionTitle
                index="01"
                label="QUEM ESTÁ NO TERMINAL"
                title="Entre o pixel e o sistema."
              />
              <p className="about-intro">{portfolio.profile.intro}</p>
              {portfolio.profile.bio.slice(0, 2).map((paragraph) => (
                <p key={paragraph} className="body-copy">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="workstation-model" data-reveal>
              <div className="monitor-stage">
                <WireframeMonitor color="#00FF4C" />
              </div>
              <p className="model-hint">
                Arraste para explorar <span aria-hidden="true">↔</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="portfolio-section">
        <div className="content-width">
          <div className="section-heading-row">
            <SectionTitle
              index="02"
              label="TRABALHOS SELECIONADOS"
              title="Ideias que saíram do rascunho."
            >
              Cada projeto tem um contexto. E cada decisão de interface tem uma
              razão.
            </SectionTitle>
            <span className="system-label section-side-note">
              / SELECTED WORK
              <br />
              {projectYears[0]} — {projectYears.at(-1)}
            </span>
          </div>
          <div className="project-toolbar">
            <div className="project-filters" aria-label="Filtrar projetos">
              {["Todos", "Interface", "Full stack", "Experimento"].map(
                (category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    aria-pressed={filter === category}
                  >
                    {category}
                  </button>
                ),
              )}
            </div>
            <span className="system-label" role="status">
              {String(projects.length).padStart(2, "0")} ARQUIVOS
            </span>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.id} className="project-card">
                <button
                  className="project-open"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`Abrir estudo de caso: ${project.title}`}
                >
                  <ProjectVisual project={project} />
                  <span className="visual-open-label">
                    EXPLORAR PROJETO <ArrowUpRight size={18} />
                  </span>
                </button>
                <div className="project-card-content">
                  <p className="system-label neon">
                    {project.category}{" "}
                    <span className="text-zinc-500">/ {project.year}</span>
                  </p>
                  <h3>
                    <button onClick={() => setSelectedProject(project)}>
                      {project.title}
                    </button>
                  </h3>
                  <p>{project.summary}</p>
                  <div className="tech-list">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <button
                    className="text-link"
                    onClick={() => setSelectedProject(project)}
                  >
                    Ler estudo de caso <ArrowUpRight size={19} />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="section-footnote">
            {portfolio.projects.some((project) => project.isDemo) ? (
              <p>Projetos demonstrativos.</p>
            ) : null}
            <a
              href={portfolio.profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Outros experimentos no GitHub <ArrowUpRight size={19} />
            </a>
          </div>
        </div>
      </section>

      <section id="experience" className="portfolio-section">
        <div className="content-width experience-grid">
          <div>
            <SectionTitle
              index="03"
              label="HISTÓRICO DE VERSÕES"
              title="Um caminho em construção."
            >
              As experiências que mudaram minha maneira de pensar software.
            </SectionTitle>
            {hasDemoExperience ? (
              <p className="demo-note experience-demo">
                Trajetória demonstrativa.
              </p>
            ) : null}
          </div>
          <div className="timeline">
            {portfolio.experience.map((item, i) => (
              <details
                key={item.id}
                className="timeline-entry"
                open={i === 0}
                data-reveal
              >
                <summary>
                  <span className="timeline-node" />
                  <span className="timeline-period">{item.period}</span>
                  <span className="timeline-title">
                    {item.title}
                    <small>{item.company}</small>
                  </span>
                  <Plus className="details-plus" size={20} />
                  <Minus className="details-minus" size={20} />
                </summary>
                <div className="timeline-body">
                  <p>{item.description}</p>
                  <ul>
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="github" className="portfolio-section section-github">
        <div className="content-width">
          <GitHubActivity />
        </div>
      </section>

      <section id="contact" className="portfolio-section section-contact">
        <div className="content-width">
          <div className="contact-area" data-reveal>
            <div className="contact-inner">
              <p className="system-label neon">
                <span className="status-led" /> {portfolio.contact.availability}
              </p>
              <h2>
                {portfolio.contact.headline}
                <span className="terminal-cursor" aria-hidden="true">
                  _
                </span>
              </h2>
              <p className="contact-description">
                {portfolio.contact.description}
              </p>
              <div className="contact-address">
                <a href={`mailto:${portfolio.contact.email}`}>
                  {portfolio.contact.email}
                  <ArrowUpRight size={28} />
                </a>
                <button
                  onClick={copyEmail}
                  className="icon-button"
                  aria-label={copied ? "E-mail copiado" : "Copiar e-mail"}
                >
                  {copied ? <Check size={23} /> : <Copy size={23} />}
                </button>
              </div>
              <p role="status" className="copy-status">
                {copied
                  ? "[OK] Endereço copiado."
                  : copyError
                    ? "Não foi possível copiar. Selecione o endereço acima."
                    : portfolio.contact.email.endsWith("@example.com")
                      ? "Endereço de exemplo. Substitua pelo seu contato."
                      : "Uma boa conversa pode ser o próximo commit."}
              </p>
              <div className="contact-links">
                {portfolio.profile.linkedin ? (
                  <a
                    href={portfolio.profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn <ArrowUpRight size={18} />
                  </a>
                ) : null}
                <a
                  href={portfolio.profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <ArrowUpRight size={18} />
                </a>
                <a href="#projects">
                  Rever os projetos <ArrowUpRight size={18} />
                </a>
                <a href="#about">
                  Voltar ao início <ArrowUp size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="portfolio-footer content-width">
        <a href="#about" className="footer-brand">
          &lt; AR /&gt;
        </a>
        <span>
          © {new Date().getFullYear()} {portfolio.profile.name}
        </span>
      </footer>
      <CaseStudy
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
