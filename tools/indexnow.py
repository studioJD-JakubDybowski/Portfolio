"""Zgłasza adresy z sitemap.xml do IndexNow (Bing, Yandex, Seznam i inne — Google nie obsługuje).
Uruchamiaj PO wdrożeniu na produkcję, z katalogu projektu:
    python3 -I tools/indexnow.py            # wszystkie adresy z sitemap.xml
    python3 -I tools/indexnow.py /blog/x    # tylko wskazane ścieżki
Klucz to nazwa pliku <klucz>.txt w katalogu głównym strony."""
import glob, json, re, subprocess, sys

HOST = "www.studiojd.pl"

keys = [p[:-4] for p in glob.glob("*.txt") if re.fullmatch(r"[0-9a-f]{32}\.txt", p)]
if len(keys) != 1:
    sys.exit(f"Oczekiwano jednego pliku klucza <32 znaki hex>.txt, znaleziono: {keys}")
key = keys[0]

if len(sys.argv) > 1:
    urls = [f"https://{HOST}{p}" for p in sys.argv[1:]]
else:
    urls = re.findall(r"<loc>(.*?)</loc>", open("sitemap.xml", encoding="utf-8").read())

body = json.dumps({"host": HOST, "key": key, "keyLocation": f"https://{HOST}/{key}.txt", "urlList": urls})
# Wysyłka przez systemowy curl: Python z python.org na macOS często nie ma certyfikatów CA.
res = subprocess.run(
    ["curl", "-sS", "-o", "/dev/null", "-w", "%{http_code}", "-X", "POST",
     "-H", "Content-Type: application/json; charset=utf-8", "--data-binary", "@-",
     "https://api.indexnow.org/indexnow"],
    input=body, capture_output=True, text=True, timeout=30,
)
code = res.stdout.strip()
if code in ("200", "202"):
    print(f"HTTP {code} — zgłoszono {len(urls)} adresów")
else:
    sys.exit(f"HTTP {code or '?'} — {res.stderr.strip()[:300]}")
