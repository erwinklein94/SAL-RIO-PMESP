// Exemplo para trocar fetch('data/*.json') por Supabase no site estático.
// Não coloque a service_role key no navegador. Use apenas a anon/public key.

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'COLE_AQUI_A_URL_DO_PROJETO';
const SUPABASE_ANON_KEY = 'COLE_AQUI_A_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function listarInstituicoes() {
  const { data, error } = await supabase
    .from('instituicoes')
    .select('*')
    .order('prioridade', { ascending: true })
    .order('uf', { ascending: true })
    .order('sigla', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function listarConcursos() {
  const { data, error } = await supabase
    .from('concursos')
    .select('*')
    .order('uf', { ascending: true })
    .order('sigla', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function obterConcurso(instituicaoId) {
  const { data, error } = await supabase
    .from('concursos')
    .select('*')
    .eq('instituicao_id', instituicaoId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function obterRemuneracao(instituicaoId) {
  const [{ data: resumo, error: resumoError }, { data: linhas, error: linhasError }] = await Promise.all([
    supabase.from('remuneracoes').select('*').eq('instituicao_id', instituicaoId).maybeSingle(),
    supabase.from('remuneracao_linhas').select('*').eq('instituicao_id', instituicaoId).order('ordem')
  ]);

  if (resumoError) throw resumoError;
  if (linhasError) throw linhasError;
  return { resumo, linhas: linhas || [] };
}
