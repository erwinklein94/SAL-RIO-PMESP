# Relatório de Atualização — CBMPR — 2026

## Escopo aplicado
Atualização institucional do Corpo de Bombeiros Militar do Paraná (`bmpr`) no padrão UniSegPub/PMESP, com ficha institucional, histórico, concursos, associações, ações judiciais e remuneração tabelada.

## Campos revisados
- Identificação institucional: CBMPR, Bombeiro Militar, Paraná/PR.
- Origem: Lei PR nº 1.133/1912, com antecedente histórico na Lei Provincial nº 679/1882.
- Efetivo ativo: 3.146 ativos conforme referência institucional de 12/2025.
- Efetivo legal: 5.704 cargos conforme Lei PR nº 22.916/2025.
- População: 11.890.517 habitantes (estimado IBGE 2025).
- Relação ativa/população marcada como estimada.
- Comando: Cel QOBM Antônio Geraldo Hiller Lino.
- Remuneração: Lei PR nº 22.187/2024, Anexo I, Tabela I, valores publicados nas tabelas vigentes da Administração/PR em julho/2025.
- Concursos: Soldado BM 2025 e Cadete BM 2025.

## Arquivos alterados
- js/data/portal-config.js
- js/ui/header-estados.js
- js/data/parametros-cargos.js
- js/services/remuneracao.js
- js/services/direitos.js
- js/data/concursos-data.js
- js/data/associacoes-data.js
- js/data/acoes-judiciais-data.js
- js/ui/navegacao-ui.js
- docs/RELATORIO-ATUALIZACAO-CBMPR-2026.md

## Validação técnica
- node --check aplicado nos arquivos JS alterados.

## Fontes de referência
- CBMPR — Histórico institucional.
- CBMPR — Comando-Geral.
- CBMPR — Concursos.
- Administração/PR — Carreiras e Tabelas Salariais.
- Legislação/PR — Leis PR nº 1.133/1912, 22.187/2024, 22.916/2025 e 23.103/2026.
- ParanáPrevidência.
- FASPM.
- IBGE/AEN — estimativa populacional 2025.

## Observações de cautela
- População e relação ativa/população foram marcadas como estimadas.
- Reserva/inativos e efetivo feminino ficaram em “Dados em breve”.
- Auxílio-alimentação, FASPM, contribuição militar, diárias, indenizações, serviço extraordinário e rubricas pessoais não foram somados automaticamente ao subsídio.
