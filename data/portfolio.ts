/**
 * Conteúdo pessoal e projetos públicos de Arthur Roberto.
 * Fontes e campos editáveis: docs/EDITAR-CONTEUDO.md.
 * Os anos indicam o registro dos repositórios; não são durações de trabalho.
 */
export type ProjectCategory = "Interface" | "Backend" | "Experimento";

export type ProjectPreview =
  | {
      kind: "image";
      src: string;
      alt: string;
      caption: string;
    }
  | {
      kind: "code";
      filename: string;
      lines: string[];
      caption: string;
    };

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  summary: string;
  note: string;
  stack: string[];
  details: { title: string; text: string }[];
  links: { label: string; url: string }[];
  preview: ProjectPreview;
}

export interface PortfolioExperience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface PortfolioContent {
  profile: {
    name: string;
    role: string;
    email: string;
    github: string;
    linkedin: string;
    bio: string[];
    interests: string[];
  };
  projects: PortfolioProject[];
  experience: PortfolioExperience[];
  contact: {
    headline: string;
    description: string;
    email: string;
    label: string;
  };
}

// Contato publicado no README do perfil arthurnsm.
const email = "arthur.rdnascimento@gmail.com";

export const portfolio: PortfolioContent = {
  profile: {
    name: "Arthur Roberto",
    role: "Desenvolvedor Full Stack",
    email,
    github: "https://github.com/arthurnsm",
    linkedin: "https://www.linkedin.com/in/arthrnsm/",
    bio: [
      "Me chamo Arthur Roberto.",
      "Também me interesso por sistemas embarcados, hardware hacking e eletrônica. Nos meus repositórios, isso se mistura a estudos de segurança web e automações em Python.",
    ],
    interests: ["Sistemas embarcados", "Hardware hacking", "Segurança web"],
  },
  projects: [
    {
      id: "01",
      slug: "caffino",
      title: "Caffino",
      category: "Interface",
      year: "2025",
      summary:
        "Uma cafeteria fictícia, um layout do Figma e o exercício de transformá-lo em componentes React.",
      note: "Design de referência: Ihda 'Abidat",
      stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      details: [
        {
          title: "O exercício",
          text: "Implementei a landing page de uma marca fictícia para praticar a composição de uma interface a partir de uma referência pronta. O design de referência é de Ihda 'Abidat.",
        },
        {
          title: "No código",
          text: "A página foi dividida em componentes React, com TypeScript e Tailwind CSS. O estudo trabalha a organização dos elementos e a adaptação da composição para desktop e celular.",
        },
        {
          title: "Para explorar",
          text: "A implementação está publicada na Vercel e o código está aberto no GitHub. É um estudo de front-end, sem vínculo comercial com uma cafeteria real.",
        },
      ],
      links: [
        { label: "Abrir site", url: "https://caffino-six.vercel.app/" },
        { label: "Ver código", url: "https://github.com/arthurnsm/Caffino" },
        {
          label: "Design: Ihda 'Abidat",
          url: "https://www.figma.com/@ihdaabidat",
        },
      ],
      preview: {
        kind: "image",
        src: "/projects/caffino.webp",
        alt: "Página inicial do Caffino: fundo bege, tipografia escura e uma xícara amarela.",
        caption: "Landing page · estudo de interface",
      },
    },
    {
      id: "02",
      slug: "nerdpromos",
      title: "NerdPromos",
      category: "Backend",
      year: "2025",
      summary:
        "Scripts Python para reunir ofertas de lojas diferentes e classificar os produtos com modelos locais.",
      note: "Coleta → JSON → classificação",
      stack: ["Python", "Selenium", "Ollama", "JSON"],
      details: [
        {
          title: "De onde vêm os dados",
          text: "O repositório separa os coletores do Magalu e do Mercado Livre. Cada script usa Selenium para extrair informações dos produtos e gravá-las em arquivos JSON.",
        },
        {
          title: "Como se encontram",
          text: "O unifier.py reúne os arquivos, divide os registros em lotes e chama modelos locais pelo Ollama para classificar os produtos. O código inclui tentativas com modelos alternativos e processamento concorrente.",
        },
        {
          title: "O que está publicado",
          text: "Scripts de coleta e classificação, além de exemplos dos arquivos gerados. O projeto roda localmente; o repositório não apresenta uma interface web ou um serviço publicado.",
        },
      ],
      links: [
        {
          label: "Ver código",
          url: "https://github.com/arthurnsm/NerdPromos_backend",
        },
        {
          label: "Abrir unifier.py",
          url: "https://github.com/arthurnsm/NerdPromos_backend/blob/main/unifier.py",
        },
      ],
      preview: {
        kind: "code",
        filename: "unifier.py",
        lines: [
          "dados = carregar_jsons(pasta)",
          "",
          "resultados = benchmark(",
          "    dados, prompt, modelos=modelos,",
          "    max_workers=4",
          ")",
        ],
        caption: "Python · classificação com modelos locais",
      },
    },
    {
      id: "03",
      slug: "vulnscan",
      title: "Vulnscan",
      category: "Experimento",
      year: "2026",
      summary:
        "Um laboratório de segurança web que conecta uma interface Next.js a ferramentas de reconhecimento em Python.",
      note: "Experimento local · em desenvolvimento",
      stack: ["Next.js", "Python", "FastAPI", "Nmap", "ffuf"],
      details: [
        {
          title: "O ponto de partida",
          text: "Explorar uma interface web para selecionar um alvo e alternar entre modos de reconhecimento rápido e profundo. O front-end usa Next.js, React e TypeScript.",
        },
        {
          title: "Por trás da interface",
          text: "Uma API em FastAPI encaminha as solicitações a orquestradores Python. Eles executam Nmap e ffuf, tratam erros e organizam as saídas em dados estruturados.",
        },
        {
          title: "Em desenvolvimento",
          text: "O código atual conecta o front-end a uma API local. A apresentação dos resultados ainda está em evolução; o repositório registra o experimento e suas implementações.",
        },
      ],
      links: [
        { label: "Ver código", url: "https://github.com/arthurnsm/vulnscan" },
        {
          label: "Abrir orquestrador",
          url: "https://github.com/arthurnsm/vulnscan/blob/main/backend/routes/fast_orchestrator.py",
        },
      ],
      preview: {
        kind: "code",
        filename: "fast_orchestrator.py",
        lines: [
          "resultados = await asyncio.gather(",
          "    run_nmap(url, scan_type),",
          "    run_fuzzing(url, scan_type),",
          "    return_exceptions=True",
          ")",
        ],
        caption: "Python · orquestração de tarefas",
      },
    },
  ],
  // Adicione somente experiências e períodos confirmados.
  experience: [],
  contact: {
    headline: "Pode me chamar de Arthur.",
    description:
      "Para conversar sobre um projeto, uma oportunidade ou trocar uma ideia sobre código e eletrônica, meu contato está aqui.",
    email,
    label: "CONTATO",
  },
};
