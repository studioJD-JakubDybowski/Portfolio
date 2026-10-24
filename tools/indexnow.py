"""Zgłasza adresy z sitemap.xml do IndexNow (Bing, Yandex, Seznam i inne — Google nie obsługuje).
Uruchamiaj PO wdrożeniu na produkcję, z katalogu projektu:
    python3 -I tools/indexnow.py            # wszystkie adresy z sitemap.xml
    python3 -I tools/indexnow.py /blog/x    # tylko wskazane ścieżki
Klucz to nazwa pliku <klucz>.txt w katalogu głównym strony."""
import glob, json, re, sys, urllib.request, urllib.error

HOST = "www.studiojd.pl"

keys = [p[:-4] for p in glob.glob("*.txt") if re.fullmatch(r"[0-9a-f]{32}\.txt", p)]
if len(keys) != 1:
    sys.exit(f"Oczekiwano jednego pliku klucza <32 znaki hex>.txt, znaleziono: {keys}")
key = keys[0]

if len(sys.argv) > 1:
    urls = [f"https://{HOST}{p}" for p in sys.argv[1:]]
else:
    urls = re.findall(r"<loc>(.*?)</loc>", open("sitemap.xml", encoding="utf-8").read())

body = json.dumps({"host": HOST, "key": key, "keyLocation": f"https://{HOST}/{key}.txt", "urlList": urls}).encode()
req = urllib.request.Request("https://api.indexnow.org/indexnow", data=body,
                             headers={"Content-Type": "application/json; charset=utf-8"})
try:
    with urllib.request.urlopen(req, timeout=20) as r:
        print(f"HTTP {r.status} — zgłoszono {len(urls)} adresów")  # 200 lub 202 = przyjęte
except urllib.error.HTTPError as e:
    sys.exit(f"HTTP {e.code} — {e.read().decode(errors='replace')[:300]}")
