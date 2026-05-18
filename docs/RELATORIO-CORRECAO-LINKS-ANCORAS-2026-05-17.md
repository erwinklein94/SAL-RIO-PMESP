# Relatório — Correção de links quebrados e âncoras

Data: 2026-05-17
Escopo: correções conservadoras em links internos públicos, âncoras e sitemap relacionado.

## Problemas encontrados

A auditoria dos HTMLs públicos da raiz, `/artigos` e `/novidades` encontrou 12 problemas reais:

- 9 links para `/artigos/` sem arquivo `artigos/index.html` correspondente;
- 3 links para âncoras antigas da página de remuneração:
  - `remuneracao.html#remu-card-pmesp`;
  - `remuneracao.html#remu-card-pcdf`;
  - `../remuneracao.html#remu-card-pcdf`.

Essas âncoras pertenciam a uma estrutura anterior da página de remuneração. Na versão atual, a página trabalha com `?inst=` e a tabela usa o alvo existente `#lista-remuneracao`.

## Alterações aplicadas

### 1. Criação do índice de artigos

Criado o arquivo:

```txt
artigos/index.html
```

Objetivo:

- fazer `/artigos/` existir de verdade;
- evitar 404 interno nos artigos publicados;
- manter uma página de índice útil para visitantes e buscadores;
- preservar os links já existentes nos breadcrumbs e artigos.

A página foi criada como HTML estático e simples, usando os CSS globais já existentes e links absolutos internos seguros.

### 2. Correção das âncoras antigas de remuneração

Substituições aplicadas:

```txt
remuneracao.html#remu-card-pmesp
→ remuneracao.html?inst=pmesp#lista-remuneracao

remuneracao.html#remu-card-pcdf
→ remuneracao.html?inst=pcdf#lista-remuneracao

../remuneracao.html#remu-card-pcdf
→ ../remuneracao.html?inst=pcdf#lista-remuneracao
```

Motivo:

- a página atual de remuneração já aceita o parâmetro `?inst=`;
- `#lista-remuneracao` existe no HTML atual;
- a navegação leva o usuário para a instituição correta sem depender de IDs antigos removidos.

### 3. Ajuste do gerador de sitemap

Atualizado:

```txt
scripts/generate-sitemap.py
```

Mudança:

- páginas `*/index.html` agora geram URL canônica limpa com barra final, por exemplo:

```txt
artigos/index.html
→ https://universosegpub.com.br/artigos/
```

O sitemap foi regenerado e passou a ter 26 URLs.

### 4. Ajuste do teste de sitemap

Atualizado:

```txt
scripts/test-basic-behaviors.py
```

Motivo:

- o teste antigo tratava URLs com barra final como arquivo inexistente;
- agora ele reconhece corretamente URLs de diretório que apontam para `index.html`.

### 5. Criação de auditor de links públicos

Criado:

```txt
scripts/check-public-links.py
```

Uso:

```bash
python scripts/check-public-links.py
```

Esse script verifica:

- links internos locais;
- assets locais referenciados por HTML;
- âncoras no mesmo arquivo;
- âncoras em outros HTMLs públicos;
- diretórios públicos sem `index.html`.

Ele ignora links externos para evitar falsos positivos por bloqueios, captcha, timeout ou instabilidade fora do projeto.

## Validações executadas

Comandos executados:

```bash
python scripts/check-public-links.py
python scripts/generate-sitemap.py --check
python scripts/test-basic-behaviors.py
```

Resultados:

- auditoria de links públicos: OK, nenhum link interno/asset/âncora quebrado;
- sitemap: OK, atualizado com 26 URLs;
- sitemap e robots nos testes gerais: OK;
- testes gerais do projeto: seguem com falhas antigas não relacionadas a esta correção.

## Itens não alterados

Não foram alterados:

- layout das páginas existentes;
- menus principais das páginas existentes;
- dados de remuneração, concursos, direitos ou produtos;
- CSS global;
- JavaScript funcional das páginas existentes, exceto o gerador/teste citado acima.

## Observações

As falhas restantes dos testes gerais já existiam antes desta correção e pertencem a outros blocos de manutenção, como estrutura compartilhada da home, menu ativo, scripts obrigatórios da home, vitrine de produtos mobile, templates desatualizados e nome de imagem com caractere arriscado.
