# Relatório — Remoção de páginas descontinuadas

Data: 2026-05-17

## Objetivo

Remover do projeto as páginas editoriais descontinuadas sobre consulta legislativa e competências/deveres, evitando arquivos obsoletos, links internos quebrados e URLs indevidas no sitemap.

## Alterações aplicadas

- Removidas as duas páginas HTML públicas descontinuadas.
- Removidos os scripts, dados, estilos, templates e partials exclusivos dessas páginas.
- Removido o link residual em artigo que apontava para uma das páginas excluídas.
- Atualizado o gerador de sitemap para não reintroduzir as URLs removidas.
- Regenerado o sitemap apenas com páginas públicas existentes, indexáveis e canônicas.

## Validação

- Sitemap gerado novamente com o script do projeto.
- Validação XML executada com sucesso.
- Conferência de ausência de links internos para as URLs removidas nos arquivos HTML públicos.
