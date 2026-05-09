# Relatório de atualização — PCAL — 2026

## 1. Escopo aplicado
Inclusão e revisão da Polícia Civil do Estado de Alagoas (`pcal`) no portal UniSegPub, seguindo o padrão institucional, remuneratório e jurídico usado para a PMESP.

## 2. Campos revisados
- Cadastro institucional: chave `pcal`, sigla PCAL, tipo Polícia Civil, UF Alagoas e brasão `img/CIVIL/pcal.webp`.
- Header/resumo: origem histórica, estrutura, sede, contatos, comando, população, relação ativo/população e fontes.
- Histórico institucional: origem, marcos e ato criador com base no histórico oficial da PCAL.
- Remuneração: criada tabela por Delegado DPC-1 a DPC-4 e Agente/Escrivão por nível/referência, com valores não consolidados marcados como `estimado`.
- Concursos: cadastrada comissão PCAL 2026 para Agente e Escrivão, com 300 vagas previstas; sem publicar como edital aberto.
- Direitos: adicionados textos específicos de saúde/assistência, RPPS, tempo de serviço, subsídio, rubricas eventuais, acúmulo extraordinário e concurso.
- Associações: incluídos SINDPOL-AL, ADEPOL-AL e canais institucionais da PCAL.
- Ações judiciais: incluídos temas de enquadramento/remuneração, Delegado, previdência policial, concurso e rubricas eventuais.

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
- `docs/RELATORIO-ATUALIZACAO-PCAL-2026.md`

## 4. Validação técnica
Executado `node --check` em todos os 25 arquivos JavaScript do projeto. Nenhum erro sintático detectado.

## 5. Fontes de referência
- Polícia Civil de Alagoas — Institucional/histórico, sede, contatos e efetivo aproximado.
- Governo de Alagoas — comissão dos concursos da Polícia Civil e Fapeal, 300 vagas PCAL.
- SAPL/ALEAL — Lei AL nº 8.641/2022, carreira e tabela de subsídios de Delegados PCAL.
- Leis estaduais citadas em bases da carreira: Lei AL nº 3.437/1975, Lei AL nº 6.441/2003, Lei AL nº 6.276/2001, Lei AL nº 6.277/2001, Lei AL nº 7.602/2014, Lei AL nº 9.551/2025 e atos relacionados.
- Diário Oficial/AL e Governo de Alagoas para comando interino em 2026.

## 6. Observações de cautela
- Efetivo ativo foi tratado como ordem de grandeza institucional e aparece com `estimado`.
- Reserva/inativos e efetivo feminino ficaram como `Dados em breve` por ausência de fonte consolidada localizada.
- Remuneração de Agente/Escrivão e parte da tabela de Delegado foi cadastrada como estimativa técnica; usar contracheque, ficha financeira, DOE/AL e tabela oficial consolidada antes de qualquer cálculo individual.
- Concurso PCAL 2026 está com comissão formada; não há edital aberto nesta revisão.
- Rubricas eventuais, plantões, adicional noturno, acúmulo extraordinário, diárias, indenizações e parcelas pessoais não foram somados automaticamente.
