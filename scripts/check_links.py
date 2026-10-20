#!/usr/bin/env python3
"""Link checker for the portfolio.

Default mode  : verifies every internal href/src in index.html resolves to a real file.
--external mode: also HEAD/GET-checks external URLs (some sites block bots, e.g. LinkedIn).
"""
from __future__ import annotations

import re
import sys
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
HTML = ROOT / "index.html"
SKIP_PREFIX = ("#", "mailto:", "tel:", "javascript:", "data:")

# Non-live site URLs referenced in <link>/<meta> (canonical, OG) are not fetched
# by this checker; it validates <a>, <img>, <script> and local stylesheet/icon links.


class _LinkParser(HTMLParser):
    """Collects checkable URLs: <a href>, <img src>, <script src>, stylesheet <link href>."""

    def __init__(self) -> None:
        super().__init__()
        self.urls: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        d = {k: (v or "") for k, v in attrs}
        if tag == "a" and d.get("href"):
            self.urls.append(d["href"])
        elif tag in {"img", "script"} and d.get("src"):
            self.urls.append(d["src"])
        elif tag == "link" and d.get("href"):
            rel = (d.get("rel") or "").lower()
            if "stylesheet" in rel or "icon" in rel or "apple-touch-icon" in rel:
                self.urls.append(d["href"])


def _all_urls() -> list[str]:
    parser = _LinkParser()
    parser.feed(HTML.read_text(encoding="utf-8"))
    return parser.urls


def internal_targets() -> list[str]:
    out = []
    for url in _all_urls():
        if url.startswith(SKIP_PREFIX) or url.startswith(("http://", "https://")):
            continue
        out.append(url.split("?")[0].split("#")[0])
    return sorted(set(out))


def external_targets() -> list[str]:
    return sorted({u for u in _all_urls() if u.startswith(("http://", "https://"))})


def check_internal() -> int:
    failures = []
    targets = internal_targets()
    for rel in targets:
        path = ROOT / rel
        if not path.exists():
            failures.append(rel)
        elif path.is_file() and path.stat().st_size == 0:
            failures.append(f"{rel} (empty file)")
    print(f"Checked {len(targets)} internal references.")
    if failures:
        print("MISSING:")
        for f in failures:
            print(f"  - {f}")
        return 1
    print("All internal links and assets resolve. ✔")
    return 0


def check_external() -> int:
    urls = external_targets()
    # Sites known to block automated clients with non-2xx codes.
    expected_block = {
        "https://www.linkedin.com/in/titus-kipkoech-ronoh-56a6082a9",
    }
    # Render free-tier services return 503 "Service Suspended" when paused; the
    # URLs are valid and self-restore once resumed in the Render dashboard.
    render_ok = (".onrender.com",)
    problems = []
    for url in urls:
        host = urlparse(url).netloc
        try:
            req = urllib.request.Request(
                url,
                method="HEAD",
                headers={"User-Agent": "Mozilla/5.0 (portfolio-link-check)"},
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                code = resp.status
        except Exception as exc:  # noqa: BLE001
            code = getattr(exc, "code", None)
            if code is None:
                # Some CDNs reject HEAD; retry with GET
                try:
                    req = urllib.request.Request(
                        url,
                        method="GET",
                        headers={"User-Agent": "Mozilla/5.0 (portfolio-link-check)"},
                    )
                    with urllib.request.urlopen(req, timeout=15) as resp:
                        code = resp.status
                except Exception as exc2:  # noqa: BLE001
                    code = getattr(exc2, "code", None) or str(exc2)

        ok = isinstance(code, int) and 200 <= code < 400
        if ok:
            mark = "✔"
        elif url in expected_block:
            mark = "⚠ (bot-blocked?) "
        elif isinstance(code, int) and code == 503 and host.endswith(render_ok):
            mark = "⚠ (Render suspended — resume in dashboard) "
        else:
            mark = "✘"
        print(f"  {mark} {code}  {host}{urlparse(url).path[:60]}")
        is_render_suspended = (
            isinstance(code, int) and code == 503 and host.endswith(render_ok)
        )
        if not ok and url not in expected_block and not is_render_suspended:
            problems.append((url, code))

    if problems:
        print("\nExternal issues (verify manually):")
        for url, code in problems:
            print(f"  - {code}  {url}")
        return 1
    print("\nExternal links look good. ✔")
    return 0


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "--internal"
    rc = check_internal()
    if mode == "--external":
        rc = rc or check_external()
    sys.exit(rc)
