# Etapa 23 — Cobertura total da aba Concursos

Esta etapa completa a automação de concursos para todas as instituições esperadas no site.

## Resultado

- Total esperado no modelo completo: **110 instituições**
- Já configuradas antes: **47 instituições**
- Adicionadas agora: **63 instituições**
- PF e PRF estão incluídas no total.

## O que mudou

1. `config/concursos-instituicoes.json` agora contempla as 110 instituições.
2. Foram criados JSONs iniciais para as instituições que ainda não existiam em `data/concursos/`.
3. A página de concursos agora consegue adicionar automaticamente opções e cards que existirem no `config`, mesmo que não estejam escritos manualmente no HTML antigo.
4. O workflow aceita `prioridade_3`, criada para a primeira rodada das instituições recém-adicionadas.
5. O relatório de qualidade passa a considerar todas as instituições do config.
6. Instituições com concurso compartilhado podem reaproveitar dados para evitar gasto duplicado. Inicialmente, `bmsp` reaproveita `pmesp` no modo econômico.

## Como usar

Primeiro rode o relatório:

```text
Relatório de Qualidade - Concursos → Run workflow
```

Depois rode a primeira leva das novas instituições em lotes pequenos:

```text
instituicao: prioridade_3
limite: 5
forcar_atualizacao: true
usar_web_search: true
modo_qualidade: qualificado
```

Não rode `prioridade_3` com limite alto no modo qualificado logo de início. Faça em lotes de 5 ou 10 para controlar custo.

## Instituições adicionadas nesta etapa

- `ppam` — PPAM · Polícia Penal de Amazonas (AM)
- `ppap` — PPAP · Polícia Penal de Amapá (AP)
- `pmce` — PMCE · Polícia Militar de Ceará (CE)
- `ppce` — PPCE · Polícia Penal de Ceará (CE)
- `pmdf` — PMDF · Polícia Militar de Distrito Federal (DF)
- `ppdf` — PPDF · Polícia Penal de Distrito Federal (DF)
- `pmgo` — PMGO · Polícia Militar de Goiás (GO)
- `pcgo` — PCGO · Polícia Civil de Goiás (GO)
- `ppgo` — PPGO · Polícia Penal de Goiás (GO)
- `pmma` — PMMA · Polícia Militar de Maranhão (MA)
- `pcma` — PCMA · Polícia Civil de Maranhão (MA)
- `ppma` — PPMA · Polícia Penal de Maranhão (MA)
- `pmpa` — PMPA · Polícia Militar de Pará (PA)
- `pcpa` — PCPA · Polícia Civil de Pará (PA)
- `pppa` — PPPA · Polícia Penal de Pará (PA)
- `pmpb` — PMPB · Polícia Militar de Paraíba (PB)
- `pcpb` — PCPB · Polícia Civil de Paraíba (PB)
- `pppb` — PPPB · Polícia Penal de Paraíba (PB)
- `pmpe` — PMPE · Polícia Militar de Pernambuco (PE)
- `pcpe` — PCPE · Polícia Civil de Pernambuco (PE)
- `pppe` — PPPE · Polícia Penal de Pernambuco (PE)
- `pmpi` — PMPI · Polícia Militar de Piauí (PI)
- `pcpi` — PCPI · Polícia Civil de Piauí (PI)
- `pppi` — PPPI · Polícia Penal de Piauí (PI)
- `pmrn` — PMRN · Polícia Militar de Rio Grande do Norte (RN)
- `pcrn` — PCRN · Polícia Civil de Rio Grande do Norte (RN)
- `pprn` — PPRN · Polícia Penal de Rio Grande do Norte (RN)
- `pmro` — PMRO · Polícia Militar de Rondônia (RO)
- `pcro` — PCRO · Polícia Civil de Rondônia (RO)
- `ppro` — PPRO · Polícia Penal de Rondônia (RO)
- `pmrr` — PMRR · Polícia Militar de Roraima (RR)
- `pcrr` — PCRR · Polícia Civil de Roraima (RR)
- `pprr` — PPRR · Polícia Penal de Roraima (RR)
- `pmse` — PMSE · Polícia Militar de Sergipe (SE)
- `pcse` — PCSE · Polícia Civil de Sergipe (SE)
- `ppse` — PPSE · Polícia Penal de Sergipe (SE)
- `pmto` — PMTO · Polícia Militar de Tocantins (TO)
- `pcto` — PCTO · Polícia Civil de Tocantins (TO)
- `ppto` — PPTO · Polícia Penal de Tocantins (TO)
- `bmac` — BMAC · Corpo de Bombeiros Militar do Acre (AC)
- `bmal` — BMAL · Corpo de Bombeiros Militar de Alagoas (AL)
- `bmam` — BMAM · Corpo de Bombeiros Militar do Amazonas (AM)
- `bmba` — BMBA · Corpo de Bombeiros Militar da Bahia (BA)
- `bmce` — BMCE · Corpo de Bombeiros Militar do Ceará (CE)
- `bmdf` — BMDF · Corpo de Bombeiros Militar do Distrito Federal (DF)
- `bmgo` — BMGO · Corpo de Bombeiros Militar do Estado de Goiás (GO)
- `bmma` — BMMA · Corpo de Bombeiros Militar do Maranhão (MA)
- `bmpa` — BMPA · Corpo de Bombeiros Militar do Pará (PA)
- `bmpb` — BMPB · Corpo de Bombeiros Militar da Paraíba (PB)
- `bmpe` — BMPE · Corpo de Bombeiros Militar de Pernambuco (PE)
- `bmpi` — BMPI · Corpo de Bombeiros Militar do Piauí (PI)
- `bmrn` — BMRN · Corpo de Bombeiros Militar do Rio Grande do Norte (RN)
- `bmro` — BMRO · Corpo de Bombeiros Militar de Rondônia (RO)
- `bmrr` — BMRR · Corpo de Bombeiros Militar de Roraima (RR)
- `bmrs` — BMRS · Corpo de Bombeiros Militar do Rio Grande do Sul (RS)
- `bmse` — BMSE · Corpo de Bombeiros Militar de Sergipe (SE)
- `bmto` — BMTO · Corpo de Bombeiros Militar do Tocantins (TO)
- `pprj` — PPRJ · Polícia Penal do Rio de Janeiro (RJ)
- `ppba` — PPBA · Polícia Penal da Bahia (BA)
- `pppr` — PPPR · Polícia Penal do Paraná (PR)
- `pprs` — PPRS · Polícia Penal do Rio Grande do Sul (RS)
- `ppsc` — PPSC · Polícia Penal de Santa Catarina (SC)
- `ppes` — PPES · Polícia Penal do Espírito Santo (ES)
