"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
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
  title,
  children,
}: {
  index: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading" data-reveal>
      <p className="system-label">
        <span className="section-index text-2xl">{index} </span> 
      </p>
      <TypingTitle text={title} className="section-title" />
      {children ? <p className="section-description">{children}</p> : null}
    </div>
  );
}

function ProjectVisual({ project }: { project: PortfolioProject }) {
  const preview = project.preview;
  return (
    <div className={`project-visual visual-${preview.kind}`}>
      {preview.kind === "image" ? (
        <div className="project-capture-frame">
          <Image
            src={preview.src}
            alt={preview.alt}
            fill
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1100px) 50vw, 33vw"
            className="project-capture"
          />
        </div>
      ) : (
        <div className="source-preview" aria-hidden="true">
          <span className="source-filename">{preview.filename}</span>
          <pre>
            {preview.lines.map((line, index) => (
              <span className="source-line" key={index}>
                <i>{String(index + 1).padStart(2, "0")}</i>
                <code>{line || " "}</code>
              </span>
            ))}
          </pre>
        </div>
      )}
      <span className="preview-caption">{preview.caption}</span>
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
              {project.slug} / {project.year}
            </span>
            <button
              type="button"
              className="icon-button"
              onClick={onClose}
              aria-label="Fechar projeto"
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
            <ProjectVisual project={project} />
            {project.details.map((item) => (
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
  const categories = [
    "Todos",
    ...new Set(portfolio.projects.map((project) => project.category)),
  ];
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
                index="SOBRE MIM"
                
                title="Quem sou Eu?"
              />
              {portfolio.profile.bio.map((paragraph) => (
                <p key={paragraph} className="body-copy">
                  {paragraph}
                </p>
              ))}
              <ul className="profile-interests" aria-label="Interesses">
                {portfolio.profile.interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </div>
            <div className="workstation-model" data-reveal>
              <div className="monitor-stage">
                <WireframeMonitor color="#5C29EA" />
              </div>

            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="portfolio-section">
        <div className="content-width">
          <div className="section-heading-row">
            <SectionTitle
              index="02"
              title="O que tenho feito."
            />
            <span className="system-label section-side-note">
              REPOSITÓRIOS PÚBLICOS
              <br />
              {projectYears[0]} — {projectYears.at(-1)}
            </span>
          </div>
          <div className="project-toolbar">
            <div className="project-filters" aria-label="Filtrar projetos">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  aria-pressed={filter === category}
                >
                  {category}
                </button>
              ))}
            </div>
            <span className="system-label" role="status">
              {String(projects.length).padStart(2, "0")} PROJETOS
            </span>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.id} className="project-card">
                <button
                  className="project-open"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`Abrir projeto: ${project.title}`}
                >
                  <ProjectVisual project={project} />
                  <span className="visual-open-label">
                    VER PROJETO <ArrowUpRight size={18} />
                  </span>
                </button>
                <div className="project-card-content">
                  <p className="system-label neon">
                    {project.category}{" "}
                    <span className="text-zinc-500">/ {project.year}</span>
                  </p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <p className="project-note">{project.note}</p>
                  <div className="tech-list">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <button
                    className="text-link"
                    aria-label={`Ver projeto: ${project.title}`}
                    onClick={() => setSelectedProject(project)}
                  >
                    Ver projeto <ArrowUpRight size={19} />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="section-footnote">
            <a
              href={portfolio.profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Todos os repositórios no GitHub <ArrowUpRight size={19} />
            </a>
          </div>
        </div>
      </section>

      {portfolio.experience.length > 0 ? (
        <section id="experience" className="portfolio-section">
          <div className="content-width experience-grid">
            <div>
              <SectionTitle
                index="03"
                title="Experiência."
              />
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
      ) : null}

      <section id="github" className="portfolio-section section-github">
        <div className="content-width">
          <GitHubActivity />
        </div>
      </section>

      <section id="contact" className="portfolio-section section-contact">
        <div className="content-width">
          <div className="contact-area" data-reveal>
            <div className="contact-inner">
              <p className="system-label neon">{portfolio.contact.label}</p>
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
                    : ""}
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
