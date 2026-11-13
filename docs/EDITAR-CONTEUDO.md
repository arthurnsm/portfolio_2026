# Conteúdo do portfólio

O conteúdo fica em `data/portfolio.ts`. Os exemplos fictícios foram substituídos por informações já publicadas no GitHub de Arthur e por três projetos reais. Para mudar os textos, edite esse arquivo; o layout está separado nos componentes e no CSS.

## Perfil e contato

Em `profile`, edite nome, cargo, apresentação (`intro`), parágrafos (`bio`) e interesses (`interests`). O contato é definido uma única vez na constante `email`, usada pelo perfil e pela seção de contato. `github` e `linkedin` recebem URLs completas.

A apresentação foi baseada no [README público do perfil](https://github.com/arthurnsm/arthurnsm/blob/main/README.md): estudante de Ciência da Computação, desenvolvimento com React/Next.js/TypeScript/Tailwind CSS e interesse em eletrônica, sistemas embarcados e hardware hacking. O cargo da hero foi preservado. O email e o LinkedIn também vieram desse README.

Em `contact`, altere o título (`headline`), o convite (`description`) e a pequena identificação (`label`). Não há indicador fictício de disponibilidade.

## Projetos

Cada item de `projects` contém:

- `id` e `slug`: identificadores únicos.
- `title`, `category`, `year`: nome, filtro e ano mostrado. As categorias atuais são `Interface`, `Backend` e `Experimento`.
- `summary`: descrição curta do que foi construído.
- `note`: uma observação breve, específica do projeto.
- `stack`: tecnologias efetivamente utilizadas.
- `details`: blocos `{ title, text }` apresentados ao abrir o projeto. Use-os para contexto, implementação e estado atual.
- `links`: destinos reais no formato `{ label, url }`.
- `preview`: uma imagem ou um trecho do código.

Para uma imagem, use `{ kind: "image", src, alt, caption }`. Coloque o arquivo em `public/projects/`; o `src` começa com `/projects/`. Descreva a imagem em `alt` e mantenha os créditos do design em `note` ou `details`.

Para código, use `{ kind: "code", filename, lines, caption }`. `lines` é uma lista de linhas exibidas como texto, sem execução. Use trechos do projeto e indique qualquer adaptação. Evite logs, métricas ou resultados simulados.

Os anos atuais correspondem à criação dos repositórios públicos. Não indicam o tempo gasto no desenvolvimento. Duração, número de usuários e resultados comerciais foram omitidos porque não havia fontes para esses dados.

### Fontes dos projetos

**Caffino — 2025**

- [README e crédito do design](https://github.com/arthurnsm/Caffino/blob/main/README.md).
- [Dependências e tecnologias](https://github.com/arthurnsm/Caffino/blob/main/package.json).
- [Site publicado](https://caffino-six.vercel.app/).
- Captura da página inicial publicada, salva em `public/projects/caffino.webp`.
- Design de referência: [Ihda 'Abidat](https://www.figma.com/@ihdaabidat). Arthur implementou a interface; não atribuir a ele a autoria desse design nem apresentar a cafeteria fictícia como cliente.

**NerdPromos — 2025**

- [Repositório público](https://github.com/arthurnsm/NerdPromos_backend).
- [Coletor do Magalu](https://github.com/arthurnsm/NerdPromos_backend/blob/main/magalu.py) e [coletor do Mercado Livre](https://github.com/arthurnsm/NerdPromos_backend/blob/main/mercado-livre.py).
- [Unificação e classificação com Ollama](https://github.com/arthurnsm/NerdPromos_backend/blob/main/unifier.py), fonte do trecho de código exibido. Apenas as quebras de linha foram adaptadas para a prévia.
- É um projeto local de scripts; não há link de produto web. As descrições não afirmam que a coleta foi executada ou validada nesta revisão do portfólio.

**Vulnscan — 2026**

- [Repositório público](https://github.com/arthurnsm/vulnscan).
- [Interface](https://github.com/arthurnsm/vulnscan/blob/main/app/page.tsx), [integração local](https://github.com/arthurnsm/vulnscan/blob/main/app/submit.tsx) e [API FastAPI](https://github.com/arthurnsm/vulnscan/blob/main/backend/api/main.py).
- [Orquestrador](https://github.com/arthurnsm/vulnscan/blob/main/backend/routes/fast_orchestrator.py), fonte do trecho de código exibido.
- O projeto é apresentado como experimento em desenvolvimento. O front-end aponta para uma API local e a apresentação de resultados está em evolução. Nenhuma varredura é executada pelo portfólio.

## Experiências e formação

`experience` está vazio porque não havia empregos, empresas ou períodos confirmados nas fontes. A formação aparece na biografia como “estudante de Ciência da Computação”, sem inventar instituição ou datas.

Para acrescentar uma experiência real, adicione um item com `id`, `title`, `company`, `period`, `description` e `highlights`. Use períodos e responsabilidades que você possa confirmar. Não é necessário preencher a seção apenas para ocupar espaço.

As antigas coleções de habilidades, processo e notas fictícias foram removidas.

## Atividade no GitHub

`app/api/github-activity/route.ts` consulta o calendário público de `arthurnsm` e mantém cache de uma hora. O componente `components/GitHubActivity.tsx` mostra contribuições reais, sem números de demonstração.

Para trocar de conta, altere o usuário na rota, no componente e em `profile.github`. O calendário é de contribuições do GitHub, que podem incluir outras atividades além de commits. Se a consulta falhar, a interface informa a indisponibilidade e mantém o link para o perfil.
