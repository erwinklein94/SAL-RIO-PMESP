# Relatório — Guia das instituições com artigos do Rio de Janeiro

## Arquivos alterados

- `guia-instituicoes.html`
- `js/pages/guia-instituicoes.js`
- `sitemap.xml`
- `artigos/salario-pmerj-2026-tabela-completa.html`
- `artigos/salario-pcerj-2026-tabela-completa.html`
- `artigos/salario-pprj-2026-tabela-completa.html`
- `docs/RELATORIO-GUIA-INSTITUICOES-ARTIGOS-RJ-2026-05-12.md`

## O que foi feito

Foram adicionados à aba **Guia das instituições** três artigos completos do Rio de Janeiro, seguindo o mesmo modelo editorial e técnico usado nos cards de São Paulo:

1. **Salário PMERJ 2026: tabela completa, adicionais e como ingressar** (`data-guia-inst="pmerj"`)
2. **Salário PCERJ 2026: tabela completa, adicionais e como ingressar** (`data-guia-inst="pcerj"`)
3. **Salário Polícia Penal RJ 2026: tabela completa, adicionais e como ingressar** (`data-guia-inst="pprj"`)

Os textos foram incorporados diretamente em `guia-instituicoes.html`, dentro de cards grandes e filtráveis. Os blocos internos de anúncios e CTAs com placeholder foram removidos dentro da aba para evitar duplicidade visual e links vazios.

## Filtro por instituição

O fallback do `js/pages/guia-instituicoes.js` foi atualizado para incluir PMERJ, PCERJ e PPRJ, preservando o funcionamento do filtro mesmo se as funções globais de consulta não estiverem disponíveis.

## Páginas próprias dos artigos

Os três HTMLs enviados também foram incluídos na pasta `/artigos/` usando os slugs canônicos dos próprios arquivos. Os caminhos de brasão foram ajustados para os arquivos já existentes no projeto:

- PMERJ: `img/MILITAR/pmerj.webp`
- PCERJ: `img/CIVIL/pcrj.webp`
- PPRJ: `img/PENAL/pprj.webp`

## SEO

- A meta description do Guia foi atualizada para citar PMERJ, PCERJ e Polícia Penal RJ.
- O JSON-LD da página recebeu três novos objetos `Article`, apontando para os anchors internos dos novos cards.
- O `sitemap.xml` foi atualizado com `lastmod` da página do Guia e com as três URLs dos artigos próprios.
