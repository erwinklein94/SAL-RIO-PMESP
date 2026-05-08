# Relatório de atualização — PPMT — 07/05/2026

## Escopo aplicado
Completar a PPMT como carreira penal estadual vinculada à SEJUS/MT, com tabela 40h, concursos, ações, associações e cautelas pós-EC 104.

## Campos revisados
- POLICIAS_PENAIS_INFO.ppmt preenchido com SEJUS/MT, Secretaria Adjunta de Administração Penitenciária, atribuições e estrutura.
- HEADER_INSTITUICOES_RESUMO preenchido com efetivo, população custodiada, relação e fontes.
- CARGOS_PPMT cadastrado por tabela 40h do Portal do Servidor/SEPLAG-MT, com níveis/classes até 2026.
- CONCURSOS.ppmt criado para monitoramento de edital futuro, sem afirmar concurso aberto.
- ASSOCIACOES.ppmt já estruturado com SINDSPPEN-MT e entidades locais; ACOES_JUDICIAIS.ppmt criado com tabela, verbas condicionadas e aposentadoria/porte/regulamentação.

## Arquivos alterados
- `js/data/policia-penal.js`
- `js/ui/header-estados.js`
- `js/data/concursos-data.js`
- `js/data/associacoes-data.js`
- `js/data/acoes-judiciais-data.js`
- `js/services/remuneracao.js`
- `js/services/direitos.js`
- `js/ui/navegacao-ui.js`

## Validação técnica
- `node --check` executado nos arquivos JS modificados do lote sem erro de sintaxe.
- Chave institucional revisada: `ppmt`.
- Campos sem fonte exata foram mantidos como estimativa, aprox. ou consulta oficial, sem transformar projeções em números definitivos.

## Fontes de referência
- SEJUS/MT; Portal do Servidor/SEPLAG-MT; MTPREV; SINDSPPEN-MT; Diário Oficial/MT.

## Observações de cautela
- Tabela do Portal do Servidor foi tratada como referência de 40h; adicionais, plantões, indenizações e auxílio-alimentação não foram somados automaticamente.
- Não tratar vantagem, ação judicial, adicional, indenização ou aposentadoria como automática sem conferir lei, ficha funcional, ato administrativo e contracheque.
- Não confundir vencimento-base, subsídio ou salário inicial de edital com remuneração total individual.
