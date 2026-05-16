# Correção — PCDF no seletor de Ações Judiciais e links do Guia

Data: 2026-05-16

## Ajustes aplicados

- PCDF tratada como instituição federal/distrital nas consultas internas do portal (`getEsferaConsultaInstituicao`).
- PCDF incluída explicitamente na lista da esfera Federal usada pelos seletores dinâmicos.
- Cards estáticos da PCDF ajustados para `data-esfera="federal"` quando aplicável.
- Card da PCDF em Ações Judiciais recebeu `id="acoes-pcdf"` para permitir link direto.
- Fallback em `js/pages/acoes-conteudo-estatico.js` garante que a opção PCDF seja inserida no seletor mesmo se algum HTML antigo/cache não a trouxer.
- Links relacionados do Guia PCDF atualizados para páginas reais e âncoras existentes:
  - artigo completo de salário;
  - remuneração PCDF;
  - concursos PCDF;
  - ações judiciais PCDF;
  - brasão e história PCDF;
  - direitos;
  - comparador de carreiras.
- Links relacionados do artigo PCDF convertidos para caminhos relativos funcionais dentro da pasta `/artigos/`.
- Query strings dos scripts alterados atualizadas para reduzir risco de cache antigo.

## Arquivos principais alterados

- `acoes-judiciais.html`
- `guia-instituicoes.html`
- `artigos/salario-pcdf-2026.html`
- `js/ui/header-estados.js`
- `js/pages/acoes-conteudo-estatico.js`
- `js/pages/guia-instituicoes.js`
- `concursos.html`
- `remuneracao.html`
- `brasoes.html`
- `noticias.html`

## Reforços adicionais

- PCDF movida para o grupo `União` nos seletores de Remuneração, Concursos e Brasões, mantendo `data-esfera="federal"`.
- Links com âncora para PCDF agora são tratados pelos scripts de Remuneração, Concursos, Brasões e Ações, evitando que a paginação esconda o card de destino.
- `mudarInstituicao('pcdf')` recebeu configuração explícita para não cair no fallback da PMESP.
