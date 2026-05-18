# Etapa 20 — camada editorial antes de exibir no site

Esta etapa corrige o problema em que a pesquisa qualificada da OpenAI aparecia no site como texto de log, com links Markdown, URLs, `utm_source=openai`, domínios entre colchetes e justificativas internas.

## Mudança principal

O motor passa a separar:

```text
pesquisa bruta / fontes
```

de:

```text
texto final exibido ao usuário
```

## Regras editoriais adicionadas ao prompt

A OpenAI agora recebe instruções explícitas para:

- não colocar URLs nos campos visíveis;
- não usar links Markdown dentro de `edital`, `salario`, `vagas`, etc.;
- não colocar domínios entre colchetes;
- não usar `utm_source`;
- não escrever justificativas internas de pesquisa;
- colocar links somente no array `fontes`;
- escrever texto curto, claro e publicável para visitante leigo.

## Pós-processamento automático

Mesmo se a IA errar, o script agora limpa os campos antes de salvar o JSON principal.

Ele remove:

```text
[texto](https://...)
https://...
www....
utm_source=openai
[pm.sc.gov.br]
[fonte]
parênteses vazios
frases internas como “trecho coletado”
```

## Proteção no front-end

O arquivo `js/pages/concursos-automacao.js` também limpa os textos antes de exibir.

Isso ajuda inclusive em JSONs que já foram gerados antes desta correção.

## Como testar

Depois de subir o patch, abra o site e pressione:

```text
Ctrl + F5
```

A página da PMSC deve deixar de mostrar links quebrados, `utm_source=openai` e textos parecidos com log de pesquisa.

Para gerar uma nova versão melhor:

```text
instituicao: pmsc
limite: 1
forcar_atualizacao: true
usar_web_search: true
modo_qualidade: qualificado
```

## Observação

Esta etapa melhora a apresentação e impede sujeira visual no site. Para melhorar ainda mais a profundidade das informações, o próximo passo é enriquecer as fontes e consultas específicas de cada instituição.
