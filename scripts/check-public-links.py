#!/usr/bin/env python3
"""Verifica links internos, assets locais e âncoras das páginas públicas do UniSegPub.

Escopo conservador:
- HTMLs públicos da raiz, /artigos e /novidades;
- href/src/srcset/action locais;
- URLs absolutas do próprio domínio universosegpub.com.br;
- âncoras no mesmo arquivo ou em outro HTML público.

Não valida links externos para evitar falsos positivos por bloqueio, timeout ou captcha.

Executar na raiz do projeto:
  python scripts/check-public-links.py
"""

from __future__ import annotations

from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIRS = {".", "artigos", "novidades"}
ATTRS_TO_CHECK = {
    "a": ["href"],
    "link": ["href"],
    "script": ["src"],
    "img": ["src", "data-src"],
    "source": ["src", "srcset"],
    "iframe": ["src"],
    "form": ["action"],
}
IGNORED_PREFIXES = (
    "mailto:",
    "tel:",
    "javascript:",
    "data:",
    "sms:",
    "whatsapp:",
)
SITE_HOST = "universosegpub.com.br"


@dataclass(frozen=True)
class Reference:
    tag: str
    attr: str
    value: str


class PublicHtmlParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.refs: list[Reference] = []
        self.ids: set[str] = set()
        self.names: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag = tag.lower()
        data = {key.lower(): value or "" for key, value in attrs}
        if data.get("id"):
            self.ids.add(data["id"])
        if tag == "a" and data.get("name"):
            self.names.add(data["name"])

        for attr in ATTRS_TO_CHECK.get(tag, []):
            value = data.get(attr, "").strip()
            if value:
                self.refs.append(Reference(tag, attr, value))

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)


def is_public_html(path: Path) -> bool:
    rel = path.relative_to(ROOT).as_posix()
    parts = rel.split("/")
    folder = "." if len(parts) == 1 else parts[0]
    return path.suffix.lower() == ".html" and folder in PUBLIC_DIRS


def parse_public_pages() -> dict[str, PublicHtmlParser]:
    pages: dict[str, PublicHtmlParser] = {}
    for path in sorted(ROOT.rglob("*.html")):
        if not is_public_html(path):
            continue
        parser = PublicHtmlParser()
        parser.feed(path.read_text(encoding="utf-8", errors="ignore"))
        pages[path.relative_to(ROOT).as_posix()] = parser
    return pages


def split_srcset(value: str) -> list[str]:
    urls: list[str] = []
    for part in value.split(","):
        url = part.strip().split(" ")[0]
        if url:
            urls.append(url)
    return urls


def is_ignored(value: str) -> bool:
    lower = value.lower()
    return value in {"#", "#!"} or lower.startswith(IGNORED_PREFIXES)


def is_external_url(parsed) -> bool:
    if parsed.scheme not in {"http", "https"}:
        return False
    return parsed.netloc.lower().replace("www.", "") != SITE_HOST


def resolve_local_path(current_page: str, url_path: str) -> Path:
    if url_path.startswith("/"):
        return ROOT / url_path.lstrip("/")
    return (ROOT / current_page).parent / url_path


def validate() -> list[str]:
    pages = parse_public_pages()
    problems: list[str] = []

    for current_page, parser in pages.items():
        for ref in parser.refs:
            values = split_srcset(ref.value) if ref.attr == "srcset" else [ref.value]
            for value in values:
                if is_ignored(value):
                    if value.startswith("#") and value not in {"#", "#!"}:
                        target = unquote(value[1:])
                        if target not in parser.ids and target not in parser.names:
                            problems.append(f"{current_page}: âncora local ausente {value}")
                    continue

                parsed = urlsplit(value)
                if is_external_url(parsed):
                    continue

                url_path = parsed.path
                if not url_path and parsed.fragment:
                    target = unquote(parsed.fragment)
                    if target not in parser.ids and target not in parser.names:
                        problems.append(f"{current_page}: âncora local ausente #{target}")
                    continue

                target_path = resolve_local_path(current_page, url_path).resolve()
                try:
                    target_rel = target_path.relative_to(ROOT).as_posix()
                except ValueError:
                    problems.append(f"{current_page}: referência fora do projeto {value}")
                    continue

                if target_path.is_dir():
                    index_path = target_path / "index.html"
                    if not index_path.is_file():
                        problems.append(f"{current_page}: diretório sem index.html {value}")
                        continue
                    target_path = index_path
                    target_rel = target_path.relative_to(ROOT).as_posix()

                if not target_path.is_file():
                    problems.append(f"{current_page}: arquivo ausente {value}")
                    continue

                if parsed.fragment and target_rel in pages:
                    target = unquote(parsed.fragment)
                    target_page = pages[target_rel]
                    if target not in target_page.ids and target not in target_page.names:
                        problems.append(f"{current_page}: âncora ausente em {target_rel} {value}")

    return problems


def main() -> int:
    problems = validate()
    if problems:
        print(f"Links públicos com problemas: {len(problems)}")
        for problem in problems:
            print(f"- {problem}")
        return 1

    print("Links públicos verificados: nenhum link interno, asset local ou âncora quebrada encontrado.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
