# Relatório de atualização — PPMG — 07/05/2026

## Escopo aplicado
Completar a PPMG com edital 2025/2026, estrutura SEJUSP/MG, remuneração inicial e cautelas de Lei Orgânica/carreira.

## Campos revisados
- POLICIAS_PENAIS_INFO.ppmg preenchido com SEJUSP/MG, atribuições, formação, saúde, previdência e concurso.
- HEADER_INSTITUICOES_RESUMO já preenchido com efetivo, presos atendidos, relação e fontes.
- CONCURSOS.ppmg criado com Edital SEJUSP/MG 01/2025, 1.178 vagas, remuneração inicial R$ 5.332,64, Instituto AOCP e 146.321 inscritos nas provas de 25/01/2026.
- ASSOCIACOES.ppmg criado com SINPOLPEN-MG, entidades associativas e canais SEJUSP/MG.
- ACOES_JUDICIAIS.ppmg criado com concurso, Lei Orgânica/carreira e verbas/aposentadoria em abordagem cautelosa.

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
- Chave institucional revisada: `ppmg`.
- Campos sem fonte exata foram mantidos como estimativa, aprox. ou consulta oficial, sem transformar projeções em números definitivos.

## Fontes de referência
- SEJUSP/MG; Departamento Penitenciário/SEJUSP-MG; Instituto AOCP; ALMG; IPSEMG.

## Observações de cautela
- Ajuda de custo e benefícios foram tratados como condicionados; remuneração inicial não foi usada para estimar remuneração total individual.
- Não tratar vantagem, ação judicial, adicional, indenização ou aposentadoria como automática sem conferir lei, ficha funcional, ato administrativo e contracheque.
- Não confundir vencimento-base, subsídio ou salário inicial de edital com remuneração total individual.
