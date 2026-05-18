#!/usr/bin/env python3
"""Testes básicos de proteção dos comportamentos principais do UniSegPub.

O objetivo é proteger contratos estruturais do site estático sem depender de
framework, navegador real ou pacotes externos.

Executar na raiz do projeto:
  python scripts/test-basic-behaviors.py
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


@dataclass
class TestResult:
    name: str
    ok: bool
    details: str = ""


class MiniHtmlParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.tags: list[tuple[str, dict[str, str]]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.tags.append((tag.lower(), {key.lower(): value or "" for key, value in attrs}))

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)


ROOT = Path(__file__).resolve().parents[1]

PUBLIC_PAGES = [
    "index.html",
    "remuneracao.html",
    "direitos.html",
    "brasoes.html",
    "concursos.html",
    "comparar-carreiras.html",
    "acoes-judiciais.html",
    "associacoes-sindicatos.html",
    "produtos.html",
    "anuncie.html",
    "parceiros.html",
    "404.html",
]

APP_PAGES = [
    "index.html",
    "remuneracao.html",
    "direitos.html",
    "brasoes.html",
    "concursos.html",
    "comparar-carreiras.html",
    "acoes-judiciais.html",
    "associacoes-sindicatos.html",
    "produtos.html",
    "anuncie.html",
]

EXPECTED_DATA_PAGE = {
    "index.html": "principal",
    "remuneracao.html": "remuneracao",
    "direitos.html": "direitos",
    "brasoes.html": "brasoes",
    "concursos.html": "concursos",
    "comparar-carreiras.html": "comparar",
    "acoes-judiciais.html": "acoes",
    "associacoes-sindicatos.html": "associacoes",
    "produtos.html": "produtos",
    "anuncie.html": "parceiros",
    "404.html": "404",
}

MENU_ROUTES = {
    "index.html": ("menu-principal", "index.html"),
    "remuneracao.html": ("menu-remuneracao", "remuneracao.html"),
    "direitos.html": ("menu-direitos", "direitos.html"),
    "brasoes.html": ("menu-brasoes", "brasoes.html"),
    "concursos.html": ("menu-concursos", "concursos.html"),
    "comparar-carreiras.html": ("menu-comparar", "comparar-carreiras.html"),
    "acoes-judiciais.html": ("menu-acoes", "acoes-judiciais.html"),
    "associacoes-sindicatos.html": ("menu-associacoes", "associacoes-sindicatos.html"),
    "produtos.html": ("menu-produtos", "produtos.html"),
    "anuncie.html": ("menu-parceiros", "anuncie.html"),
}

PAGE_TARGETS = {
    "index.html": [
        "page-principal",
        "principal-titulo",
        "instituicao_home",
        "consultas-principais-titulo",
    ],
    "remuneracao.html": [
        "page-remuneracao",
        "txt-inst-remuneracao",
        "lista-remuneracao",
        "remu-total-cargos",
        "remu-menor-total",
        "remu-maior-total",
    ],
    "direitos.html": [
        "page-direitos",
        "cargo_dir",
        "situacao_dir",
        "tempo_dir",
        "idade_dir",
        "sexo_dir",
        "txt-inst-dir",
        "resultados_dir",
    ],
    "brasoes.html": [
        "page-brasoes",
        "txt-inst-brasoes",
        "brasoes_historia_resultado",
    ],
    "concursos.html": [
        "page-concursos",
        "txt-inst-concursos",
        "lista-concursos",
    ],
    "comparar-carreiras.html": [
        "page-comparar",
        "comparador-esfera",
        "comparador-instituicao",
        "comparador-toggle-lista",
        "comparador-selecao",
        "comparador-selecionadas",
        "comparador-resumo",
        "comparador-tabela",
        "comparador-cards",
    ],
    "acoes-judiciais.html": [
        "page-acoes",
        "txt-inst-acoes",
        "lista-acoes",
    ],
    "associacoes-sindicatos.html": [
        "page-associacoes",
        "txt-inst-assoc",
        "lista-associacoes",
    ],
    "produtos.html": [
        "page-produtos",
        "txt-inst-produtos",
    ],
    "anuncie.html": [
        "page-parceiros",
        "contato_nome",
        "contato_email",
        "contato_assunto",
        "contato_mensagem",
        "char-counter",
    ],
    "404.html": [
        "page-404",
    ],
}

SHARED_SHELL_IDS = [
    "header-active-flag",
    "header-active-sigla",
    "header-active-name",
    "header-desc",
    "instituicao_header",
    "header-branch-pm",
    "header-branch-bm",
    "header-branch-pc",
    "header-branch-pp",
    "menuOverlay",
    "sidebar",
    "instituicao",
    "toast",
]

SHARED_SHELL_CLASSES = [
    "site-header",
    "app-bottom-nav",
    "sidebar",
    "menu-btn",
]

DATA_SCRIPT_ORDER = [
    "js/data/parametros-cargos.js",
    "js/data/policia-penal.js",
    "js/data/acoes-judiciais-data.js",
    "js/data/associacoes-data.js",
    "js/data/concursos-data.js",
    "js/data/portal-config.js",
    "js/data/bases-conteudo.js",
    "js/ui/navegacao-ui.js",
    "js/services/remuneracao.js",
    "js/data/header-brasoes-config.js",
    "js/ui/header-estados.js",
]

STATIC_DATA_CONTRACTS = {
    "js/data/acoes-judiciais-data.js": ["const ACOES_JUDICIAIS"],
    "js/data/associacoes-data.js": ["const ASSOCIACOES"],
    "js/data/concursos-data.js": ["const CONCURSOS"],
    "js/data/portal-config.js": [
        "const HEADER_BRASIL_FLAG",
        "const INSTITUICOES_VALIDAS",
    ],
    "js/data/bases-conteudo.js": [
        "let currTabela",
        "let currInst",
        "let headerModoInicialPortal",
    ],
    "js/data/header-brasoes-config.js": [
        "window.EXTENSOES_BRASAO_SUPORTADAS",
        "window.HEADER_INSTITUICOES_IMAGENS_ALIASES",
    ],
    "js/data/produtos-data.js": [
        "window.UNISEGPUB_PRODUTOS",
        "window.UNISEGPUB_PRODUTOS_JSON_FALLBACKS",
        "PRODUTOS_LIVROS_EBOOKS_FALLBACK",
    ],
}


class TestFailure(Exception):
    pass


def read_text(rel: str) -> str:
    return (ROOT / rel).read_text(encoding="utf-8")


def assert_true(condition: bool, message: str) -> None:
    if not condition:
        raise TestFailure(message)


def parse_html(rel: str) -> MiniHtmlParser:
    parser = MiniHtmlParser()
    parser.feed(read_text(rel))
    return parser


def attrs_for(rel: str, tag: str) -> list[dict[str, str]]:
    return [attrs for found_tag, attrs in parse_html(rel).tags if found_tag == tag]


def tag_has_attr(rel: str, tag: str, attr: str, value: str | None = None) -> bool:
    for attrs in attrs_for(rel, tag):
        if attr not in attrs:
            continue
        if value is None or attrs[attr] == value:
            return True
    return False


def id_exists(html: str, element_id: str) -> bool:
    return bool(re.search(rf'\bid=["\']{re.escape(element_id)}["\']', html))


def src_without_query(src: str) -> str:
    return src.split("?", 1)[0].split("#", 1)[0]


def is_external_or_special(url: str) -> bool:
    if not url:
        return True
    lower = url.strip().lower()
    return (
        lower.startswith("#")
        or lower.startswith("http://")
        or lower.startswith("https://")
        or lower.startswith("mailto:")
        or lower.startswith("tel:")
        or lower.startswith("data:")
        or lower.startswith("javascript:")
        or lower.startswith("//")
    )


def local_path_from_url(url: str) -> Path | None:
    if is_external_or_special(url):
        return None
    path = src_without_query(unquote(url.strip()))
    if not path:
        return None
    return ROOT / path


def script_sources(rel: str) -> list[str]:
    sources: list[str] = []
    for attrs in attrs_for(rel, "script"):
        src = attrs.get("src")
        if src:
            sources.append(src_without_query(src))
    return sources


def run_command(command: list[str], timeout: int = 30) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        command,
        cwd=ROOT,
        text=True,
        capture_output=True,
        timeout=timeout,
    )


def test_required_pages_exist() -> None:
    for page in PUBLIC_PAGES:
        assert_true((ROOT / page).is_file(), f"Página pública ausente: {page}")


def test_html_metadata_and_data_page() -> None:
    for page in PUBLIC_PAGES:
        html = read_text(page)
        assert_true("<!DOCTYPE html>" in html[:80], f"{page}: DOCTYPE ausente")
        assert_true("<html" in html, f"{page}: tag html ausente")
        assert_true("<head>" in html, f"{page}: head ausente")
        assert_true("<title>" in html, f"{page}: title ausente")
        assert_true('name="description"' in html or "name='description'" in html, f"{page}: meta description ausente")
        assert_true('rel="canonical"' in html or "rel='canonical'" in html, f"{page}: canonical ausente")

    for page, expected in EXPECTED_DATA_PAGE.items():
        if page == "parceiros.html":
            continue
        html = read_text(page)
        assert_true(f'data-page="{expected}"' in html, f"{page}: data-page esperado não encontrado: {expected}")


def test_shared_shell_contracts() -> None:
    for page in APP_PAGES:
        html = read_text(page)

        for element_id in SHARED_SHELL_IDS:
            assert_true(id_exists(html, element_id), f"{page}: id obrigatório ausente: {element_id}")

        for css_class in SHARED_SHELL_CLASSES:
            assert_true(css_class in html, f"{page}: classe/estrutura obrigatória ausente: {css_class}")

        for menu_id, href in MENU_ROUTES.values():
            assert_true(id_exists(html, menu_id), f"{page}: item de menu ausente: {menu_id}")
            assert_true(href in html, f"{page}: rota de menu ausente: {href}")


def test_active_menu_contracts() -> None:
    for page, (menu_id, href) in MENU_ROUTES.items():
        html = read_text(page)
        pattern = rf'<a\b[^>]*id=["\']{re.escape(menu_id)}["\'][^>]*aria-current=["\']page["\']'
        reverse_pattern = rf'<a\b[^>]*aria-current=["\']page["\'][^>]*id=["\']{re.escape(menu_id)}["\']'
        assert_true(
            bool(re.search(pattern, html) or re.search(reverse_pattern, html)),
            f"{page}: item ativo do menu não está marcado com aria-current=page: {menu_id}",
        )


def test_page_specific_dom_targets() -> None:
    for page, targets in PAGE_TARGETS.items():
        if page == "404.html":
            html = read_text(page)
            assert_true("<main" in html, "404.html: main ausente")
            assert_true("Página não encontrada" in html, "404.html: conteúdo 404 ausente")
            continue

        html = read_text(page)
        for target in targets:
            assert_true(id_exists(html, target), f"{page}: alvo DOM usado por JS ausente: {target}")


def test_local_references_exist() -> None:
    missing: list[str] = []

    for page in PUBLIC_PAGES:
        parser = parse_html(page)
        for tag, attrs in parser.tags:
            for attr in ("src", "href"):
                if attr not in attrs:
                    continue
                local = local_path_from_url(attrs[attr])
                if local is None:
                    continue
                if not local.exists():
                    missing.append(f"{page}: {attr}={attrs[attr]}")

    assert_true(not missing, "Referências locais ausentes:\n" + "\n".join(missing[:40]))


def test_target_blank_rel_noopener() -> None:
    offenders: list[str] = []

    for page in PUBLIC_PAGES:
        for attrs in attrs_for(page, "a"):
            if attrs.get("target", "").lower() != "_blank":
                continue
            rel = attrs.get("rel", "").lower()
            if "noopener" not in rel:
                offenders.append(f"{page}: href={attrs.get('href', '')}")

    assert_true(not offenders, "Links target=_blank sem noopener:\n" + "\n".join(offenders[:40]))


def test_script_order_contracts() -> None:
    for page in APP_PAGES:
        sources = script_sources(page)
        positions: dict[str, int] = {}

        for script in DATA_SCRIPT_ORDER:
            assert_true(script in sources, f"{page}: script obrigatório ausente: {script}")
            positions[script] = sources.index(script)

        for before, after in zip(DATA_SCRIPT_ORDER, DATA_SCRIPT_ORDER[1:]):
            assert_true(
                positions[before] < positions[after],
                f"{page}: ordem de scripts quebrada: {before} deve vir antes de {after}",
            )

        assert_true(
            sources.index("js/ui/event-bindings.js") < sources.index("js/core/page-context.js"),
            f"{page}: event-bindings.js deve carregar antes de page-context.js",
        )

    produtos_sources = script_sources("produtos.html")
    assert_true(
        produtos_sources.index("js/data/produtos-data.js") < produtos_sources.index("js/pages/produtos-render.js"),
        "produtos.html: produtos-data.js deve carregar antes de produtos-render.js",
    )




def test_sidebar_products_vitrine_contract() -> None:
    for page in APP_PAGES:
        html = read_text(page)
        assert_true('class="sidebar-products-vitrine"' in html, f"{page}: vitrine de produtos da sidebar ausente")
        assert_true('<strong>Produtos</strong>' in html, f"{page}: título Produtos da sidebar ausente")
        assert_true(html.count('class="sidebar-product-card"') == 10, f"{page}: sidebar deve exibir 10 produtos")
        assert_true('sidebar-product--featured' not in html, f"{page}: sidebar ainda possui produto em destaque")
        assert_true(html.count('<em>Ver na loja</em>') == 10, f"{page}: cada produto da sidebar deve ter Ver na loja")
        assert_true('class="sidebar-products-more" href="produtos.html"' in html, f"{page}: chamada para aba Produtos ausente")

def test_static_data_contracts() -> None:
    for rel, snippets in STATIC_DATA_CONTRACTS.items():
        path = ROOT / rel
        assert_true(path.is_file(), f"Arquivo de dados obrigatório ausente: {rel}")
        text = path.read_text(encoding="utf-8")
        for snippet in snippets:
            assert_true(snippet in text, f"{rel}: contrato ausente: {snippet}")

    header = read_text("js/ui/header-estados.js")
    assert_true(
        "window.EXTENSOES_BRASAO_SUPORTADAS || ['webp']" in header,
        "header-estados.js: fallback de extensões de brasão ausente",
    )
    assert_true(
        "window.HEADER_INSTITUICOES_IMAGENS_ALIASES || {}" in header,
        "header-estados.js: fallback de aliases de imagem ausente",
    )


def test_js_syntax() -> None:
    failures: list[str] = []
    for js_file in sorted((ROOT / "js").rglob("*.js")):
        result = run_command(["node", "--check", str(js_file)], timeout=20)
        if result.returncode != 0:
            failures.append(f"{js_file.relative_to(ROOT)}\n{result.stderr.strip()}")

    assert_true(not failures, "Falhas de sintaxe JS:\n" + "\n".join(failures[:10]))


def test_brasoes_json_and_images() -> None:
    data = json.loads(read_text("brasoes-mapeados-webp.json"))
    assert_true(isinstance(data, dict), "brasoes-mapeados-webp.json deve ser objeto")
    assert_true(len(data) >= 80, "brasoes-mapeados-webp.json parece incompleto")

    missing: list[str] = []
    for key, rel in data.items():
        assert_true(isinstance(key, str) and key, "Chave de brasão inválida")
        assert_true(isinstance(rel, str) and rel.endswith(".webp"), f"{key}: caminho inválido: {rel}")
        if not (ROOT / rel).is_file():
            missing.append(f"{key}: {rel}")

    assert_true(not missing, "Imagens de brasões ausentes:\n" + "\n".join(missing[:40]))


def test_produtos_data_matches_html_categories() -> None:
    html = read_text("produtos.html")
    categories = sorted(set(re.findall(r'data-produtos-categoria=["\']([^"\']+)["\']', html)))
    assert_true(categories, "produtos.html: nenhuma categoria de produto encontrada")

    data_text = read_text("js/data/produtos-data.js")
    json_categories = set()
    livros_json = ROOT / "js" / "data" / "produtos-livros-ebooks.json"
    if livros_json.is_file():
        payload = json.loads(livros_json.read_text(encoding="utf-8"))
        if isinstance(payload, dict):
            json_categories.update(key for key, value in payload.items() if isinstance(value, list))

    for category in categories:
        in_js_object = bool(re.search(rf'["\']{re.escape(category)}["\']\s*:', data_text))
        in_js_fallback = bool(re.search(rf'\b{re.escape(category)}\s*:', data_text))
        in_json = category in json_categories
        assert_true(
            in_js_object or in_js_fallback or in_json,
            f"Categoria usada no HTML não existe em JS/fallback/JSON: {category}",
        )


def test_produtos_livros_ebooks_json_contract() -> None:
    path = ROOT / "js" / "data" / "produtos-livros-ebooks.json"
    assert_true(path.is_file(), "JSON de livros/e-books não encontrado")

    payload = json.loads(path.read_text(encoding="utf-8"))
    produtos = payload.get("livrosEbooks") if isinstance(payload, dict) else None
    assert_true(isinstance(produtos, list) and produtos, "JSON de livros/e-books deve conter lista não vazia")

    fallback_text = read_text("js/data/produtos-data.js")
    render_text = read_text("js/pages/produtos-render.js")
    assert_true("PRODUTOS_LIVROS_EBOOKS_FALLBACK" in fallback_text, "Fallback JS de livros/e-books ausente")
    assert_true("produtos-livros-ebooks.json" in render_text, "Render de produtos não carrega o JSON de livros/e-books")

    for index, produto in enumerate(produtos, start=1):
        assert_true(isinstance(produto, dict), f"Produto {index} do JSON deve ser objeto")
        for field in ("titulo", "href", "imagem", "descricao", "cta"):
            assert_true(field in produto, f"Produto {index} do JSON sem campo obrigatório: {field}")
        imagem = produto.get("imagem")
        assert_true(isinstance(imagem, dict), f"Produto {index} do JSON com imagem inválida")
        src = imagem.get("src")
        assert_true(isinstance(src, str) and src, f"Produto {index} do JSON sem imagem.src")
        assert_true((ROOT / src).is_file(), f"Produto {index} do JSON aponta imagem ausente: {src}")


def test_produtos_mobile_vitrine_contract() -> None:
    html = read_text("produtos.html")
    head_partial = read_text("partials/pages/produtos/head.html")
    render_text = read_text("js/pages/produtos-render.js")
    produtos_data = read_text("js/data/produtos-data.js")
    livros_json = read_text("js/data/produtos-livros-ebooks.json")

    for source_name, source in (("produtos.html", html), ("partials/pages/produtos/head.html", head_partial)):
        assert_true("@media (max-width: 760px)" in source, f"{source_name}: regra mobile da vitrine ausente")
        assert_true("grid-template-columns: repeat(2, minmax(0, 1fr))" in source, f"{source_name}: vitrine mobile deve usar 2 colunas")
        assert_true("-webkit-line-clamp: 2" in source, f"{source_name}: textos mobile devem estar limitados")
        assert_true(".descricao-afiliado" in source and "display: none" in source, f"{source_name}: aviso afiliado deve ficar oculto nos cards mobile")

    assert_true("produto.cta || 'Ver na loja'" in render_text, "produtos-render.js: CTA padrão deve ser Ver na loja")
    assert_true('"cta": "Comprar"' not in produtos_data, "produtos-data.js ainda contém CTA Comprar")
    assert_true('"cta": "Comprar"' not in livros_json, "produtos-livros-ebooks.json ainda contém CTA Comprar")
    assert_true(">Comprar<" not in html, "produtos.html ainda contém botão visível Comprar")


def test_templates_generate_current_html() -> None:
    script = ROOT / "scripts" / "build-static-pages.py"
    if not script.is_file():
        return

    result = run_command(["python", "scripts/build-static-pages.py", "--check"], timeout=30)
    assert_true(
        result.returncode == 0,
        "Templates não geram o HTML público atual:\n" + result.stdout + result.stderr,
    )


def test_sitemap_and_robots() -> None:
    sitemap = ROOT / "sitemap.xml"
    robots = ROOT / "robots.txt"
    assert_true(sitemap.is_file(), "sitemap.xml ausente")
    assert_true(robots.is_file(), "robots.txt ausente")

    tree = ET.parse(sitemap)
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locs = [node.text or "" for node in tree.findall(".//sm:loc", namespace)]

    assert_true(locs, "sitemap.xml sem URLs")
    for loc in locs:
        url_path = urlsplit(loc).path
        path = url_path.strip("/")
        if not path:
            path = "index.html"

        candidate = ROOT / path
        if url_path.endswith("/") and path != "index.html":
            candidate = ROOT / path / "index.html"

        assert_true(candidate.is_file(), f"sitemap aponta para arquivo ausente: {loc}")

    robots_text = robots.read_text(encoding="utf-8")
    assert_true("Sitemap:" in robots_text, "robots.txt sem linha Sitemap")


def test_no_risky_web_filenames() -> None:
    risky_chars = set("#?%&+")
    offenders: list[str] = []

    for folder in ["img", "css", "js"]:
        for path in (ROOT / folder).rglob("*"):
            if path.is_file() and any(char in path.name for char in risky_chars):
                offenders.append(str(path.relative_to(ROOT)))

    for page in PUBLIC_PAGES:
        if any(char in page for char in risky_chars):
            offenders.append(page)

    assert_true(not offenders, "Arquivos web com caracteres arriscados:\n" + "\n".join(offenders[:40]))


TESTS = [
    ("páginas públicas existem", test_required_pages_exist),
    ("metadados HTML e data-page", test_html_metadata_and_data_page),
    ("estrutura compartilhada do app", test_shared_shell_contracts),
    ("menu ativo por página", test_active_menu_contracts),
    ("alvos DOM dos fluxos principais", test_page_specific_dom_targets),
    ("referências locais existem", test_local_references_exist),
    ("target=_blank protegido", test_target_blank_rel_noopener),
    ("ordem crítica de scripts", test_script_order_contracts),
    ("vitrine de produtos na sidebar", test_sidebar_products_vitrine_contract),
    ("contratos de dados estáticos", test_static_data_contracts),
    ("sintaxe JS", test_js_syntax),
    ("JSON e imagens de brasões", test_brasoes_json_and_images),
    ("categorias de produtos", test_produtos_data_matches_html_categories),
    ("JSON de livros/e-books com fallback", test_produtos_livros_ebooks_json_contract),
    ("vitrine mobile de produtos", test_produtos_mobile_vitrine_contract),
    ("templates geram HTML atual", test_templates_generate_current_html),
    ("sitemap e robots", test_sitemap_and_robots),
    ("nomes web sem caracteres arriscados", test_no_risky_web_filenames),
]


def main() -> int:
    results: list[TestResult] = []

    for name, fn in TESTS:
        try:
            fn()
            results.append(TestResult(name=name, ok=True))
        except Exception as exc:  # noqa: BLE001 - script de teste precisa capturar falhas variadas
            results.append(TestResult(name=name, ok=False, details=str(exc)))

    passed = sum(1 for result in results if result.ok)
    total = len(results)

    print(f"\nUniSegPub — testes básicos: {passed}/{total} passaram\n")
    for result in results:
        status = "OK" if result.ok else "FALHA"
        print(f"[{status}] {result.name}")
        if result.details:
            print(result.details.rstrip())
            print()

    return 0 if passed == total else 1


if __name__ == "__main__":
    raise SystemExit(main())
