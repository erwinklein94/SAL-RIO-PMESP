# Relatório — Botão "Sugerir correção"

Data: 2026-05-17

## Objetivo

Adicionar um botão discreto no final das páginas públicas, antes do rodapé quando a página possui rodapé, para facilitar o envio de sugestões de correção por e-mail.

## Implementação

- Criado CSS global em `css/components/sugerir-correcao.css`.
- Inserido componente `section.usp-sugerir-correcao` nas páginas indexáveis do `sitemap.xml`.
- Cada botão usa `mailto:universosegpub@gmail.com` com assunto e corpo preenchidos automaticamente.
- O corpo do e-mail inclui a URL da página em que o usuário clicou.
- Não foi criado backend, formulário, script obrigatório nem dependência externa.

## Páginas alteradas

- `index.html`
- `remuneracao.html`
- `concursos.html`
- `guia-instituicoes.html`
- `comparar-carreiras.html`
- `direitos.html`
- `brasoes.html`
- `noticias.html`
- `artigos/index.html`
- `acoes-judiciais.html`
- `associacoes-sindicatos.html`
- `produtos.html`
- `anuncie.html`
- `privacidade.html`
- `termos.html`
- `cookies.html`
- `novidades/pcdf-delegado-inscricoes-abertas-2026.html`
- `artigos/salario-cbmerj-2026.html`
- `artigos/salario-pcdf-2026.html`
- `artigos/salario-pcerj-2026-tabela-completa.html`
- `artigos/salario-pcmg-2026-tabela-completa.html`
- `artigos/salario-pf-2026-tabela-completa.html`
- `artigos/salario-pmerj-2026-tabela-completa.html`
- `artigos/salario-pmmg-2026-tabela-completa.html`
- `artigos/salario-pprj-2026-tabela-completa.html`
- `artigos/salario-prf-2026-tabela-completa.html`

## Observações

A solução é conservadora e compatível com hospedagem estática. Se futuramente o site tiver uma página própria de contato ou formulário, o `href` do botão pode ser alterado para essa página sem mudar o restante do componente.

## Validação realizada

- Conferido que as 26 URLs do `sitemap.xml` receberam o botão.
- Conferido que cada botão contém `mailto:universosegpub@gmail.com`.
- Conferido que cada corpo de e-mail inclui a URL da própria página.
- Conferido que o CSS do componente foi referenciado nas páginas alteradas.
- Executado `python scripts/check-public-links.py`: nenhum link interno, asset local ou âncora quebrada encontrado.
- Executado `python scripts/generate-sitemap.py --check`: sitemap atualizado com 26 URLs.

## Testes gerais

`python scripts/test-basic-behaviors.py` continua com 10/18 testes passando. As falhas restantes são antigas e não foram causadas por esta alteração: estrutura compartilhada da home, menu ativo, scripts obrigatórios, vitrine mobile, templates desatualizados e nome de imagem com caractere arriscado.
