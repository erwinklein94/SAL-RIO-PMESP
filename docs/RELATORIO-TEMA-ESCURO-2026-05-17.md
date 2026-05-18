# Relatório — Tema escuro com botão no cabeçalho

Data: 2026-05-17

## Objetivo

Criar um tema escuro opcional para o Universo Segurança Pública mantendo o tema claro como padrão do site.

## Decisões aplicadas

- O tema claro continua sendo o padrão para novos visitantes.
- O tema escolhido pelo visitante é salvo em `localStorage` usando a chave `theme`.
- O botão aparece no topo do site com o texto inicial **Modo escuro**.
- Ao ativar o tema escuro, o botão muda para **Modo claro**, permitindo voltar ao padrão.
- Em páginas com cabeçalho do redesign, o botão é inserido na faixa superior do cabeçalho para não apertar o menu principal.
- Em páginas de artigos/notícias sem cabeçalho completo, o botão aparece de forma discreta no canto superior direito.
- O tema escuro usa azul escuro como base, texto claro para leitura e amarelo insígnia em bordas, estados ativos, detalhes e realces.

## Arquivos criados

- `css/components/theme-toggle.css`
- `js/ui/theme-toggle.js`
- `scripts/check-theme-toggle.py`

## Arquivos alterados

- 26 páginas indexáveis do sitemap
- `404.html`
- `parceiros.html`
- `novidades/index.html`
- `js/ui/head.js`
- `js/ui/navegacao-ui.js`

## Ajuste importante em `js/ui/head.js`

O script antigo usava `dark` como fallback. Foi alterado para `light`, para respeitar o pedido de manter o tema claro como padrão.

## Validações executadas

```bash
python scripts/check-theme-toggle.py
python scripts/check-public-links.py
python scripts/generate-sitemap.py --check
python scripts/test-basic-behaviors.py
```

Resultados específicos desta etapa:

- Tema integrado em 29 páginas públicas.
- Links internos, assets locais e âncoras continuam sem quebra.
- Sitemap continua atualizado com 26 URLs.
- Sintaxe JS continua válida.

Os testes gerais do projeto continuam em 10/18, com falhas legadas já existentes e não relacionadas ao tema escuro.
