# Relatório de Atualização — PCAM 2026

## 1. Escopo aplicado
Atualização institucional da Polícia Civil do Estado do Amazonas (PCAM) no portal UniSegPub, usando o padrão de campos e cautelas aplicado à PMESP.

## 2. Campos revisados
- Inclusão da chave `pcam` como instituição válida e vínculo ao estado do Amazonas.
- Atualização do `HEADER_INSTITUICOES_INFO`, imagem `img/CIVIL/pcam.webp` e ficha completa em `HEADER_INSTITUICOES_RESUMO`.
- Origem histórica detalhada: marco nacional de 1808, organização estadual de 1922, carreiras em 1971 e Decreto AM nº 2.291/1972.
- Comando atualizado para Delegado Bruno de Paula Fraga, conforme página oficial do Governo do Amazonas/SSP-AM.
- Estrutura operacional preenchida com DIPs, delegacias especializadas, seccionais, CORE-AM, DRCO, DENARC e presença no interior.
- Remuneração tabelada inserida com base na Lei AM nº 7.446/2025, Anexo III, com efeitos financeiros a partir de 01/12/2025.
- Concurso PCAM/FGV 2021/2022 mantido como histórico/convocações 2026, sem publicar como novo edital aberto.
- Direitos, previdência, assistência, adicionais, ações judiciais e associações preenchidos com cautelas de conferência individual.

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
- `docs/RELATORIO-ATUALIZACAO-PCAM-2026.md`

## 4. Validação técnica
- `node --check` aplicado aos arquivos JS alterados.
- `node --check` aplicado a todos os arquivos `.js` do projeto.
- `brasoes-mapeados-webp.json` já continha `pcam` apontando para `img/CIVIL/pcam.webp`.

## 5. Fontes de referência
- Polícia Civil do Amazonas — Museu PCAM — Nossa História.
- Governo do Amazonas — página institucional da Polícia Civil do Estado do Amazonas.
- SSP-AM — perfil do Delegado Bruno de Paula Fraga.
- Agência Amazonas/Casa Civil — posses e convocações do concurso PCAM 2021/2022.
- FGV Conhecimento — Concurso PCAM 2021/2022.
- ALEAM/SAPL — Lei AM nº 7.446/2025.
- IBGE — população estimada do Amazonas em 2025.

## 6. Observações de cautela
- O efetivo ativo foi apresentado como `2.000+ policiais e 160+ administrativos`, conforme página histórica oficial da PCAM; inativos e efetivo feminino ficaram como `Dados em breve` por falta de número oficial consolidado.
- A remuneração foi cadastrada como bruto mensal de tabela legal, sem somar plantões, adicionais, função, decisões judiciais, retroativos, saúde, previdência ou rubricas pessoais.
- Escrivão e Investigador usam a Quinta Parcela do Escalonamento da Lei AM nº 4.576/2018 conforme Anexo III da Lei AM nº 7.446/2025.
- O concurso PCAM/FGV 2021/2022 não foi tratado como novo edital aberto; foi registrado como certame histórico com convocações/posses em 2026.
