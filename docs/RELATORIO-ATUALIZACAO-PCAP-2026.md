# Relatório de atualização — PCAP — 2026

## 1. Escopo aplicado
Atualização institucional da Polícia Civil do Estado do Amapá (PCAP) no portal UniSegPub, replicando o padrão de dossiê aplicado à PMESP, com cadastro, resumo, histórico, cargos, remuneração tabelada, concursos, direitos, associações e ações judiciais.

## 2. Campos revisados
- Inclusão da chave `pcap` como instituição válida e vinculada ao estado do Amapá.
- Cadastro do nome oficial, sigla pública, tipo institucional, brasão `.webp`, cor-tema e alerta previdenciário.
- Resumo institucional com criação/origem, comando, estrutura, sede, emergência, links oficiais, efetivo estimado, população e relação ativa/população.
- Histórico institucional com parágrafo de origem e marcos normativos/administrativos.
- Tabela de cargos `CARGOS_PCAP` com Delegado e Oficial Investigador/Agente/Oficial por classe, nível e padrão.
- Remuneração tabelada oficial com base na tabela SEAD/AP do Grupo Polícia Civil, vigência 01/04/2024, Lei AP nº 3.037/2024.
- Texto de adicionais com cautela para plantões, adicional noturno, funções, diárias, retroativos, previdência, saúde e rubricas pessoais.
- Concurso PCAP 2017/SEAD-AP mantido como certame em acompanhamento/convocações e curso de formação em 2026; novo concurso 2026 tratado como previsão até edital oficial.
- Direitos e vantagens com bases estaduais e cautela para AMPRev/AP, aposentadoria policial, classe/padrão, promoção, progressão, plantões e subsídio.
- Associações e canais institucionais relacionados à categoria.
- Ações judiciais cabíveis como hipóteses de conferência individual/coletiva, sem promessa de ganho automático.

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
- `docs/RELATORIO-ATUALIZACAO-PCAP-2026.md`

## 4. Validação técnica
- Executar `node --check` nos arquivos JS alterados.
- Executar `node --check` em todos os arquivos `.js` do projeto.
- Validar `brasoes-mapeados-webp.json` como JSON válido.
- Testar integridade do arquivo `.zip` final.

## 5. Fontes de referência
- Polícia Civil do Estado do Amapá — portal oficial e páginas institucionais.
- Governo do Estado do Amapá / SEAD-AP — concursos vigentes e atos do concurso PCAP 2017.
- Diário Oficial do Estado do Amapá — publicações do Conselho Superior/DGPC e atos administrativos.
- SEAD/AP — tabela de subsídios do Grupo Polícia Civil, vigência 01/04/2024, Lei AP nº 3.037/2024.
- Lei AP nº 637/2001 — estrutura organizacional básica da Polícia Civil.
- Lei AP nº 883/2005 — organização/estrutura da Polícia Civil e órgãos de direção.
- Lei AP nº 3.037/2024 — remuneração/subsídio do Grupo Polícia Civil.
- IBGE 2025 — população estimada do Amapá.
- Publicações institucionais sobre SINPOL-AP e ADEPOL-AP.

## 6. Observações de cautela
- Efetivo ativo, inativos/reserva e efetivo feminino foram marcados como estimados por ausência de tabela pública consolidada oficial recente no portal institucional.
- Valores de remuneração representam subsídio/tabela oficial por cargo, classe, nível e padrão; não somam plantões, adicionais, diárias, funções, retroativos, decisões judiciais, abono de permanência, descontos ou rubricas pessoais.
- Novo concurso PCAP 2026 deve permanecer como previsão/planejamento até publicação de edital oficial pela SEAD/AP.
- Ações judiciais foram cadastradas como hipóteses de análise, sempre dependentes de caso concreto, ficha funcional, contracheque, atos publicados e orientação jurídica individual.
