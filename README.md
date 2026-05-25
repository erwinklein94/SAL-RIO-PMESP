# UniSegPub + Supabase — starter kit

Este pacote inicia a migração dos JSONs do site para Supabase.

## O que está incluído

- `supabase/migrations/20260524000000_initial_unisegpub.sql`: cria as tabelas iniciais.
- `scripts/import-json-to-supabase.mjs`: importa `config/`, `data/concursos/` e `data/remuneracao/`.
- `js/supabase-data-api.example.js`: exemplo de leitura no front-end estático.

## Ordem recomendada

1. Copie a pasta `supabase/` e `scripts/` para a raiz do repositório do site.
2. Instale a CLI do Supabase e conecte seu projeto.
3. Rode a migration.
4. Rode o importador.
5. Só depois troque uma página do site para ler pelo Supabase.

## Comandos

```bash
npm install

# Na raiz do repositório UniSegPub:
export SUPABASE_URL="https://SEU-PROJETO.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="SUA_SERVICE_ROLE_KEY"
export UNISEGPUB_ROOT="/caminho/para/UniSegPub-Alpha-main"

npm run import:supabase
```

> Nunca exponha `SUPABASE_SERVICE_ROLE_KEY` no navegador ou no GitHub público. Ela é só para importação no servidor/local/CI.

## Tabelas criadas

- `instituicoes`
- `concursos`
- `remuneracoes`
- `remuneracao_linhas`

A modelagem usa JSONB para `fontes`, `alertas` e `raw` nesta fase inicial para evitar perda de informação enquanto o front-end ainda está sendo adaptado.
