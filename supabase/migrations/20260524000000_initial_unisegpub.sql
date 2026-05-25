-- UniSegPub -> Supabase
-- Fase 1: migrar JSONs do site para tabelas públicas de leitura.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.instituicoes (
  id text primary key,
  nome text not null,
  sigla text not null,
  uf text not null,
  tipo text,
  prioridade integer,
  site_principal text,
  fontes_base jsonb not null default '[]'::jsonb,
  dominios_oficiais jsonb not null default '[]'::jsonb,
  termos_relevantes jsonb not null default '[]'::jsonb,
  consultas_concursos jsonb not null default '[]'::jsonb,
  consultas_remuneracao jsonb not null default '[]'::jsonb,
  config_concursos jsonb not null default '{}'::jsonb,
  config_remuneracao jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.concursos (
  instituicao_id text primary key references public.instituicoes(id) on delete cascade,
  instituicao_nome text,
  sigla text,
  uf text,
  tema text,
  status text,
  titulo text,
  resumo text,
  edital text,
  salario text,
  vagas text,
  cotas text,
  idade text,
  escolaridade text,
  materias text,
  banca text,
  inscritos text,
  etapas text,
  cfsd text,
  estagio text,
  validade text,
  previsao text,
  site text,
  fontes jsonb not null default '[]'::jsonb,
  ultima_pesquisa date,
  nivel_confianca text,
  precisa_revisao_humana boolean not null default false,
  alertas jsonb not null default '[]'::jsonb,
  qualidade_publicacao text,
  score_publicacao integer,
  texto_final_limpo boolean,
  padrao_editorial text,
  modo_qualidade text,
  bloquear_publicacao boolean,
  publicado_por_modo_qualificado boolean,
  forcar_exibicao_site boolean,
  publicacao_forcada_por_credito_openai boolean,
  classe_atualizacao text,
  modelo_openai text,
  atualizado_pela_openai boolean,
  raw jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.remuneracoes (
  instituicao_id text primary key references public.instituicoes(id) on delete cascade,
  instituicao_nome text,
  sigla text,
  uf text,
  tema text,
  status text,
  titulo text,
  resumo text,
  fonte_principal text,
  fontes jsonb not null default '[]'::jsonb,
  ultima_pesquisa date,
  classe_atualizacao text,
  score_publicacao integer,
  modelo_openai text,
  atualizado_pela_openai boolean,
  precisa_revisao_humana boolean not null default false,
  alertas jsonb not null default '[]'::jsonb,
  raw jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.remuneracao_linhas (
  id bigserial primary key,
  instituicao_id text not null references public.remuneracoes(instituicao_id) on delete cascade,
  ordem integer not null default 0,
  cargo text not null,
  badge text,
  remuneracao numeric(12,2) not null default 0,
  beneficios numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  classe text,
  criterio text,
  benef_desc text,
  fonte_key text,
  fonte_nome text,
  fonte_url text,
  valor_pendente boolean not null default false,
  raw jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (instituicao_id, ordem)
);

create index idx_instituicoes_uf on public.instituicoes(uf);
create index idx_instituicoes_sigla on public.instituicoes(sigla);
create index idx_concursos_uf on public.concursos(uf);
create index idx_concursos_ultima_pesquisa on public.concursos(ultima_pesquisa desc);
create index idx_remuneracoes_uf on public.remuneracoes(uf);
create index idx_remuneracao_linhas_instituicao_ordem on public.remuneracao_linhas(instituicao_id, ordem);

create trigger set_instituicoes_updated_at
before update on public.instituicoes
for each row execute function public.set_updated_at();

create trigger set_concursos_updated_at
before update on public.concursos
for each row execute function public.set_updated_at();

create trigger set_remuneracoes_updated_at
before update on public.remuneracoes
for each row execute function public.set_updated_at();

create trigger set_remuneracao_linhas_updated_at
before update on public.remuneracao_linhas
for each row execute function public.set_updated_at();

alter table public.instituicoes enable row level security;
alter table public.concursos enable row level security;
alter table public.remuneracoes enable row level security;
alter table public.remuneracao_linhas enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.instituicoes to anon, authenticated;
grant select on public.concursos to anon, authenticated;
grant select on public.remuneracoes to anon, authenticated;
grant select on public.remuneracao_linhas to anon, authenticated;

grant all on public.instituicoes to service_role;
grant all on public.concursos to service_role;
grant all on public.remuneracoes to service_role;
grant all on public.remuneracao_linhas to service_role;
grant usage, select on sequence public.remuneracao_linhas_id_seq to service_role;

create policy "Leitura publica de instituicoes"
on public.instituicoes
for select
to anon, authenticated
using (true);

create policy "Leitura publica de concursos"
on public.concursos
for select
to anon, authenticated
using (true);

create policy "Leitura publica de remuneracoes"
on public.remuneracoes
for select
to anon, authenticated
using (true);

create policy "Leitura publica de linhas de remuneracao"
on public.remuneracao_linhas
for select
to anon, authenticated
using (true);
