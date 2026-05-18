# Correção de robots.txt e sitemap.xml — 2026-05-17

## Objetivo

Melhorar a indexação do site Universo Segurança Pública sem alterar layout, CSS, JavaScript de navegação ou funcionamento das páginas públicas.

## Arquivos alterados

- `robots.txt`
- `sitemap.xml`
- `scripts/generate-sitemap.py` _(novo utilitário seguro para manutenção)_
- `docs/RELATORIO-CORRECAO-ROBOTS-SITEMAP-2026-05-17.md` _(este relatório)_

## Correções aplicadas

### 1. robots.txt

Antes, a diretiva `Sitemap:` estava na mesma linha de `Allow`, o que tornava o arquivo frágil para interpretação por robôs de busca.

Formato corrigido:

```txt
User-agent: *
Allow: /

Sitemap: https://universosegpub.com.br/sitemap.xml
```

### 2. sitemap.xml

O sitemap foi regenerado com regras conservadoras:

- removeu duplicatas, especialmente repetições de `direitos.html`;
- adicionou páginas importantes que estavam fora do sitemap, como:
  - `base-legal.html`;
  - `poderes-deveres.html`;
- manteve a home como `https://universosegpub.com.br/`, não como `/index.html`;
- excluiu páginas `noindex`, páginas de redirecionamento/duplicadas e páginas com canonical apontando para outra URL;
- manteve apenas URLs públicas reais existentes no projeto;
- atualizou `lastmod` com base na data de modificação dos arquivos HTML.

Total atual: **27 URLs**.

### 3. Script de manutenção

Foi criado `scripts/generate-sitemap.py` para evitar erros manuais no futuro.

Uso:

```bash
python scripts/generate-sitemap.py
```

Para verificar se o sitemap está atualizado sem alterar o arquivo:

```bash
python scripts/generate-sitemap.py --check
```

## Validações feitas

Foram validados:

- `robots.txt` com `Sitemap:` em linha própria;
- `sitemap.xml` como XML válido;
- ausência de URLs duplicadas;
- URLs do sitemap apontando para arquivos existentes;
- exclusão de páginas `noindex` do sitemap;
- exclusão de `404.html`, `parceiros.html` e `novidades/index.html`.

## Observação importante

Os testes gerais do projeto continuam com falhas que já existiam antes desta alteração. A parte de `sitemap e robots` passou, mas ainda há pendências em estrutura compartilhada, menu ativo, scripts obrigatórios, vitrine mobile, templates e nome de arquivo com caracteres arriscados.

Esses pontos devem ser tratados em etapas separadas para reduzir risco de quebrar o site.
