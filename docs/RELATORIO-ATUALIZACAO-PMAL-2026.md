# Relatório de Atualização PMAL 2026

## 1. Escopo aplicado
Atualização institucional da Polícia Militar do Estado de Alagoas (PMAL) no portal UniSegPub, seguindo o padrão de cadastro, remuneração, direitos, concursos, associações e ações judiciais usado para a PMESP.

## 2. Campos revisados
- Chave institucional `pmal` incluída na lista mestra de instituições válidas.
- Estado de Alagoas vinculado à PMAL no mapa de estados.
- Resumo institucional revisado com nome completo, sigla, UF, tipo, criação, efetivo ativo, inativos/reserva estimados, efetivo feminino estimado, população, relação ativo/população, governador, comando, estrutura, sede, emergência e links oficiais.
- Histórico institucional incluído com origem em 03/02/1832, Decisão Imperial nº 52, reconhecimento oficial da data, Banda de Música, reativação de 1912, desmembramento do CBMAL, chegada da primeira turma feminina e marcos recentes.
- Remuneração tabelada criada para a PMAL: valores oficiais do edital PMAL/Cebraspe 2026 para Soldado-Aluno, Soldado, Cadetes e Aspirante; demais postos e graduações marcados como estimados quando não localizados em tabela oficial consolidada de 2026.
- Concursos PMAL 2026 incluídos com CFO e CFP, vagas, remuneração, banca, etapas, requisitos e cautela sobre novo edital.
- Direitos revisados com SPSM/AL, subsídio, serviço voluntário remunerado, Força Tarefa, assistência, tempo de serviço, insalubridade/periculosidade e previdência/proteção social.
- Associações e entidades representativas cadastradas em bloco cauteloso, com campos completos e indicação de conferência direta.
- Ações judiciais comuns cadastradas para subsídio/enquadramento, SPSM/AL, serviço voluntário/Força Tarefa, promoção/carreira e concurso PMAL 2026.

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
- `docs/RELATORIO-ATUALIZACAO-PMAL-2026.md`

## 4. Validação técnica
- `node --check` executado em todos os 25 arquivos JavaScript do projeto.
- Resultado: aprovado, sem erro sintático detectado.

## 5. Fontes de referência
- Governo do Estado de Alagoas / PMAL — matéria oficial de 04/03/2026 sobre 194 anos, efetivo ativo, estrutura e histórico.
- Site oficial da Polícia Militar de Alagoas — emergência 190, sede/endereço, links institucionais.
- Cebraspe — Concurso PM AL 26, edital e página oficial do certame.
- SAPL/ALEAL — Lei AL nº 8.671/2022, SPSM/AL.
- SAPL/ALEAL / legislação estadual — Lei AL nº 7.580/2014 e normas remuneratórias correlatas.
- Portal da Transparência/AL, SEPLAG/AL, Diário Oficial/AL e legislação estadual para conferência de rubricas individuais.

## 6. Observações de cautela
- Efetivo ativo foi cadastrado com número oficial divulgado em 2026.
- Reserva/inativos, efetivo feminino e parte da tabela remuneratória superior foram marcados como estimados por não haver tabela consolidada pública localizada para todos os postos/graduações em abril/2026.
- Valores de remuneração não incluem automaticamente serviço voluntário, Força Tarefa, diárias, indenizações, rubricas pessoais, retroativos ou decisões judiciais.
- A contribuição e a base do SPSM/AL devem ser conferidas no contracheque, na Lei AL nº 8.671/2022 e nos atos de gestão da PMAL/CBMAL.
- Não afirmar novo concurso aberto fora do edital PMAL 2026 sem fonte oficial posterior.
