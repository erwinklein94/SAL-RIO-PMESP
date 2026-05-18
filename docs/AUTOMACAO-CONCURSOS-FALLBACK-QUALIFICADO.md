# Etapa 17 — fallback qualificado para todas as instituições

Esta correção resolve o problema observado na PMSC e vale para todas as instituições cadastradas.

## Antes

```text
fonte direta falhou
→ OpenAI não era chamada
→ conteúdo antigo era preservado
```

Isso era correto no modo econômico, mas impedia o modo qualificado de fazer a pesquisa profunda.

## Agora

```text
modo_qualidade = economico
+ fonte direta falhou
= preserva conteúdo e não chama OpenAI
```

```text
modo_qualidade = qualificado
+ fonte direta falhou
= chama OpenAI com web_search
= busca fontes oficiais alternativas
= publica apenas se passar no score
= salva rascunho se continuar fraco
```

## Como usar

Use uma instituição por vez:

```text
instituicao: pmsc
limite: 1
forcar_atualizacao: true
usar_web_search: true
modo_qualidade: qualificado
```

Depois teste outras da mesma forma.

## Total configurado

- Instituições configuradas: 47
- Prioridade 1: 10
- Prioridade 2: 37

## Segurança mantida

Mesmo no modo qualificado, o sistema continua proibido de publicar resultado ruim.
Se não passar no score, o resultado vai para:

```text
data/concursos/_rascunhos/{instituicao}.json
```

e o JSON principal continua preservado.
