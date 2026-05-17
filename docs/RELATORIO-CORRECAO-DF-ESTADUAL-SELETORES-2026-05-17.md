# Correção de esfera nos seletores — Distrito Federal

Data: 2026-05-17

## Regra aplicada

- Instituições com final **Distrito Federal** devem aparecer como **Estadual** nos seletores do site.
- O grupo **União/Federal** deve ficar restrito a:
  - PF — Polícia Federal
  - PRF — Polícia Rodoviária Federal

## Arquivos ajustados

- `acoes-judiciais.html`
- `associacoes-sindicatos.html`
- `brasoes.html`
- `concursos.html`
- `guia-instituicoes.html`
- `noticias.html`
- `remuneracao.html`
- `js/pages/acoes-conteudo-estatico.js`
- `js/pages/guia-instituicoes.js`
- `js/ui/header-estados.js`

## Ajustes feitos

- PCDF saiu do grupo **União** e passou para **Distrito Federal (DF)** nos seletores estáticos.
- PCDF passou de `data-esfera="federal"` para `data-esfera="estadual"` nos filtros e cards afetados.
- O seletor dinâmico usado nas abas internas agora retorna como federal apenas `pf` e `prf`.
- O guia da PCDF passou a contar como estadual/distrital, e não como federal/distrital.

## Observação editorial

Textos que explicam custeio, organização ou manutenção pela União foram preservados quando tratam do regime jurídico/material da instituição. A correção aqui foi de **classificação de navegação/filtro do portal**: Distrito Federal fica no bloco estadual/distrital.
