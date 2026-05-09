# Relatório de atualização — CBMMT — 2026

## 1. Escopo aplicado
Atualização institucional do Corpo de Bombeiros Militar do Estado de Mato Grosso (`bmmt`), replicando o padrão usado para PMESP e demais bombeiros estaduais no portal UniSegPub.

## 2. Campos revisados
- Inclusão da chave `bmmt` no cadastro de instituições válidas.
- Vínculo do CBMMT ao Estado de Mato Grosso no seletor de UF.
- Header institucional com nome oficial, siglas, criação, comando, estrutura, sede, emergência, links, fontes e cautelas.
- Histórico institucional com origem em 1964, início operacional em 1967 e autonomia em 1994.
- Tabela de cargos/remuneração em modelo detalhado, com subsídio por posto/graduação/nível e linhas oficiais de Aluno-a-Oficial e Aspirante do edital 007/2022.
- Direitos, saúde, proteção social, vantagens específicas, concursos, associações e ações judiciais.

## 3. Arquivos alterados
- `js/data/portal-config.js`
- `js/ui/header-estados.js`
- `js/data/parametros-cargos.js`
- `js/services/remuneracao.js`
- `js/services/direitos.js`
- `js/data/concursos-data.js`
- `js/data/associacoes-data.js`
- `js/data/acoes-judiciais-data.js`
- `js/ui/navegacao-ui.js`
- `brasoes-mapeados-webp.json`
- `docs/RELATORIO-ATUALIZACAO-CBMMT-2026.md`

## 4. Validação técnica
Executado após a edição com resultado OK para todos os 25 arquivos JavaScript do projeto e, individualmente, para os arquivos alterados:

```bash
node --check js/data/portal-config.js
node --check js/ui/header-estados.js
node --check js/data/parametros-cargos.js
node --check js/services/remuneracao.js
node --check js/services/direitos.js
node --check js/data/concursos-data.js
node --check js/data/associacoes-data.js
node --check js/data/acoes-judiciais-data.js
node --check js/ui/navegacao-ui.js
```

## 5. Fontes de referência
- Portal oficial do CBMMT — história, notícias, concursos e legislação.
- Lei Complementar MT nº 775/2023 — organização básica do CBMMT.
- Lei Complementar MT nº 541/2014 e alterações — remuneração dos militares estaduais.
- Lei MT nº 13.220/2026 — revisão geral anual 2026.
- Edital SEPLAG/SESP/CBMMT nº 007/2022 — Aluno-a-Oficial/Aspirante.
- IOMAT, SEPLAG-MT, SESP-MT, MTPREV/MT, Portal da Transparência/MT e IBGE.

## 6. Observações de cautela
- Efetivo ativo real não foi inferido como dado oficial fechado; quando usado número aproximado, o label indica `(estimado)`.
- Valores de remuneração não incluem automaticamente etapa alimentação, fardamento, diárias, indenizações, temporários, PTTC, função ou rubricas pessoais.
- RGA e enquadramento individual devem ser conferidos em tabela oficial consolidada, ficha funcional, publicação no IOMAT e contracheque.
- Concurso novo só deve ser tratado como aberto quando houver edital oficial vigente.
