# Automação de Concursos — todas as instituições cadastradas

Esta etapa expande o motor genérico de concursos para todas as instituições que já existem na página `concursos.html` e no arquivo `js/data/concursos-data.js`.

## Total configurado

- Instituições configuradas: **47**
- Prioridade 1: **10**
- Prioridade 2: **37**

## Regra de segurança mantida

O motor continua usando proteção de qualidade:

1. monitora fontes oficiais sem OpenAI;
2. só chama OpenAI quando houver mudança, revalidação por prazo ou execução forçada;
3. mescla com dados antigos para não trocar conteúdo útil por `não encontrado`;
4. bloqueia publicação ruim e salva rascunho em `data/concursos/_rascunhos/`.

## Como rodar com segurança

Comece com uma instituição individual:

```text
instituicao: pcdf
limite: 1
forcar_atualizacao: false
usar_web_search: false
```

Depois rode lote pequeno:

```text
instituicao: prioridade_2
limite: 3
forcar_atualizacao: false
usar_web_search: false
```

Não rode `todas_configuradas` com limite alto antes de validar custo e qualidade.

## Instituições configuradas

| ID | Sigla | UF | Prioridade | Arquivo |
|---|---:|---:|---:|---|
| `prf` | PRF | BR | 1 | `data/concursos/prf.json` |
| `pf` | PF | BR | 1 | `data/concursos/pf.json` |
| `pcdf` | PCDF | DF | 2 | `data/concursos/pcdf.json` |
| `pmesp` | PMESP | SP | 1 | `data/concursos/pmesp.json` |
| `bmsp` | CBPMESP | SP | 2 | `data/concursos/bmsp.json` |
| `pcsp` | PCSP | SP | 1 | `data/concursos/pcsp.json` |
| `ppsp` | PPSP | SP | 2 | `data/concursos/ppsp.json` |
| `pmal` | PMAL | AL | 2 | `data/concursos/pmal.json` |
| `pcal` | PCAL | AL | 2 | `data/concursos/pcal.json` |
| `ppal` | PPAL | AL | 2 | `data/concursos/ppal.json` |
| `bmmg` | CBMMG | MG | 2 | `data/concursos/bmmg.json` |
| `ppmg` | PPMG | MG | 2 | `data/concursos/ppmg.json` |
| `pmmg` | PMMG | MG | 1 | `data/concursos/pmmg.json` |
| `pcmg` | PCMG | MG | 1 | `data/concursos/pcmg.json` |
| `bmpr` | CBMPR | PR | 2 | `data/concursos/bmpr.json` |
| `pmpr` | PMPR | PR | 2 | `data/concursos/pmpr.json` |
| `pcpr` | PCPR | PR | 2 | `data/concursos/pcpr.json` |
| `pmam` | PMAM | AM | 2 | `data/concursos/pmam.json` |
| `pcam` | PCAM | AM | 2 | `data/concursos/pcam.json` |
| `pmerj` | PMERJ | RJ | 1 | `data/concursos/pmerj.json` |
| `bmrj` | CBMERJ | RJ | 2 | `data/concursos/bmrj.json` |
| `pcerj` | PCERJ | RJ | 1 | `data/concursos/pcerj.json` |
| `pmba` | PMBA | BA | 1 | `data/concursos/pmba.json` |
| `pcba` | PCBA | BA | 1 | `data/concursos/pcba.json` |
| `pmrs` | PMRS | RS | 2 | `data/concursos/pmrs.json` |
| `pcrs` | PCRS | RS | 2 | `data/concursos/pcrs.json` |
| `pmsc` | PMSC | SC | 2 | `data/concursos/pmsc.json` |
| `bmsc` | CBMSC | SC | 2 | `data/concursos/bmsc.json` |
| `pcsc` | PCSC | SC | 2 | `data/concursos/pcsc.json` |
| `pmes` | PMES | ES | 2 | `data/concursos/pmes.json` |
| `bmes` | CBMES | ES | 2 | `data/concursos/bmes.json` |
| `pces` | PCES | ES | 2 | `data/concursos/pces.json` |
| `pmms` | PMMS | MS | 2 | `data/concursos/pmms.json` |
| `bmms` | CBMMS | MS | 2 | `data/concursos/bmms.json` |
| `pcms` | PCMS | MS | 2 | `data/concursos/pcms.json` |
| `ppms` | PPMS | MS | 2 | `data/concursos/ppms.json` |
| `pmmt` | PMMT | MT | 2 | `data/concursos/pmmt.json` |
| `bmmt` | CBMMT | MT | 2 | `data/concursos/bmmt.json` |
| `pcmt` | PCMT | MT | 2 | `data/concursos/pcmt.json` |
| `ppmt` | PPMT | MT | 2 | `data/concursos/ppmt.json` |
| `pmac` | PMAC | AC | 2 | `data/concursos/pmac.json` |
| `pcac` | PCAC | AC | 2 | `data/concursos/pcac.json` |
| `ppac` | PPAC | AC | 2 | `data/concursos/ppac.json` |
| `pmap` | PMAP | AP | 2 | `data/concursos/pmap.json` |
| `pcap` | PCAP | AP | 2 | `data/concursos/pcap.json` |
| `bmap` | CBMAP | AP | 2 | `data/concursos/bmap.json` |
| `pcce` | PCCE | CE | 2 | `data/concursos/pcce.json` |
