# Relatório simples de qualidade dos concursos

Gerado em: 2026-05-17

## Resumo

- Total: 110
- Pendentes: 11
- Atualização fraca: 38
- Atualização forte: 61

## Como atualizar

### Pendentes

Use no GitHub Actions:

```text
grupo_atualizacao: pendentes
quantidade: 5
modelo_openai: gpt-5.4-mini, gpt-5.4 ou gpt-5.5
```

### Fracas

```text
grupo_atualizacao: fracas
quantidade: 5
modelo_openai: gpt-5.4-mini, gpt-5.4 ou gpt-5.5
```

### Fortes

```text
grupo_atualizacao: fortes
quantidade: 5
modelo_openai: gpt-5.4-mini
```

## Instituições pendentes

| Sigla | Instituição | UF | Classe | Score | Motivos |
|---|---|---:|---|---:|---|
| PMRR | Polícia Militar de Roraima | RR | pendente | 8 | precisa primeira atualização; campos críticos sem dado: salario, escolaridade |
| PPAM | Polícia Penal de Amazonas | AM | pendente | 12 | precisa primeira atualização; campos críticos sem dado: vagas, banca |
| PCRN | Polícia Civil de Rio Grande do Norte | RN | pendente | 18 | precisa primeira atualização; campos críticos sem dado: salario |
| PPMA | Polícia Penal de Maranhão | MA | pendente | 20 | precisa primeira atualização; campos críticos sem dado: salario, vagas |
| PPRO | Polícia Penal de Rondônia | RO | pendente | 24 | precisa primeira atualização; campos críticos sem dado: salario, etapas |
| CBMMS | Corpo de Bombeiros Militar de Mato Grosso do Sul | MS | pendente | 27 | precisa primeira atualização; campos genéricos: salario, cotas, idade, escolaridade; campos críticos genéricos: salario, escolaridade |
| BMRO | Corpo de Bombeiros Militar de Rondônia | RO | pendente | 28 | precisa primeira atualização; campos críticos sem dado: salario, banca |
| PMDF | Polícia Militar de Distrito Federal | DF | pendente | 30 | precisa primeira atualização; campos críticos sem dado: etapas |
| PPDF | Polícia Penal de Distrito Federal | DF | pendente | 34 | precisa primeira atualização; campos críticos sem dado: escolaridade |
| PPCE | Polícia Penal de Ceará | CE | pendente | 42 | precisa primeira atualização; campos críticos sem dado: salario |
| PMTO | Polícia Militar de Tocantins | TO | pendente | 43 | precisa primeira atualização; campos genéricos: etapas; campos críticos sem dado: salario; campos críticos genéricos: etapas |

## Instituições fracas

| Sigla | Instituição | UF | Classe | Score | Motivos |
|---|---|---:|---|---:|---|
| PMPI | Polícia Militar de Piauí | PI | fraca | 48 | conteúdo fraco ou genérico; campos críticos sem dado: salario, escolaridade |
| PPGO | Polícia Penal de Goiás | GO | fraca | 48 | conteúdo fraco ou genérico |
| PPPB | Polícia Penal de Paraíba | PB | fraca | 48 | conteúdo fraco ou genérico |
| PPRN | Polícia Penal de Rio Grande do Norte | RN | fraca | 52 | conteúdo fraco ou genérico |
| PCTO | Polícia Civil de Tocantins | TO | fraca | 54 | conteúdo fraco ou genérico; campos críticos sem dado: escolaridade |
| PMRO | Polícia Militar de Rondônia | RO | fraca | 54 | conteúdo fraco ou genérico; campos críticos sem dado: salario |
| PMCE | Polícia Militar de Ceará | CE | fraca | 56 | conteúdo fraco ou genérico |
| PPTO | Polícia Penal de Tocantins | TO | fraca | 56 | conteúdo fraco ou genérico |
| PPPA | Polícia Penal de Pará | PA | fraca | 60 | conteúdo fraco ou genérico |
| PPPE | Polícia Penal de Pernambuco | PE | fraca | 60 | conteúdo fraco ou genérico |
| PPRJ | Polícia Penal do Rio de Janeiro | RJ | fraca | 60 | conteúdo fraco ou genérico |
| BMMA | Corpo de Bombeiros Militar do Maranhão | MA | fraca | 62 | conteúdo fraco ou genérico; campos críticos sem dado: salario |
| PCPB | Polícia Civil de Paraíba | PB | fraca | 62 | conteúdo fraco ou genérico; campos críticos sem dado: salario |
| PMMA | Polícia Militar de Maranhão | MA | fraca | 62 | conteúdo fraco ou genérico; campos críticos sem dado: salario |
| PPMS | Polícia Penal de Mato Grosso do Sul | MS | fraca | 62 | conteúdo fraco ou genérico; campos genéricos: vagas, banca; campos críticos genéricos: vagas, banca |
| BMPI | Corpo de Bombeiros Militar do Piauí | PI | fraca | 64 | conteúdo fraco ou genérico |
| BMRN | Corpo de Bombeiros Militar do Rio Grande do Norte | RN | fraca | 64 | conteúdo fraco ou genérico |
| PPES | Polícia Penal do Espírito Santo | ES | fraca | 64 | conteúdo fraco ou genérico |
| BMRR | Corpo de Bombeiros Militar de Roraima | RR | fraca | 68 | conteúdo fraco ou genérico |
| BMSE | Corpo de Bombeiros Militar de Sergipe | SE | fraca | 68 | conteúdo fraco ou genérico |
| BMTO | Corpo de Bombeiros Militar do Tocantins | TO | fraca | 68 | conteúdo fraco ou genérico |
| PCPA | Polícia Civil de Pará | PA | fraca | 68 | conteúdo fraco ou genérico |
| PPRR | Polícia Penal de Roraima | RR | fraca | 68 | conteúdo fraco ou genérico |
| PMPB | Polícia Militar de Paraíba | PB | fraca | 70 | conteúdo fraco ou genérico; campos críticos sem dado: banca |
| PMESP | Polícia Militar do Estado de São Paulo | SP | fraca | 74 | conteúdo fraco ou genérico; campos genéricos: cotas, etapas; campos críticos genéricos: etapas |
| BMDF | Corpo de Bombeiros Militar do Distrito Federal | DF | fraca | 76 | conteúdo fraco ou genérico |
| BMGO | Corpo de Bombeiros Militar do Estado de Goiás | GO | fraca | 76 | conteúdo fraco ou genérico |
| BMPA | Corpo de Bombeiros Militar do Pará | PA | fraca | 76 | conteúdo fraco ou genérico |
| BMPE | Corpo de Bombeiros Militar de Pernambuco | PE | fraca | 76 | conteúdo fraco ou genérico |
| PCPE | Polícia Civil de Pernambuco | PE | fraca | 76 | conteúdo fraco ou genérico |
| PCPI | Polícia Civil de Piauí | PI | fraca | 76 | conteúdo fraco ou genérico |
| PCSE | Polícia Civil de Sergipe | SE | fraca | 76 | conteúdo fraco ou genérico |
| PPRS | Polícia Penal do Rio Grande do Sul | RS | fraca | 76 | conteúdo fraco ou genérico |
| PMSC | Polícia Militar de Santa Catarina | SC | fraca | 79 | conteúdo fraco ou genérico; campos genéricos: cotas, idade, estagio |
| CBMMT | Corpo de Bombeiros Militar do Estado de Mato Grosso | MT | fraca | 81 | conteúdo fraco ou genérico; campos genéricos: etapas; campos críticos genéricos: etapas |
| PPMT | Polícia Penal de Mato Grosso | MT | fraca | 81 | conteúdo fraco ou genérico; campos genéricos: banca; campos críticos genéricos: banca |
| PPMG | Polícia Penal de Minas Gerais | MG | fraca | 86 | conteúdo fraco ou genérico; campos genéricos: idade, cfsd |
| PPSP | Polícia Penal do Estado de São Paulo | SP | fraca | 86 | conteúdo fraco ou genérico; campos genéricos: cotas, validade |

## Instituições fortes

| Sigla | Instituição | UF | Classe | Score | Motivos |
|---|---|---:|---|---:|---|
| BMPB | Corpo de Bombeiros Militar da Paraíba | PB | forte | 78 | campos críticos sem dado: banca |
| BMAC | Corpo de Bombeiros Militar do Acre | AC | forte | 84 | conteúdo bom |
| BMBA | Corpo de Bombeiros Militar da Bahia | BA | forte | 84 | conteúdo bom |
| BMRS | Corpo de Bombeiros Militar do Rio Grande do Sul | RS | forte | 84 | conteúdo bom |
| PCGO | Polícia Civil de Goiás | GO | forte | 84 | conteúdo bom |
| PCMA | Polícia Civil de Maranhão | MA | forte | 84 | conteúdo bom |
| PCRO | Polícia Civil de Rondônia | RO | forte | 84 | conteúdo bom |
| PCRR | Polícia Civil de Roraima | RR | forte | 84 | conteúdo bom |
| PMGO | Polícia Militar de Goiás | GO | forte | 84 | conteúdo bom |
| PMPA | Polícia Militar de Pará | PA | forte | 84 | conteúdo bom |
| PMRN | Polícia Militar de Rio Grande do Norte | RN | forte | 84 | conteúdo bom |
| PPAP | Polícia Penal de Amapá | AP | forte | 84 | conteúdo bom |
| PPSC | Polícia Penal de Santa Catarina | SC | forte | 84 | conteúdo bom |
| PPSE | Polícia Penal de Sergipe | SE | forte | 84 | conteúdo bom |
| PCAP | Polícia Civil do Estado do Amapá | AP | forte | 86 | campos genéricos: cotas, materias |
| PMES | Polícia Militar do Espírito Santo | ES | forte | 86 | campos genéricos: inscritos, validade |
| PMMS | Polícia Militar de Mato Grosso do Sul | MS | forte | 86 | campos genéricos: cotas, validade |
| PCAC | Polícia Civil do Acre | AC | forte | 88 | conteúdo bom |
| PCERJ | Polícia Civil do Rio de Janeiro | RJ | forte | 88 | conteúdo bom |
| BMAL | Corpo de Bombeiros Militar de Alagoas | AL | forte | 92 | conteúdo bom |
| BMCE | Corpo de Bombeiros Militar do Ceará | CE | forte | 92 | conteúdo bom |
| PCSC | Polícia Civil de Santa Catarina | SC | forte | 92 | conteúdo bom |
| PMPE | Polícia Militar de Pernambuco | PE | forte | 92 | conteúdo bom |
| PMPR | Polícia Militar do Paraná | PR | forte | 92 | conteúdo bom |
| PMSE | Polícia Militar de Sergipe | SE | forte | 92 | conteúdo bom |
| PPBA | Polícia Penal da Bahia | BA | forte | 92 | conteúdo bom |
| PPPI | Polícia Penal de Piauí | PI | forte | 92 | conteúdo bom |
| PPPR | Polícia Penal do Paraná | PR | forte | 92 | conteúdo bom |
| CBMAP | Corpo de Bombeiros Militar do Amapá | AP | forte | 93 | campos genéricos: validade |
| CBMMG | Corpo de Bombeiros Militar de Minas Gerais | MG | forte | 93 | campos genéricos: validade |
| CBMSC | Corpo de Bombeiros Militar de Santa Catarina | SC | forte | 93 | campos genéricos: cotas |
| CBPMESP | Corpo de Bombeiros da Polícia Militar do Estado de São Paulo | SP | forte | 93 | campos genéricos: cotas |
| PCES | Polícia Civil do Espírito Santo | ES | forte | 93 | campos genéricos: inscritos |
| PCMG | Polícia Civil de Minas Gerais | MG | forte | 93 | campos genéricos: idade |
| PCMS | Polícia Civil de Mato Grosso do Sul | MS | forte | 93 | campos genéricos: validade |
| PCMT | Polícia Judiciária Civil de Mato Grosso | MT | forte | 93 | campos genéricos: validade |
| PCRS | Polícia Civil do Rio Grande do Sul | RS | forte | 93 | campos genéricos: materias |
| PMAP | Polícia Militar do Estado do Amapá | AP | forte | 93 | campos genéricos: cotas |
| BMAM | Corpo de Bombeiros Militar do Amazonas | AM | forte | 100 | conteúdo bom |
| CBMES | Corpo de Bombeiros Militar do Estado do Espírito Santo | ES | forte | 100 | conteúdo bom |
| CBMPR | Corpo de Bombeiros Militar do Paraná | PR | forte | 100 | conteúdo bom |
| CBMERJ | Corpo de Bombeiros Militar do Estado do Rio de Janeiro | RJ | forte | 100 | conteúdo bom |
| PCAL | Polícia Civil do Estado de Alagoas | AL | forte | 100 | conteúdo bom |
| PCAM | Polícia Civil do Estado do Amazonas | AM | forte | 100 | conteúdo bom |
| PCBA | Polícia Civil da Bahia | BA | forte | 100 | conteúdo bom |
| PCCE | Polícia Civil do Estado do Ceará | CE | forte | 100 | conteúdo bom |
| PCDF | Polícia Civil do Distrito Federal | DF | forte | 100 | conteúdo bom |
| PCPR | Polícia Civil do Paraná | PR | forte | 100 | conteúdo bom |
| PCSP | Polícia Civil do Estado de São Paulo | SP | forte | 100 | conteúdo bom |
| PF | Polícia Federal | BR | forte | 100 | conteúdo bom |
| PMAC | Polícia Militar do Acre | AC | forte | 100 | conteúdo bom |
| PMAL | Polícia Militar do Estado de Alagoas | AL | forte | 100 | conteúdo bom |
| PMAM | Polícia Militar do Estado do Amazonas | AM | forte | 100 | conteúdo bom |
| PMBA | Polícia Militar da Bahia | BA | forte | 100 | conteúdo bom |
| PMERJ | Polícia Militar do Rio de Janeiro | RJ | forte | 100 | conteúdo bom |
| PMMG | Polícia Militar de Minas Gerais | MG | forte | 100 | conteúdo bom |
| PMMT | Polícia Militar de Mato Grosso | MT | forte | 100 | conteúdo bom |
| PMRS | Brigada Militar do Rio Grande do Sul | RS | forte | 100 | conteúdo bom |
| PPAC | Polícia Penal do Acre | AC | forte | 100 | conteúdo bom |
| PPAL | Polícia Penal do Estado de Alagoas | AL | forte | 100 | conteúdo bom |
| PRF | Polícia Rodoviária Federal | BR | forte | 100 | conteúdo bom |
