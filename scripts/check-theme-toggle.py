#!/usr/bin/env python3
from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
NS = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}

paths = []
for loc in ET.parse(ROOT / 'sitemap.xml').getroot().findall('s:url/s:loc', NS):
    rel = loc.text.strip().replace('https://universosegpub.com.br/', '')
    if rel == '':
        rel = 'index.html'
    elif rel.endswith('/'):
        rel += 'index.html'
    paths.append(rel)

extra = ['404.html', 'parceiros.html', 'novidades/index.html']
for rel in extra:
    if (ROOT / rel).exists() and rel not in paths:
        paths.append(rel)

errors = []
for rel in paths:
    p = ROOT / rel
    text = p.read_text(encoding='utf-8')
    depth = len(Path(rel).parts) - 1
    prefix = '../' * depth
    expected_css = f'{prefix}css/components/theme-toggle.css'
    expected_js = f'{prefix}js/ui/theme-toggle.js'
    if expected_css not in text:
        errors.append(f'{rel}: não referencia {expected_css}')
    if expected_js not in text:
        errors.append(f'{rel}: não referencia {expected_js}')
    if text.count('css/components/theme-toggle.css') != 1:
        errors.append(f'{rel}: referência duplicada/ausente de CSS do tema')
    if text.count('js/ui/theme-toggle.js') != 1:
        errors.append(f'{rel}: referência duplicada/ausente de JS do tema')

for rel in ['css/components/theme-toggle.css', 'js/ui/theme-toggle.js']:
    if not (ROOT / rel).exists():
        errors.append(f'Arquivo obrigatório ausente: {rel}')

head = (ROOT / 'js/ui/head.js').read_text(encoding='utf-8')
if "let savedTheme = 'light'" not in head or "storedTheme : 'light'" not in head:
    errors.append('js/ui/head.js não mantém tema claro como padrão')

css = (ROOT / 'css/components/theme-toggle.css').read_text(encoding='utf-8')
for token in ['html[data-theme="dark"]', '--usp-dark-page', '--usp-dark-gold', '.usp-theme-toggle']:
    if token not in css:
        errors.append(f'CSS do tema não contém token esperado: {token}')

js = (ROOT / 'js/ui/theme-toggle.js').read_text(encoding='utf-8')
for token in ['Modo escuro', 'Modo claro', 'localStorage', 'data-usp-theme-toggle']:
    if token not in js:
        errors.append(f'JS do tema não contém token esperado: {token}')

if errors:
    print('Falhas encontradas:')
    for e in errors:
        print('-', e)
    sys.exit(1)

print(f'OK: tema claro/escuro integrado em {len(paths)} páginas públicas.')
