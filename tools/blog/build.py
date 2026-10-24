"""Buduje statyczne strony bloga StudioJD z jednego szablonu.
Uruchom z katalogu projektu: python3 -I tools/blog/build.py .
Treść wpisów edytujesz w tools/blog/posts.py; strony trafiają do blog/.
Po wdrożeniu na produkcję zgłoś nowe adresy: python3 -I tools/indexnow.py"""
import json, sys, html, pathlib, importlib.util

ROOT = pathlib.Path(sys.argv[1])
HERE = pathlib.Path(__file__).parent
SITE = "https://www.studiojd.pl"

spec = importlib.util.spec_from_file_location("posts", HERE / "posts.py")
posts_mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(posts_mod)
POSTS = posts_mod.POSTS

HEADER = """  <a class="skip-link" href="#main">Przejdź do treści</a>
  <header class="site-header is-scrolled" id="siteHeader">
    <nav class="nav container" aria-label="Nawigacja główna">
      <a class="nav__logo" href="/" aria-label="StudioJD — strona główna">
        <span class="logo-text">Studio<em>JD</em></span>
      </a>
      <button class="nav__toggle" id="navToggle" aria-expanded="false" aria-controls="navMenu" aria-label="Otwórz menu">
        <span></span><span></span>
      </button>
      <ul class="nav__menu" id="navMenu" role="list">
        <li><a href="/#uslugi">Usługi</a></li>
        <li><a href="/#realizacje">Realizacje</a></li>
        <li><a href="/#proces">Jak działamy</a></li>
        <li><a href="/blog"{blog_current}>Blog</a></li>
        <li><a href="/#kontakt" class="nav__cta">Bezpłatna wycena</a></li>
      </ul>
    </nav>
  </header>"""

FOOTER = """  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <a href="/" class="logo-text" aria-label="StudioJD strona główna">Studio<em>JD</em></a>
          <p>Strony, sklepy i aplikacje dla firm.<br>Zambrów — obsługa całej Polski.</p>
        </div>
        <nav class="footer__nav" aria-label="Nawigacja w stopce">
          <ul role="list">
            <li><a href="/#uslugi">Usługi</a></li>
            <li><a href="/#realizacje">Realizacje</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/#kontakt">Kontakt</a></li>
          </ul>
          <ul role="list">
            <li><a href="/regulamin">Regulamin</a></li>
            <li><a href="/polityka-prywatnosci">Polityka prywatności</a></li>
            <li><a href="/polityka-cookies">Polityka cookies</a></li>
          </ul>
        </nav>
      </div>
      <div class="footer__bottom">
        <p>&copy; 2026 StudioJD. Wszelkie prawa zastrzeżone.</p>
        <p class="footer__nip">Zambrów, Podlaskie</p>
      </div>
    </div>
  </footer>

  <script src="/js/main.js" defer></script>"""

HEAD = """<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <link rel="canonical" href="{url}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/favicon.svg">
  <meta property="og:type" content="{og_type}">
  <meta property="og:url" content="{url}">
  <meta property="og:title" content="{og_title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:image" content="{SITE}/og-image.png">
  <meta property="og:locale" content="pl_PL">
  <meta property="og:site_name" content="StudioJD">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preload" href="/fonts/playfair-display-normal-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/dm-sans-normal-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/css/style.css">
  <script type="application/ld+json">
{jsonld}
  </script>
</head>
<body>
"""

ORG = {"@type": "Organization", "name": "StudioJD", "url": SITE, "logo": f"{SITE}/favicon.svg"}


def jsonld(obj):
    return "\n".join("  " + line for line in json.dumps(obj, ensure_ascii=False, indent=2).splitlines())


def esc(s):
    return html.escape(s, quote=True)


def build_post(p, others):
    url = f"{SITE}/blog/{p['slug']}"
    ld = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BlogPosting",
                "headline": p["title"],
                "description": p["desc"],
                "datePublished": p["date"],
                "dateModified": p["date"],
                "inLanguage": "pl-PL",
                "mainEntityOfPage": url,
                "author": ORG,
                "publisher": ORG,
                "image": f"{SITE}/og-image.png",
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "StudioJD", "item": SITE + "/"},
                    {"@type": "ListItem", "position": 2, "name": "Blog", "item": SITE + "/blog"},
                    {"@type": "ListItem", "position": 3, "name": p["title"], "item": url},
                ],
            },
        ],
    }
    keys = "\n".join(f"            <li>{k}</li>" for k in p["key"])
    sources = "\n".join(
        f'            <li id="zr-{i}"><a href="{esc(u)}" rel="noopener" target="_blank">{t}</a></li>'
        for i, (t, u) in enumerate(p["sources"], 1)
    )
    related = "\n".join(f'          <a href="/blog/{o["slug"]}">{o["title"]}</a>' for o in others)
    out = HEAD.format(
        title=esc(p["title"]) + " — Blog StudioJD",
        desc=esc(p["desc"]), url=url, og_type="article", og_title=esc(p["title"]),
        SITE=SITE, jsonld=jsonld(ld),
    )
    out += HEADER.format(blog_current=' aria-current="page"') + "\n\n"
    out += f"""  <main id="main">
    <article class="article">
      <div class="container">
        <div class="article__inner">
          <p class="article__crumbs"><a href="/">StudioJD</a> / <a href="/blog">Blog</a></p>
          <p class="article__cat">{p['cat']}</p>
          <h1 class="article__title">{p['title']}</h1>
          <p class="article__meta">
            <span>StudioJD</span>
            <time datetime="{p['date']}">{p['date_pl']}</time>
            <span>{p['read']} min czytania</span>
          </p>
          <p class="article__lead">{p['lead']}</p>

          <aside class="keybox" aria-label="Najważniejsze w skrócie">
            <p class="keybox__title">W skrócie</p>
            <ul>
{keys}
            </ul>
          </aside>

          <div class="prose">
{p['body']}
          </div>

          <aside class="article-cta">
            <h2>{p['cta_title']}</h2>
            <p>{p['cta_text']}</p>
            <a href="/#kontakt" class="btn">Bezpłatna wycena</a>
          </aside>

          <section class="sources" aria-labelledby="sources-h">
            <h2 id="sources-h">Źródła</h2>
            <ol>
{sources}
            </ol>
          </section>

          <nav class="related" aria-labelledby="related-h">
            <h2 id="related-h">Czytaj dalej</h2>
{related}
          </nav>
        </div>
      </div>
    </article>
  </main>

"""
    out += FOOTER + "\n</body>\n</html>\n"
    return out


def build_index(posts):
    url = f"{SITE}/blog"
    ld = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Blog StudioJD",
        "url": url,
        "inLanguage": "pl-PL",
        "publisher": ORG,
        "blogPost": [
            {"@type": "BlogPosting", "headline": p["title"], "url": f"{SITE}/blog/{p['slug']}", "datePublished": p["date"]}
            for p in posts
        ],
    }
    desc = "Praktyczna wiedza o stronach internetowych, sklepach i systemach dla firm: koszty, decyzje, dane. Bez żargonu, ze źródłami."
    rows = []
    for i, p in enumerate(posts, 1):
        rows.append(f"""        <li class="post-row">
          <a class="post-row__link" href="/blog/{p['slug']}">
            <span class="post-row__num" aria-hidden="true">{i:02d}</span>
            <span>
              <span class="post-row__cat">{p['cat']}</span>
              <h2 class="post-row__title">{p['title']}</h2>
              <p class="post-row__excerpt">{p['desc']}</p>
              <p class="post-row__meta"><time datetime="{p['date']}">{p['date_pl']}</time> · {p['read']} min czytania</p>
            </span>
            <span class="post-row__arrow" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
          </a>
        </li>""")
    out = HEAD.format(
        title="Blog — strony, sklepy i systemy dla firm | StudioJD",
        desc=esc(desc), url=url, og_type="website", og_title="Blog StudioJD", SITE=SITE, jsonld=jsonld(ld),
    )
    out += HEADER.format(blog_current=' aria-current="page"') + "\n\n"
    out += f"""  <main id="main">
    <section class="blog-hero">
      <div class="container">
        <p class="blog-hero__label">Blog StudioJD</p>
        <h1 class="blog-hero__title">Wiedza, która <em>oszczędza</em> pieniądze.</h1>
        <p class="blog-hero__lead">Piszemy o tym, o co klienci pytają nas najczęściej: ile coś kosztuje, co wybrać i czego unikać. Konkretnie, bez żargonu — a każdą liczbę podpieramy źródłem.</p>
      </div>
    </section>

    <section class="container" aria-label="Wpisy na blogu">
      <ol class="post-list" role="list">
{chr(10).join(rows)}
      </ol>
    </section>
  </main>

"""
    out += FOOTER + "\n</body>\n</html>\n"
    return out


def main():
    blog = ROOT / "blog"
    blog.mkdir(exist_ok=True)
    for p in POSTS:
        others = [o for o in POSTS if o is not p]
        (blog / f"{p['slug']}.html").write_text(build_post(p, others), encoding="utf-8")
    (blog / "index.html").write_text(build_index(POSTS), encoding="utf-8")
    print("zbudowano:", [p["slug"] for p in POSTS] + ["index"])


main()
