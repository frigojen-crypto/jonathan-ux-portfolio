# Sprint 01 · Baseline e plano de recuperação
Data: 2026-11-21

## Estado preservado
- Vercel Project: `prj_4YD6L8MAOxLMhjmT9XbcB61XWYdz`
- Vercel deployment (preview): `dpl_7HUmfqHwbdd6QWScKQbyXYMgfrAT` — READY.
- URL de referência: https://jonathan-ux-portfolio-k8mc0zr26-jap2.vercel.app/pt
- Domínio atribuído ao projeto: `jonathan-ux-portfolio.vercel.app`
- Stack observada: Next.js 15.5.29 / React 19 / Three.js 0.187.
- Origem do deploy exposta na árvore Vercel; arquivos longos são devolvidos truncados pela integração. **NÃO** presumir que a cópia foi recuperada.
- O GitHub estava vazio na data do inventário; o primeiro commit criou apenas README de recuperação.

## Rotas observadas (HTTP 200 via Vercel autenticada)
`/`, `/pt`, `/pt/sobre`, `/pt/cv`, `/pt/jedai`, `/pt/fixiciti`, `/pt/circulo-atemporal`, `/pt/biblioteca-atemporal`.

Essas respostas autenticadas NÃO atestam que a página é pública para visitantes anônimos.

## Evidências da dívida técnica
- `src/app/pt/page.js`: `JEDAI`, `/pt/jedai`, `n: "01"`, `n: "02"` etc. Origem precisa ser corrigida.
- `src/app/components/BrandNameCleaner.js`: limpeza de texto via `TreeWalker` e `replace(/jedai/gi,"Gdai")` após render.
- `src/app/components/NumberCleaner.js`: remoção de marcadores via efeitos no DOM.
- `src/app/remove-numbers.css`: oculta índices decorativos por CSS.
- A versão em inglês usa `lang=pt-BR` em `/`.

## Ordem de correção, somente quando o código COMPLETO estiver recuperado
1. Copiar toda a fonte e assets correspondentes, excluir secrets, `.env*` e artefatos de build. Confirmar que `npm ci && npm run build` reproduz a aplicação.
2. Conservar `/pt/jedai` e `/jedai` como redirects permanentes para `/pt/gdai` e `/gdai`, respectivamente; atualizar títulos, textos visíveis e metadados nas rotas canônicas, inclusive CV, resumo, links internos e acessibilidade. **Não** substituir nomes dentro de códigos/URLs de APIs sem examinar dependências.
3. Remover chaves `n`, renderização de `.hc-shot-index`, índices decorativos, cabeçalhos com `01 ·` na origem, sem tocar números substantivos (anos, métricas, etapas de jornadas).
4. Remover `BrandNameCleaner`, `NumberCleaner` e regras CSS obsoletas apenas após todos os componentes e páginas não dependerem deles.
5. Validar build, HTML SSR, todas as rotas e sem regressão visual desktop/mobile. Validar canonical de GDAI e redirects antigos.
6. Publicar produção pública isoladamente, mantendo acesso protegido aos previews. Testar URL final em sessão anônima antes de divulgar.

## Critérios de aceite
- `GDAI` no HTML servido, no título, em links e nos cases, sem `JEDAI` em texto visível (exceção de links de compatibilidade em redirects).
- Sem marcadores 01/02/03/04 **decorativos**; conservar números informativos de UX, pesquisa e currículo.
- Nenhuma rotina de limpeza de texto do DOM em runtime.
- Nenhuma rota quebrada, sem alteração visual involuntária, aplicação buildando.
- Público navega produção anonimamente; previews continuam com proteção.
- Antes/depois documentado.

## Restrições desta etapa
Não alterar configurações de SSO, não promover preview, não publicar o README como app e não fazer deploy do repositório antes de recuperar o código.
