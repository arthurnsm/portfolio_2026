# Editar o conteúdo do portfólio

O conteúdo das seções abaixo da hero fica em [`data/portfolio.ts`](../data/portfolio.ts). Os textos, projetos, experiências e endereço de e-mail fornecidos são exemplos. Não representam trabalhos, resultados ou histórico profissional confirmados.

## Primeira revisão

1. Troque `profile.intro` e os dois primeiros parágrafos de `profile.bio` pela sua apresentação.
2. Substitua os três exemplos de `projects` pelos seus trabalhos. Conte o problema em `challenge`, sua decisão em `solution` e o resultado verificável em `outcome`. Não precisa inventar números.
3. Atualize `experience` com sua trajetória real. Cursos, projetos de estudo e trabalhos independentes podem ser identificados pelo que são.
4. As antigas seções de habilidades, processo e notas foram removidas da interface. Seus dados permanecem no arquivo como rascunhos, sem serem exibidos.
5. Troque `profile.email` e `contact.email` pelo seu endereço real. O endereço `example.com` não recebe suas mensagens. Preencha `profile.linkedin` com a URL completa; uma string vazia indica que esse link ainda não está disponível.
6. Mude `isDemo` para `false` nos itens revisados e, por último, no objeto `portfolio`. Enquanto ele for `true`, mantenha o aviso de conteúdo demonstrativo visível na interface.

## Projetos

Cada item usa um `id` e um `slug` únicos. `category` aceita `Interface`, `Full stack` ou `Experimento`. `visual` escolhe a apresentação ilustrativa: `terminal`, `system` ou `orbital`.

`links` começa vazio para não criar botões que prometem demonstrações inexistentes. Quando houver destinos reais, adicione, por exemplo:

```ts
links: [
  { label: "Abrir projeto", url: "https://seu-dominio.dev" },
  { label: "Ver código", url: "https://github.com/seu-usuario/seu-projeto" },
],
```

Prefira títulos concretos e explique sua participação em `role`. Use `duration` para contextualizar o trabalho, não para sugerir produtividade ou resultados que não foram medidos.

## Atividade no GitHub

O quadro busca contribuições públicas reais de `arthurnsm` pelo endpoint `/api/github-activity`, com cache de uma hora. Quando a consulta falha, a interface oferece um link para o perfil; não inventa dados. Contribuições incluem mais do que commits. Para trocar a conta, atualize o usuário no endpoint e no componente `GitHubActivity`.

## Hero e estilos

A composição da hero e os estilos ficam nos componentes. Este arquivo de conteúdo controla a narrativa inferior; ele não é uma configuração visual. Para trocar cores, tipografia ou comportamento, revise os componentes e o CSS separadamente.

Depois da edição, execute `npm run lint` e `npm run build`. Publique uma prévia da branch antes de promover mudanças ao domínio principal.
