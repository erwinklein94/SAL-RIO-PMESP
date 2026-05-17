# Integração do Redesign da Home — UniSegPub-Teste

Este pacote contém **3 arquivos** que aplicam o novo visual (azul escuro + ouro insígnia, layout amplo elegante) **apenas na home** do seu site, sem mexer em nenhuma outra página, JS ou dado dinâmico.

## 📁 Arquivos para commit

| Arquivo no pacote | Caminho no seu repo |
|---|---|
| `css/redesign-home.css` | `css/redesign-home.css` *(arquivo novo)* |
| `partials/pages/index/main.html` | `partials/pages/index/main.html` *(substitui)* |
| `partials/pages/index/head.html` | `partials/pages/index/head.html` *(substitui — só adiciona 1 linha de `<link>` para o CSS novo)* |

> ⚠️ **NÃO** estou alterando `pre-main.html` (header com seletor de instituição dinâmico) nem `post-main.html` (rodapé/scripts). Toda a lógica de header-estados.js, brasões dinâmicos, sidebar, etc. continua funcionando — só **mudei a aparência via CSS**.

## ✅ Passo a passo

### 1. Subir os 3 arquivos para o GitHub

Pela interface web do GitHub:
1. Abra seu repositório `erwinklein94/UniSegPub-Teste`.
2. Em `css/`, clique em **"Add file → Upload files"** e suba `redesign-home.css`.
3. Em `partials/pages/index/`, clique em **"Add file → Upload files"** e suba os dois HTMLs deste pacote (vão substituir os existentes).
4. Faça o commit numa branch nova (ex: `redesign-home`) para você testar antes de mesclar.

### 2. Regerar o `index.html` público

O seu site usa templates Python para montar o HTML estático. Depois de subir os partials:

```bash
python scripts/build-static-pages.py --write index
```

Esse comando reescreve `index.html` a partir dos novos partials. Faça commit do `index.html` regerado também.

> Se você abrir um Pull Request, o GitHub Pages publica automaticamente assim que o merge for feito na branch `main`.

### 3. Verificar localmente (opcional, recomendado)

Antes de mergear, abra a branch no GitHub Pages de preview ou rode localmente:

```bash
python -m http.server 8000
# Abrir http://localhost:8000
```

## 🎨 O que muda visualmente

- **Header institucional**: fundo azul escuro `#08111C`, texto branco, fio dourado `#D4AF37` separando do conteúdo. O seletor de instituição e as bandeirinhas dos estados ganham contraste sobre o azul.
- **Floating actions e bottom nav**: recolorados para o azul escuro com toque dourado.
- **Hero da home**: tipografia mais elegante (Helvetica), tamanho controlado (44px no título), eyebrow em monoespaço, grifo dourado sutil na palavra "cliques".
- **Stats (27 UFs, 111, 2026)**: barra horizontal com divisórias finas — sensação editorial.
- **Cards de Consultas Principais**: grid 4×N flat com borda fina, hover bege claro, seta animada no canto.
- **Novo bloco: Comparador de Carreiras** — faixa escura com gráfico de barras dourado.
- **Footer**: azul escuro com fio dourado superior.

## 🔧 Se algo der errado

- **Estilo antigo aparece misturado**: hard refresh no navegador (Ctrl+Shift+R / Cmd+Shift+R) ou suba uma nova versão de cache `?v=...` no `<link>` do `redesign-home.css`.
- **Algum elemento não recoloriu**: o `main.min.css` tem regras com alta especificidade. Me diga qual elemento e eu ajusto a regra com mais especificidade.
- **Quer voltar atrás**: basta reverter o commit no GitHub — todos os 3 arquivos são isolados.

## 🚀 Próximos passos sugeridos

1. **Aplicar o redesign nas páginas internas** (remuneração, concursos, etc.) — replicar o header escuro + ouro nelas. Posso preparar um pacote separado.
2. **Substituir os emojis** (💰 ⚖️ 🛡️) por ícones SVG da identidade. Posso desenhar um set.
3. **Adicionar seção de Notícias em destaque** na home com dados reais do `noticias.html`.
4. **Comprimir o `main.min.css`** removendo regras antigas que viraram conflito com o novo CSS.

Manda mensagem dizendo o que prefere atacar primeiro.
