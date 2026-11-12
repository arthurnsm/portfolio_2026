/**
 * CONTEÚDO EDITÁVEL
 * Os projetos, experiências, textos e dados de contato abaixo são exemplos.
 * Troque-os pelos seus dados antes de publicar como portfólio profissional.
 * Mantenha isDemo=true enquanto a informação ainda for fictícia.
 */
export type ProjectCategory = "Interface" | "Full stack" | "Experimento";

export interface PortfolioProject {
  id: string;
  slug: string;
  isDemo: boolean;
  title: string;
  category: ProjectCategory;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  stack: string[];
  role: string;
  duration: string;
  links: { label: string; url: string }[];
  visual: "terminal" | "system" | "orbital";
}

export interface PortfolioNote {
  id: string;
  isDemo: boolean;
  tag: string;
  title: string;
  excerpt: string;
  body: string[];
  date: string;
  readTime: string;
}

export interface PortfolioContent {
  isDemo: boolean;
  profile: {
    name: string;
    role: string;
    location: string;
    availability: string;
    email: string;
    github: string;
    linkedin: string;
    intro: string;
    bio: string[];
    principles: { title: string; description: string }[];
    facts: { label: string; value: string }[];
  };
  projects: PortfolioProject[];
  experience: {
    id: string;
    isDemo: boolean;
    period: string;
    title: string;
    company: string;
    description: string;
    highlights: string[];
  }[];
  skills: {
    id: string;
    label: string;
    description: string;
    tools: string[];
    command: string;
  }[];
  process: {
    number: string;
    title: string;
    description: string;
    deliverable: string;
  }[];
  notes: PortfolioNote[];
  contact: {
    headline: string;
    description: string;
    email: string;
    topics: string[];
    availability: string;
  };
}

export const portfolio: PortfolioContent = {
  isDemo: true,
  profile: {
    name: "Arthur Roberto",
    role: "Desenvolvedor Full Stack",
    location: "Brasil · remoto",
    availability: "Aberto a boas conversas",
    email: "arthur.roberto@example.com",
    github: "https://github.com/arthurnsm",
    linkedin: "", // Cole a URL completa do seu perfil quando estiver pronto.
    intro: "A interface é só a parte visível do trabalho.",
    bio: [
      "Gosto de entender o caminho inteiro: o que a pessoa quer fazer, como a informação chega até ela e onde a interface pode sair da frente.",
      "Meu espaço de trabalho fica entre produto e engenharia. Esboço fluxos, construo componentes e conecto o que aparece na tela ao que precisa funcionar por trás dela.",
      "Terminais, manuais de hardware e a web dos primeiros computadores pessoais são meu repertório visual. A nostalgia entra na linguagem; a usabilidade continua no presente.",
    ],
    principles: [
      {
        title: "Clareza antes do efeito",
        description:
          "Uma interação só fica se ajudar a entender o que aconteceu ou o que fazer a seguir.",
      },
      {
        title: "Do pequeno para o real",
        description:
          "Começar pelo fluxo essencial, testar em uma tela de verdade e aumentar a complexidade com motivo.",
      },
      {
        title: "Código que aceita mudanças",
        description:
          "Componentes com limites claros, dados separados da apresentação e decisões que outra pessoa consegue continuar.",
      },
    ],
    facts: [
      { label: "Modo de trabalho", value: "Do fluxo ao deploy" },
      { label: "Ponto de partida", value: "Uma boa pergunta" },
      { label: "Foco atual", value: "Interfaces & sistemas web" },
      { label: "Regra da bancada", value: "Testar no celular" },
    ],
  },
  projects: [
    {
      id: "01",
      slug: "ponto-de-controle",
      isDemo: true,
      title: "Ponto de controle",
      category: "Full stack",
      year: "2026",
      summary:
        "Um painel de operações para enxergar filas, responsáveis e próximos passos sem abrir cinco abas.",
      challenge:
        "Em uma operação fictícia, pedidos chegavam por canais diferentes. A equipe precisava entender o que estava parado, quem estava cuidando e o que exigia atenção primeiro.",
      solution:
        "Organizei uma fila única com filtros persistentes, histórico por pedido e estados explícitos de carregamento, erro e conclusão. Uma API centraliza as mudanças e mantém a interface sincronizada.",
      outcome:
        "O protótipo reúne triagem, acompanhamento e histórico no mesmo fluxo. O próximo passo seria validar prioridades e linguagem com uma equipe real.",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "REST API"],
      role: "Produto, interface & desenvolvimento",
      duration: "6 semanas · estudo de caso",
      links: [],
      visual: "terminal",
    },
    {
      id: "02",
      slug: "arquivo-de-interface",
      isDemo: true,
      title: "Arquivo de interface",
      category: "Interface",
      year: "2026",
      summary:
        "Uma biblioteca de componentes que documenta decisões, além de colecionar variações de botões.",
      challenge:
        "Como manter consistência entre telas sem transformar o design system em uma caixa fechada que só resolve o caso ideal?",
      solution:
        "Separei tokens, componentes e padrões de composição. Cada exemplo inclui estados vazios, mensagens de erro, navegação por teclado e comportamento em telas estreitas.",
      outcome:
        "Um catálogo navegável que permite comparar estados e testar combinações. O estudo registra os motivos de cada decisão para facilitar a evolução do sistema.",
      stack: ["React", "Tailwind CSS", "Storybook", "Acessibilidade"],
      role: "Design de interface & frontend",
      duration: "4 semanas · projeto de estudo",
      links: [],
      visual: "system",
    },
    {
      id: "03",
      slug: "orbita",
      isDemo: true,
      title: "Órbita",
      category: "Experimento",
      year: "2025",
      summary:
        "Um laboratório de navegação espacial: explorar relações entre ideias como quem sintoniza uma estação.",
      challenge:
        "Representar conexões em uma cena 3D sem deixar a navegação dependente de precisão do mouse ou de um computador potente.",
      solution:
        "Combinei um mapa orbital em WebGL com uma lista textual equivalente. Os controles funcionam com teclado, os modelos se adaptam ao espaço disponível e a renderização pausa fora da tela.",
      outcome:
        "Uma prova de conceito de exploração visual com uma alternativa de leitura direta. O experimento continua aberto para testar outras formas de organizar o conteúdo.",
      stack: ["Three.js", "WebGL", "React", "TypeScript"],
      role: "Direção visual & creative development",
      duration: "2 semanas · laboratório pessoal",
      links: [],
      visual: "orbital",
    },
  ],
  experience: [
    {
      id: "exp-01",
      isDemo: true,
      period: "2026 — agora",
      title: "Interfaces de ponta a ponta",
      company: "Projetos independentes · exemplo",
      description:
        "Uma fase dedicada a ligar decisões de interface à estrutura da aplicação, do primeiro fluxo à publicação.",
      highlights: [
        "Organização de componentes e dados",
        "Integração de APIs e estados de interface",
        "Revisão em dispositivos móveis",
      ],
    },
    {
      id: "exp-02",
      isDemo: true,
      period: "2025 — 2026",
      title: "Sistemas que podem crescer",
      company: "Estudos aplicados · exemplo",
      description:
        "Projetos de aprendizado para trabalhar persistência, autenticação e contratos entre frontend e backend.",
      highlights: [
        "Modelagem de dados relacionais",
        "Documentação de decisões técnicas",
        "Testes dos fluxos essenciais",
      ],
    },
    {
      id: "exp-03",
      isDemo: true,
      period: "2024 — 2025",
      title: "Primeiros experimentos na web",
      company: "Laboratório pessoal · exemplo",
      description:
        "Exploração de HTML, CSS e JavaScript por meio de pequenas ferramentas, páginas e estudos de interação.",
      highlights: [
        "Fundamentos de semântica e layout",
        "Animações com propósito",
        "Git como registro do processo",
      ],
    },
  ],
  skills: [
    {
      id: "interface",
      label: "Interface & interação",
      description:
        "Transformar fluxo e hierarquia em telas que respondem com clareza, inclusive quando algo dá errado.",
      tools: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "HTML semântico",
        "Acessibilidade",
      ],
      command: "render --clear --responsive",
    },
    {
      id: "system",
      label: "Dados & aplicação",
      description:
        "Conectar a interface a dados organizados, regras explícitas e contratos que possam ser mantidos.",
      tools: [
        "Node.js",
        "REST APIs",
        "PostgreSQL",
        "Modelagem de dados",
        "Git",
        "Deploy",
      ],
      command: "connect --typed --persistent",
    },
    {
      id: "lab",
      label: "Web criativa & 3D",
      description:
        "Usar movimento, espaço e material para dar personalidade ao conteúdo sem competir com a leitura.",
      tools: [
        "Three.js",
        "WebGL",
        "CSS Animations",
        "SVG",
        "Figma",
        "Prototipação",
      ],
      command: "explore --motion-with-purpose",
    },
  ],
  process: [
    {
      number: "01",
      title: "Entender o sinal",
      description:
        "Quem vai usar, qual tarefa importa e o que precisa ficar claro antes de escolher uma tecnologia.",
      deliverable: "Problema, contexto & fluxo essencial",
    },
    {
      number: "02",
      title: "Montar o circuito",
      description:
        "Organizar dados e componentes, testar a hierarquia e construir primeiro o menor caminho completo.",
      deliverable: "Protótipo navegável & estrutura técnica",
    },
    {
      number: "03",
      title: "Testar na bancada",
      description:
        "Percorrer o fluxo no celular, com teclado e em estados de erro. Ajustar o que atrapalha a tarefa.",
      deliverable: "Interface revisada & fluxos verificados",
    },
    {
      number: "04",
      title: "Colocar no ar",
      description:
        "Publicar, documentar as escolhas e deixar um caminho compreensível para a próxima mudança.",
      deliverable: "Deploy, documentação & próximos passos",
    },
  ],
  notes: [
    {
      id: "nota-01",
      isDemo: true,
      tag: "INTERFACE",
      date: "2026-10-28",
      readTime: "2 min",
      title: "Uma boa tela de erro também é produto",
      excerpt:
        "O fluxo não termina quando a requisição falha. É ali que a interface precisa ser mais útil.",
      body: [
        "Um botão que muda para ‘Algo deu errado’ não explica o que aconteceu nem devolve o controle para quem está usando. Antes de desenhar o estado ideal, vale escrever o que a pessoa pode fazer quando ele não aparece.",
        "Em um formulário, isso pode significar preservar os dados preenchidos e apontar o campo que precisa de revisão. Em uma lista, manter a última resposta enquanto oferece uma nova tentativa. A decisão depende do risco de mostrar informação antiga.",
        "Meu roteiro de revisão é simples: a mensagem diz o que falhou, mantém o contexto e oferece um próximo passo possível? Se não, ainda há trabalho de interface a fazer.",
      ],
    },
    {
      id: "nota-02",
      isDemo: true,
      tag: "WEBGL",
      date: "2026-10-12",
      readTime: "2 min",
      title: "O melhor frame pode ser o que você não renderiza",
      excerpt:
        "Dar pausa a uma cena fora da tela é uma decisão visual e também uma decisão sobre bateria.",
      body: [
        "Uma cena 3D pode continuar gastando recursos depois que a pessoa já passou por ela. Em um portfólio longo, duas animações rodando fora da área visível não tornam a experiência mais expressiva.",
        "IntersectionObserver ajuda a saber quando o modelo está à vista. A visibilidade da aba e a preferência por menos movimento também entram nessa decisão. No celular, limitar a densidade de pixels pode valer mais que aumentar detalhes imperceptíveis.",
        "A intenção é manter a sensação do objeto, não perseguir um número de frames. Um bom experimento visual precisa saber quando ficar quieto.",
      ],
    },
    {
      id: "nota-03",
      isDemo: true,
      tag: "PROCESSO",
      date: "2026-09-30",
      readTime: "2 min",
      title: "Componentes bons deixam espaço para a próxima mudança",
      excerpt:
        "Separar conteúdo de layout parece pequeno até chegar a primeira revisão de texto.",
      body: [
        "Quando dados de projeto, textos e marcação moram no mesmo bloco, uma revisão editorial vira uma busca entre classes e condições. Separar essas camadas permite mudar o conteúdo sem mexer na estrutura visual.",
        "Isso não exige criar uma abstração para cada detalhe. Um arquivo tipado de conteúdo costuma ser suficiente no começo: nomes claros, campos previsíveis e uma forma de distinguir rascunhos de informações publicáveis.",
        "A pergunta que uso é: alguém conseguiria trocar um projeto neste site sem entender como o componente inteiro funciona? Se a resposta for sim, a separação já está fazendo seu trabalho.",
      ],
    },
  ],
  contact: {
    headline: "Qual é o próximo problema interessante?",
    description:
      "Me conte o contexto, o que você quer construir e onde o projeto está hoje. Uma boa conversa já é um ponto de partida.",
    email: "arthur.roberto@example.com",
    topics: [
      "Oportunidades de trabalho",
      "Interfaces & produtos",
      "Experimentos para a web",
    ],
    availability: "Aberto a conversar · contato de exemplo",
  },
};
