"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Copy,
  Check,
  Plus,
  Minus,
  Terminal,
  X,
  DownloadSimple,
  Code,
  ArrowUp,
} from "@phosphor-icons/react";
import WireframeMonitor from "./WireframeMonitor";
import WireframeCore from "./WireframeCore";
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
        <span className="section-index">{index}</span> {label}
      </p>
      <TypingTitle text={title} className="section-title" />
      {children ? <p className="section-description">{children}</p> : null}
    </div>
  );
}

function WindowBar({
  title,
  status = "READ ONLY",
}: {
  title: string;
  status?: string;
}) {
  return (
    <div className="window-bar">
      <span className="flex items-center gap-2">
        <span className="window-square" />
        {title}
      </span>
      <span className="window-status">{status}</span>
    </div>
  );
}

function ProjectVisual({ project }: { project: PortfolioProject }) {
  return (
    <div
      className={`project-visual visual-${project.visual}`}
      aria-hidden="true"
    >
      <div className="visual-topline">
        <span>AR / {project.id}</span>
        <span>LOCAL BUILD</span>
      </div>
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
          <span className="orbit-coordinate">X 024 / Y 128 / Z 064</span>
        </div>
      )}
      <div className="visual-bottomline">
        <span>
          FIG. {project.id} — {project.category.toUpperCase()}
        </span>
        <span className="visual-cross">+</span>
      </div>
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
  const [skillIndex, setSkillIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skill = portfolio.skills[skillIndex];
  const projectYears = portfolio.projects.map((project) => project.year).sort();
  const hasDemoExperience = portfolio.experience.some((item) => item.isDemo);
  const projects = portfolio.projects.filter(
    (project) => filter === "Todos" || project.category === filter,
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const elements = root.querySelectorAll<HTMLElement>("[data-reveal]");
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

  const downloadProfile = () => {
    const text = `${portfolio.profile.name}\n${portfolio.profile.role}\n\n${portfolio.isDemo || hasDemoExperience ? "PERFIL DEMONSTRATIVO — substitua os dados antes de usar.\n\n" : ""}${portfolio.profile.bio.join("\n\n")}\n\nTRAJETÓRIA\n${portfolio.experience.map((item) => `${item.period} | ${item.title} — ${item.company}\n${item.description}`).join("\n\n")}\n\nCONTATO\n${portfolio.contact.email}`;
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `arthur-roberto-perfil${portfolio.isDemo ? "-demo" : ""}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div ref={rootRef} className="portfolio-content">
      <div className="system-strip content-width">
        <span>
          <span className="status-led" /> AR / PERSONAL WORKSTATION
        </span>
        {portfolio.isDemo ? (
          <span className="demo-build">
            BUILD DE CONCEITO · DADOS DEMONSTRATIVOS
          </span>
        ) : (
          <span className="demo-build">INDEPENDENT DEVELOPMENT / BRASIL</span>
        )}
      </div>

      <nav
        className="workstation-index content-width"
        aria-label="Explorar o portfólio"
      >
        <span className="system-label">DIR /</span>
        {[
          { label: "Perfil", href: "#setup" },
          { label: "Projetos", href: "#projects" },
          { label: "Trajetória", href: "#experience" },
          { label: "Ferramentas", href: "#skills" },
          { label: "Processo", href: "#process" },
          { label: "Notas", href: "#notes" },
        ].map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
            <ArrowUpRight size={13} />
          </a>
        ))}
      </nav>

      <section id="setup" className="portfolio-section section-workstation">
        <div className="content-width">
          <div className="workstation-grid">
            <div data-reveal>
              <SectionTitle
                index="01"
                label="QUEM ESTÁ NO TERMINAL"
                title="Entre o pixel e o sistema."
              />
              <p className="about-intro">{portfolio.profile.intro}</p>
              {portfolio.profile.bio.map((paragraph) => (
                <p key={paragraph} className="body-copy">
                  {paragraph}
                </p>
              ))}
              <div className="profile-facts">
                {portfolio.profile.facts.map((fact) => (
                  <div key={fact.label}>
                    <span>{fact.label}</span>
                    <p>{fact.value}</p>
                  </div>
                ))}
              </div>
              <button className="text-link" onClick={downloadProfile}>
                <DownloadSimple size={20} /> Baixar perfil em .txt{" "}
                {portfolio.isDemo ? (
                  <span className="mini-tag">DEMO</span>
                ) : null}
              </button>
            </div>
            <div className="workstation-window" data-reveal>
              <WindowBar title="workstation.exe" status="INTERACTIVE" />
              <div className="monitor-stage">
                <span className="stage-coordinate">VIEW_01 / CRT</span>
                <WireframeMonitor color="#00FF4C" />
                <span className="stage-bracket bracket-tl" />
                <span className="stage-bracket bracket-br" />
              </div>
              <div className="model-caption">
                <span>
                  <span className="status-led" /> INPUT READY
                </span>
                <span>Arraste para explorar ↔</span>
              </div>
            </div>
          </div>
          <div className="principle-row">
            {portfolio.profile.principles.map((principle, i) => (
              <div key={principle.title} data-reveal>
                <span className="system-label neon">[ 0{i + 1} ]</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            ))}
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
            <span className="system-label">ARQUIVO ABERTO</span>
            <p>
              {portfolio.projects.some((project) => project.isDemo)
                ? "Projetos demonstrativos. "
                : ""}
              Um espaço para mostrar problema, processo e entrega — além da tela
              final.
            </p>
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
            <div className="file-label">
              <Terminal size={22} />
              <span>
                career.log
                <br />
                <small>
                  {hasDemoExperience
                    ? "Entradas de exemplo / substitua pelas suas"
                    : "Experiências, projetos e aprendizado"}
                </small>
              </span>
            </div>
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

      <section id="skills" className="portfolio-section section-modules">
        <div className="content-width">
          <SectionTitle
            index="04"
            label="DENTRO DA MÁQUINA"
            title="Ferramentas com propósito."
          >
            Não é uma lista de logos. É como as peças se conectam para resolver
            um problema.
          </SectionTitle>
          <div className="modules-grid">
            <div className="module-list">
              {portfolio.skills.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setSkillIndex(index)}
                  aria-pressed={skillIndex === index}
                  aria-controls="module-output"
                  className="module-button"
                >
                  <span className="module-number">0{index + 1}</span>
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.tools.slice(0, 3).join(" / ")}</small>
                  </span>
                  <ArrowUpRight size={22} />
                </button>
              ))}
            </div>
            <div className="module-display">
              <div className="core-stage">
                <WireframeCore />
                <span className="core-label system-label">
                  AR-01 / CORE MODULE
                </span>
              </div>
              <div
                className="module-output"
                id="module-output"
                aria-live="polite"
                aria-atomic="true"
              >
                <p key={skill.id} className="module-command">
                  <span>➜</span> {skill.command}
                </p>
                <p>{skill.description}</p>
                <div className="tech-list">
                  {skill.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="portfolio-section">
        <div className="content-width">
          <SectionTitle
            index="05"
            label="DO BRIEF AO DEPLOY"
            title="O processo também é produto."
          />
          <div className="process-grid">
            {portfolio.process.map((step) => (
              <article className="process-step" key={step.number} data-reveal>
                <div className="process-path">
                  <span>{step.number}</span>
                  <ArrowRight size={18} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="process-deliverable">
                  <span>OUTPUT</span>
                  {step.deliverable}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="notes" className="portfolio-section">
        <div className="content-width">
          <div className="section-heading-row">
            <SectionTitle
              index="06"
              label="CADERNO DE BORDO"
              title="Anotações entre commits."
            >
              Pequenas descobertas, decisões de projeto e coisas que valem
              registrar.
            </SectionTitle>
            <Code size={44} weight="thin" className="text-zinc-500" />
          </div>
          <div className="notes-list">
            {portfolio.notes.map((note) => (
              <details className="note-entry" key={note.id} data-reveal>
                <summary>
                  <span className="note-tag">{note.tag}</span>
                  <span className="note-title">
                    {note.title}
                    <small>{note.excerpt}</small>
                  </span>
                  <span className="note-meta">
                    {note.readTime}
                    <span>{note.date}</span>
                  </span>
                  <Plus className="details-plus" size={22} />
                  <Minus className="details-minus" size={22} />
                </summary>
                <div className="note-body">
                  {note.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {note.isDemo ? (
                    <span className="demo-note">
                      Nota demonstrativa / editável
                    </span>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="portfolio-section section-contact">
        <div className="content-width">
          <div className="contact-window" data-reveal>
            <WindowBar title="new_connection.sh" status="AWAITING INPUT" />
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
              <div className="contact-topics">
                {portfolio.contact.topics.map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
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
        <span className="system-label">DESIGN INTENCIONAL. CÓDIGO ABERTO.</span>
      </footer>
      <CaseStudy
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
