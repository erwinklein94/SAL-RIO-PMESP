#!/usr/bin/env python3
"""Gera o sitemap.xml do Universo Segurança Pública a partir das páginas HTML públicas.

Regras conservadoras:
- inclui apenas HTMLs públicos da raiz, /artigos e /novidades;
- ignora 404, partials, templates, páginas noindex e páginas com canonical para outra URL;
- usa / para a home em vez de /index.html;
- evita URLs duplicadas.

Executar na raiz do projeto:
  python scripts/generate-sitemap.py

Conferir sem alterar arquivo:
  python scripts/generate-sitemap.py --check
"""

from __future__ import annotations

import argparse
import re
import sys
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from datetime import datetime
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

BASE_URL = "https://universosegpub.com.br"
ROOT = Path(__file__).resolve().parents[1]
SITEMAP_PATH = ROOT / "sitemap.xml"
SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9"

PUBLIC_DIRS = {".", "artigos", "novidades"}
EXCLUDED_FILES = {"404.html"}

PRIORITY_BY_PATH = {
    "index.html": "1.0",
    "remuneracao.html": "0.95",
    "concursos.html": "0.95",
    "noticias.html": "0.90",
    "artigos/index.html": "0.82",
    "guia-instituicoes.html": "0.90",
    "comparar-carreiras.html": "0.85",
    "direitos.html": "0.85",
    "acoes-judiciais.html": "0.80",
    "associacoes-sindicatos.html": "0.80",
    "brasoes.html": "0.80",
    "produtos.html": "0.70",
    "anuncie.html": "0.60",
    "privacidade.html": "0.30",
    "termos.html": "0.30",
    "cookies.html": "0.30",
}

CHANGEFREQ_BY_PATH = {
    "index.html": "weekly",
    "remuneracao.html": "weekly",
    "concursos.html": "weekly",
    "noticias.html": "daily",
    "artigos/index.html": "weekly",
    "guia-instituicoes.html": "monthly",
    "comparar-carreiras.html": "monthly",
    "direitos.html": "monthly",
    "acoes-judiciais.html": "weekly",
    "associacoes-sindicatos.html": "weekly",
    "brasoes.html": "monthly",
    "produtos.html": "weekly",
    "anuncie.html": "monthly",
    "privacidade.html": "yearly",
    "termos.html": "yearly",
    "cookies.html": "yearly",
}

ROOT_ORDER = [
    "index.html",
    "remuneracao.html",
    "concursos.html",
    "guia-instituicoes.html",
    "comparar-carreiras.html",
    "direitos.html",
    "brasoes.html",
    "noticias.html",
    "artigos/index.html",
    "acoes-judiciais.html",
    "associacoes-sindicatos.html",
    "produtos.html",
    "anuncie.html",
    "privacidade.html",
    "termos.html",
    "cookies.html",
]


@dataclass(frozen=True)
class PageInfo:
    rel_path: str
    canonical: str | None
    robots: str | None


class HeadMetaParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.canonical: str | None = None
        self.robots: str | None = None

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = {key.lower(): (value or "") for key, value in attrs}
        if tag.lower() == "link" and data.get("rel", "").lower() == "canonical":
            self.canonical = data.get("href") or None
        if tag.lower() == "meta" and data.get("name", "").lower() == "robots":
            self.robots = data.get("content") or None

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)


def normalize_rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def url_for(rel_path: str) -> str:
    if rel_path == "index.html":
        return f"{BASE_URL}/"
    if rel_path.endswith("/index.html"):
        return f"{BASE_URL}/{rel_path[:-len('index.html')]}"
    return f"{BASE_URL}/{rel_path}"


def path_from_url(url: str) -> str:
    parsed = urlsplit(url)
    raw_path = parsed.path
    path = raw_path.strip("/")
    if not path:
        return "index.html"
    if raw_path.endswith("/"):
        return f"{path}/index.html"
    return path


def read_page_info(path: Path) -> PageInfo:
    rel_path = normalize_rel(path)
    parser = HeadMetaParser()
    html = path.read_text(encoding="utf-8", errors="ignore")
    head_match = re.search(r"<head[^>]*>(.*?)</head>", html, flags=re.IGNORECASE | re.DOTALL)
    parser.feed(head_match.group(1) if head_match else html[:8000])
    return PageInfo(rel_path=rel_path, canonical=parser.canonical, robots=parser.robots)


def is_public_candidate(path: Path) -> bool:
    rel_path = normalize_rel(path)
    parts = rel_path.split("/")
    folder = "." if len(parts) == 1 else parts[0]
    if folder not in PUBLIC_DIRS:
        return False
    if rel_path in EXCLUDED_FILES:
        return False
    return path.suffix.lower() == ".html"


def is_indexable_self_canonical(page: PageInfo) -> bool:
    robots = (page.robots or "").lower().replace(" ", "")
    if "noindex" in robots:
        return False

    expected_url = url_for(page.rel_path).rstrip("/")
    if page.canonical:
        canonical = page.canonical.rstrip("/")
        if canonical != expected_url:
            return False

    return True


def page_sort_key(page: PageInfo) -> tuple[int, str]:
    if page.rel_path in ROOT_ORDER:
        return (ROOT_ORDER.index(page.rel_path), page.rel_path)
    if page.rel_path.startswith("novidades/"):
        return (100, page.rel_path)
    if page.rel_path.startswith("artigos/"):
        return (200, page.rel_path)
    return (300, page.rel_path)


def last_modified_date(rel_path: str) -> str:
    timestamp = (ROOT / rel_path).stat().st_mtime
    return datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d")


def changefreq_for(rel_path: str) -> str:
    if rel_path.startswith("artigos/") or rel_path.startswith("novidades/"):
        return "monthly"
    return CHANGEFREQ_BY_PATH.get(rel_path, "monthly")


def priority_for(rel_path: str) -> str:
    if rel_path.startswith("artigos/") or rel_path.startswith("novidades/"):
        return "0.75"
    return PRIORITY_BY_PATH.get(rel_path, "0.50")


def collect_pages() -> list[PageInfo]:
    pages: list[PageInfo] = []
    seen_urls: set[str] = set()

    for path in sorted(ROOT.rglob("*.html")):
        if not is_public_candidate(path):
            continue
        page = read_page_info(path)
        if not is_indexable_self_canonical(page):
            continue
        loc = url_for(page.rel_path)
        if loc in seen_urls:
            continue
        seen_urls.add(loc)
        pages.append(page)

    return sorted(pages, key=page_sort_key)


def build_sitemap_xml(pages: list[PageInfo]) -> str:
    ET.register_namespace("", SITEMAP_NS)
    urlset = ET.Element(f"{{{SITEMAP_NS}}}urlset")

    for page in pages:
        url = ET.SubElement(urlset, f"{{{SITEMAP_NS}}}url")
        ET.SubElement(url, f"{{{SITEMAP_NS}}}loc").text = url_for(page.rel_path)
        ET.SubElement(url, f"{{{SITEMAP_NS}}}lastmod").text = last_modified_date(page.rel_path)
        ET.SubElement(url, f"{{{SITEMAP_NS}}}changefreq").text = changefreq_for(page.rel_path)
        ET.SubElement(url, f"{{{SITEMAP_NS}}}priority").text = priority_for(page.rel_path)

    tree = ET.ElementTree(urlset)
    ET.indent(tree, space="  ")
    return ET.tostring(urlset, encoding="unicode", xml_declaration=True)


def main() -> int:
    parser = argparse.ArgumentParser(description="Gera e valida o sitemap.xml do site.")
    parser.add_argument("--check", action="store_true", help="não grava; apenas verifica se o sitemap está atualizado")
    args = parser.parse_args()

    pages = collect_pages()
    xml_text = build_sitemap_xml(pages) + "\n"

    if args.check:
        current = SITEMAP_PATH.read_text(encoding="utf-8") if SITEMAP_PATH.exists() else ""
        if current != xml_text:
            print("sitemap.xml está desatualizado. Execute: python scripts/generate-sitemap.py")
            return 1
        print(f"sitemap.xml atualizado ({len(pages)} URLs).")
        return 0

    SITEMAP_PATH.write_text(xml_text, encoding="utf-8")
    print(f"sitemap.xml gerado com {len(pages)} URLs.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
