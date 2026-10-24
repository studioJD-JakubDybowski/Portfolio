"""Treść wpisów bloga StudioJD. Kolejność = kolejność na liście (najnowsze/najważniejsze na górze)."""

GUS_URL = "https://stat.gov.pl/obszary-tematyczne/nauka-i-technika-spoleczenstwo-informacyjne/spoleczenstwo-informacyjne/wykorzystanie-technologii-informacyjno-komunikacyjnych-w-przedsiebiorstwach-i-gospodarstwach-domowych-w-2025-r-,3,25.html"
PEW_URL = "https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/"
BL_URL = "https://www.brightlocal.com/research/local-consumer-review-survey/"
ALMANAC_URL = "https://almanac.httparchive.org/en/2025/performance"
DELOITTE_URL = "https://web.dev/case-studies/milliseconds-make-millions"
UPA_URL = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19940240083"


def cite(n):
    return f'<sup><a href="#zr-{n}" aria-label="Źródło {n}">[{n}]</a></sup>'


POSTS = [
    # ─────────────────────────────────────────────────────────────
    {
        "slug": "ile-kosztuje-strona-internetowa-dla-firmy",
        "cat": "Koszty",
        "title": "Ile kosztuje strona internetowa dla firmy w 2026 roku?",
        "desc": "Konkretne ceny startowe, koszty stałe, o których mało kto mówi przy wycenie, i 7 pytań, które warto zadać każdemu wykonawcy przed podpisaniem umowy.",
        "date": "2026-10-23", "date_pl": "23 października 2026", "read": 7,
        "lead": "Odpowiedź „to zależy” nikomu nie pomaga podjąć decyzji. Dlatego poniżej znajdziesz nasze realne ceny startowe, koszty, które pojawiają się po wdrożeniu, oraz listę pytań, dzięki którym porównasz oferty różnych wykonawców jabłko do jabłka.",
        "key": [
            "Strona firmowa lub landing page w StudioJD: od 699 zł, realizacja 2–3 tygodnie.",
            "Sklep internetowy: od 1 499 zł, realizacja 4–6 tygodni.",
            "Do ceny projektu doliczaj koszty stałe: domenę, hosting i — jeśli chcesz spokoju — opiekę techniczną.",
            "Najdroższa jest strona, która nie przynosi zapytań. Pytaj o szybkość na telefonie, widoczność w Google i o to, kto będzie właścicielem domeny i plików.",
        ],
        "body": f"""            <h2>Od czego zależy cena strony internetowej</h2>
            <p>Dwie strony, które z daleka wyglądają podobnie, mogą różnić się ceną kilkukrotnie. Różnica prawie zawsze wynika z czterech rzeczy:</p>
            <ul>
              <li><strong>Zakres treści.</strong> Wizytówka z jedną stroną to coś innego niż serwis z dziesięcioma podstronami usług. Ważne jest też, kto przygotowuje teksty i zdjęcia.</li>
              <li><strong>Projekt indywidualny czy szablon.</strong> Szablon jest tańszy na start, ale wygląda jak setki innych stron i trudniej go dopasować do Twojej marki.</li>
              <li><strong>Funkcje.</strong> Formularz kontaktowy to standard. Rezerwacje online, płatności, wersje językowe czy połączenie z programem do faktur podnoszą koszt.</li>
              <li><strong>Jakość „pod maską”.</strong> Szybkość ładowania, przygotowanie pod Google, dostępność dla osób z niepełnosprawnościami i bezpieczeństwo. Tego nie widać na pierwszy rzut oka, ale to właśnie decyduje, czy strona zarabia.</li>
            </ul>

            <h2>Nasz cennik: ceny startowe</h2>
            <p>Publikujemy ceny, bo uważamy, że klient ma prawo wiedzieć, w jakim przedziale się poruszamy, zanim do nas napisze. To ceny startowe — dokładną wycenę przygotowujemy bezpłatnie po krótkiej rozmowie o Twoich potrzebach.</p>
            <div class="table-wrap">
              <table>
                <thead><tr><th scope="col">Usługa</th><th scope="col">Cena od</th><th scope="col">Czas realizacji</th></tr></thead>
                <tbody>
                  <tr><td>Strona firmowa / landing page</td><td>699 zł</td><td>2–3 tygodnie</td></tr>
                  <tr><td>Sklep internetowy</td><td>1 499 zł</td><td>4–6 tygodni</td></tr>
                  <tr><td>Redesign istniejącej strony</td><td>800 zł</td><td>2–4 tygodnie</td></tr>
                  <tr><td>SEO i widoczność w Google</td><td>600 zł / mies.</td><td>umowa min. 3 miesiące</td></tr>
                  <tr><td>Opieka i utrzymanie strony</td><td>150 zł / mies.</td><td>—</td></tr>
                </tbody>
              </table>
            </div>

            <h2>Koszty, o których mało kto mówi przy wycenie</h2>
            <p>Cena projektu to nie wszystko. Zanim porównasz oferty, dopytaj o koszty, które pojawią się po wdrożeniu:</p>
            <ul>
              <li><strong>Domena.</strong> Opłacana co roku. Uważaj na promocje — pierwszy rok bywa bardzo tani, a odnowienie kilka razy droższe. Zawsze sprawdzaj cenę odnowienia.</li>
              <li><strong>Hosting</strong>, czyli miejsce na serwerze, gdzie „mieszka” strona. Dla typowej strony firmowej koszty domeny i hostingu łącznie to zwykle od kilkudziesięciu do kilkuset złotych rocznie.</li>
              <li><strong>Aktualizacje i kopie zapasowe.</strong> Szczególnie strony na popularnych systemach z wieloma wtyczkami wymagają regularnych aktualizacji. Ktoś musi to robić — Ty albo wykonawca.</li>
              <li><strong>Zmiany po oddaniu projektu.</strong> Zapytaj, ile poprawek jest w cenie i ile kosztuje każda kolejna zmiana.</li>
            </ul>

            <h2>Szybkość strony to też pieniądze</h2>
            <p>Wolna strona traci klientów, zanim zobaczą ofertę. Problem jest powszechny: według raportu HTTP Archive Web Almanac 2025 tylko 48% stron w wersji mobilnej spełnia wszystkie trzy wskaźniki Core Web Vitals, którymi Google ocenia wygodę korzystania ze strony{cite(1)}.</p>
            <div class="stat-callout">
              <span class="stat-callout__num">48%</span>
              <p class="stat-callout__text">stron w wersji mobilnej przechodzi wszystkie wskaźniki Core Web Vitals (2025). Najczęstszą przyczyną porażki jest zbyt wolne wyświetlanie głównej treści.{cite(1)}</p>
            </div>
            <p>Badanie przeprowadzone przez Deloitte Digital dla Google pokazało, że poprawa szybkości mobilnej strony o 0,1 sekundy wiązała się ze wzrostem konwersji w sklepach o około 8%{cite(2)}. To korelacja zaobserwowana w konkretnej grupie firm, a nie gwarancja — ale kierunek jest jasny: szybkość nie jest „techniczną ciekawostką”.</p>
            <p>Dobry wykonawca bez problemu pokaże Ci wynik swoich wcześniejszych realizacji w bezpłatnym narzędziu Google PageSpeed Insights.</p>

            <h2>Strona za 300 zł — na co uważać</h2>
            <p>Niska cena nie musi oznaczać złej jakości. Ale te sygnały powinny zapalić czerwoną lampkę:</p>
            <ul>
              <li><strong>Brak umowy.</strong> Przeniesienie autorskich praw majątkowych do strony wymaga formy pisemnej{cite(3)}. Bez tego formalnie nie jesteś pełnym właścicielem tego, za co zapłaciłeś.</li>
              <li><strong>Domena zarejestrowana na wykonawcę.</strong> Gdy współpraca się skończy, możesz stracić adres, pod którym znają Cię klienci.</li>
              <li><strong>Brak dostępu do plików i panelu.</strong> Każda drobna zmiana będzie wymagała kontaktu z jedną osobą.</li>
              <li><strong>Strona nie działa dobrze na telefonie.</strong> Sprawdź to sam na swoim smartfonie, zanim zapłacisz.</li>
            </ul>

            <h2>7 pytań, które warto zadać każdemu wykonawcy</h2>
            <ol>
              <li>Kto będzie właścicielem domeny i plików strony?</li>
              <li>Czy cena obejmuje teksty i zdjęcia, czy przygotowuję je sam?</li>
              <li>Ile rund poprawek jest w cenie?</li>
              <li>Jak szybko ładują się Państwa poprzednie realizacje na telefonie? Czy mogę zobaczyć wynik w PageSpeed Insights?</li>
              <li>Jakie są koszty stałe po wdrożeniu (domena, hosting, opieka)?</li>
              <li>Czy strona będzie miała politykę prywatności i obsługę zgód na cookies zgodną z RODO?</li>
              <li>Kto i jak szybko reaguje, gdy strona przestanie działać?</li>
            </ol>
            <p>Na każde z tych pytań odpowiadamy na piśmie, w ofercie — zanim cokolwiek podpiszesz. Pracujemy zdalnie z Zambrowa, więc możemy współpracować z firmą z dowolnego miejsca w Polsce.</p>""",
        "cta_title": "Chcesz wiedzieć, ile będzie kosztować Twoja strona?",
        "cta_text": "Opisz krótko, czego potrzebujesz. Odpowiemy w ciągu 24 godzin z konkretną, bezpłatną wyceną — bez zobowiązań.",
        "sources": [
            ("HTTP Archive, Web Almanac 2025 — rozdział Performance", ALMANAC_URL),
            ("Deloitte Digital / Google, „Milliseconds Make Millions” (opis badania na web.dev)", DELOITTE_URL),
            ("Ustawa o prawie autorskim i prawach pokrewnych, art. 53 (ISAP)", UPA_URL),
        ],
    },
    # ─────────────────────────────────────────────────────────────
    {
        "slug": "czy-firma-potrzebuje-strony-internetowej",
        "cat": "Strategia",
        "title": "Czy firma potrzebuje strony, jeśli ma Facebooka i wizytówkę Google?",
        "desc": "Co mówią dane GUS o stronach internetowych polskich firm, jak AI zmienia wyszukiwanie i dlaczego strona, wizytówka Google i social media powinny działać razem.",
        "date": "2026-10-23", "date_pl": "23 października 2026", "read": 6,
        "lead": "Wiele lokalnych firm zaczyna od fanpage’a i profilu w Google. To dobry start. Ale oba te miejsca należą do kogoś innego — to platforma decyduje, co i komu pokaże. Własna strona jest jedynym kanałem, nad którym masz pełną kontrolę.",
        "key": [
            "Według GUS w 2025 roku własną stronę internetową miało 63,4% małych firm (10–49 pracujących) — więc co trzecia mała firma wciąż jej nie ma.",
            "Klienci sprawdzają firmę w wielu miejscach naraz: 97% badanych konsumentów czyta opinie o lokalnych firmach (BrightLocal 2026, USA).",
            "Coraz częściej odpowiedzi udziela AI: przy podsumowaniu AI w Google użytkownicy klikali w zwykły wynik w 8% wizyt, a bez niego w 15% (Pew Research).",
            "Strona to centrum: wizytówka Google i social media powinny na nią kierować, a ona — zawierać pełną ofertę, ceny orientacyjne i FAQ.",
        ],
        "body": f"""            <h2>Co mówią dane z Polski</h2>
            <p>Główny Urząd Statystyczny co roku bada, jak firmy korzystają z technologii. W badaniu z 2025 roku własną stronę internetową miało 67,5% przedsiębiorstw zatrudniających co najmniej 10 osób{cite(1)}. Im mniejsza firma, tym rzadziej:</p>
            <div class="table-wrap">
              <table>
                <thead><tr><th scope="col">Wielkość firmy</th><th scope="col">Ma stronę internetową</th></tr></thead>
                <tbody>
                  <tr><td>Małe (10–49 pracujących)</td><td>63,4%</td></tr>
                  <tr><td>Średnie (50–249)</td><td>84,4%</td></tr>
                  <tr><td>Duże (250 i więcej)</td><td>92,7%</td></tr>
                </tbody>
              </table>
            </div>
            <p>Badanie GUS nie obejmuje najmniejszych firm, zatrudniających mniej niż 10 osób — a to właśnie one stanowią większość lokalnych biznesów. Jeśli prowadzisz warsztat, gabinet czy firmę usługową, własna strona wciąż może być realną przewagą nad konkurencją.</p>

            <h2>Wizytówka Google: konieczna, ale niewystarczająca</h2>
            <p>Profil firmy w Google to podstawa, jeśli klienci szukają Cię lokalnie — pokazuje Cię w Mapach i wynikach „w pobliżu”. Ale ma ograniczenia: mało miejsca na opis oferty, brak możliwości pokazania pełnego cennika czy procesu współpracy, a o tym, co się wyświetla, decyduje Google. Wizytówka powinna prowadzić klienta dalej — na Twoją stronę.</p>

            <h2>Facebook: dobry do kontaktu, słaby do bycia znalezionym</h2>
            <p>Fanpage świetnie sprawdza się w utrzymywaniu relacji z obecnymi klientami. Gorzej z pozyskiwaniem nowych: zasięg postów zależy od algorytmu, nie każdy klient korzysta z Facebooka, a osoba szukająca usługi w Google częściej trafi na stronę internetową niż na post sprzed miesiąca.</p>

            <h2>Wyszukiwanie zmienia się przez AI</h2>
            <p>Google coraz częściej pokazuje nad wynikami podsumowanie wygenerowane przez sztuczną inteligencję. Pew Research Center przeanalizowało zachowanie 900 dorosłych Amerykanów: gdy pojawiało się podsumowanie AI, użytkownicy klikali w zwykły wynik wyszukiwania w 8% wizyt, a bez podsumowania — w 15%{cite(2)}.</p>
            <div class="stat-callout">
              <span class="stat-callout__num">45%</span>
              <p class="stat-callout__text">konsumentów w badaniu BrightLocal 2026 korzystało z ChatGPT lub innych narzędzi AI, szukając rekomendacji lokalnych firm — rok wcześniej było to 6%. Dane dotyczą rynku amerykańskiego.{cite(3)}</p>
            </div>
            <p>Co z tego wynika dla Twojej firmy? Asystenci AI i podsumowania w Google opierają się na informacjach, które znajdą w sieci. Jeśli Twoja oferta, ceny orientacyjne, obszar działania i odpowiedzi na częste pytania są jasno opisane na Twojej stronie, rośnie szansa, że to właśnie Ciebie zacytują. Jeśli istniejesz tylko na Facebooku — AI ma znacznie mniej materiału.</p>

            <h2>Opinie decydują — i muszą być prawdziwe</h2>
            <p>W tym samym badaniu BrightLocal 97% konsumentów deklarowało, że czyta opinie o lokalnych firmach, a 74% szuka opinii z ostatnich trzech miesięcy{cite(3)}. Zbieraj opinie regularnie i odpowiadaj na nie. Pamiętaj też, że publikowanie fałszywych opinii jest w Polsce nieuczciwą praktyką rynkową.</p>

            <h2>Co powinna zawierać strona lokalnej firmy</h2>
            <ul>
              <li>Jasny opis usług i <strong>orientacyjne ceny</strong> — to pierwsze, czego szukają klienci.</li>
              <li><strong>Obszar działania</strong> — miasta i okolice, które obsługujesz.</li>
              <li>Telefon, który można kliknąć na smartfonie, oraz prosty formularz.</li>
              <li>Prawdziwe opinie klientów i zdjęcia realizacji.</li>
              <li>Sekcję z <strong>najczęstszymi pytaniami</strong> — pomaga i klientom, i wyszukiwarkom.</li>
              <li>Szybkie działanie na telefonie oraz politykę prywatności zgodną z RODO.</li>
            </ul>

            <h2>Jak to połączyć</h2>
            <p>Najlepiej działa układ, w którym strona jest centrum, a reszta do niej prowadzi: wizytówka Google z linkiem do strony, fanpage z linkiem do strony, te same dane kontaktowe wszędzie. Dzięki temu klient — i wyszukiwarka — widzi spójny obraz firmy, niezależnie od tego, gdzie trafi na Ciebie najpierw.</p>""",
        "cta_title": "Nie masz jeszcze strony albo ta, którą masz, nie przynosi zapytań?",
        "cta_text": "Sprawdzimy, czego brakuje, i zaproponujemy konkretne rozwiązanie. Wycena jest bezpłatna i niezobowiązująca.",
        "sources": [
            ("GUS, „Wykorzystanie technologii informacyjno-komunikacyjnych w przedsiębiorstwach i gospodarstwach domowych w 2025 r.”, tablica 4", GUS_URL),
            ("Pew Research Center, „Google users are less likely to click on links when an AI summary appears in the results” (lipiec 2025)", PEW_URL),
            ("BrightLocal, Local Consumer Review Survey 2026 (próba: 1 002 dorosłych konsumentów z USA)", BL_URL),
        ],
    },
    # ─────────────────────────────────────────────────────────────
    {
        "slug": "dedykowany-system-czy-gotowe-oprogramowanie",
        "cat": "Aplikacje i systemy",
        "title": "Dedykowany system czy gotowe oprogramowanie? Jak firma może dobrze wybrać",
        "desc": "Kiedy wystarczy gotowa aplikacja w abonamencie, a kiedy opłaca się system szyty na miarę. Dane GUS o cyfryzacji polskich firm i praktyczna lista kontrolna.",
        "date": "2026-10-23", "date_pl": "23 października 2026", "read": 8,
        "lead": "Arkusz Excela, w którym pracuje pięć osób naraz. Trzy aplikacje, które się „nie dogadują”. Dane przepisywane ręcznie z maila do programu do faktur. Jeśli to brzmi znajomo, prędzej czy później stajesz przed pytaniem: kupić gotowe narzędzie czy zamówić system dla swojej firmy?",
        "key": [
            "Według GUS w 2025 roku oprogramowania CRM do zarządzania relacjami z klientami używało 20% małych firm (10–49 pracujących), a ERP — 32,9%.",
            "Gotowe oprogramowanie wygrywa, gdy Twój proces jest standardowy, a czas wdrożenia liczy się najbardziej.",
            "Dedykowany system ma sens, gdy proces jest Twoją przewagą albo gdy ludzie ręcznie łączą dane z kilku narzędzi.",
            "Zaczynaj od małej wersji rozwiązującej jeden konkretny problem — nie od „systemu do wszystkiego”.",
        ],
        "body": f"""            <h2>Jak wygląda cyfryzacja polskich firm</h2>
            <p>Dane GUS z 2025 roku pokazują wyraźną przepaść między małymi a dużymi firmami w korzystaniu z systemów do zarządzania{cite(1)}:</p>
            <div class="table-wrap">
              <table>
                <thead><tr><th scope="col">Wielkość firmy</th><th scope="col">ERP</th><th scope="col">CRM</th><th scope="col">Business Intelligence</th></tr></thead>
                <tbody>
                  <tr><td>Małe (10–49)</td><td>32,9%</td><td>20,0%</td><td>8,0%</td></tr>
                  <tr><td>Średnie (50–249)</td><td>69,7%</td><td>42,8%</td><td>28,3%</td></tr>
                  <tr><td>Duże (250+)</td><td>94,0%</td><td>71,1%</td><td>65,6%</td></tr>
                </tbody>
              </table>
            </div>
            <p>Podobnie jest ze sztuczną inteligencją: z danych GUS wynika, że technologie AI wykorzystywało około 6% małych firm, 16% średnich i 42% dużych (obliczenia własne na podstawie liczby przedsiębiorstw w tablicy 15){cite(1)}. Dla małej firmy to dobra wiadomość — dobrze dobrane narzędzie wciąż może dać przewagę nad konkurencją, która pracuje „po staremu”.</p>
            <div class="stat-callout">
              <span class="stat-callout__num">20%</span>
              <p class="stat-callout__text">małych firm w Polsce korzysta z oprogramowania CRM. Pozostałe prowadzą relacje z klientami w mailach, notesach i arkuszach.{cite(1)}</p>
            </div>

            <h2>Gotowe oprogramowanie: kiedy to najlepszy wybór</h2>
            <p>Gotowe narzędzia w abonamencie (tzw. SaaS) to często najrozsądniejszy pierwszy krok:</p>
            <ul>
              <li><strong>Szybki start</strong> — zakładasz konto i pracujesz od razu.</li>
              <li><strong>Niski koszt początkowy</strong> — płacisz miesięcznie, zwykle od użytkownika.</li>
              <li><strong>Aktualizacje po stronie dostawcy.</strong></li>
            </ul>
            <p>Minusy pojawiają się z czasem: abonament rośnie razem z liczbą pracowników, to Ty dopasowujesz się do narzędzia (a nie odwrotnie), a łączenie kilku takich aplikacji bywa trudne lub płatne dodatkowo.</p>

            <h2>Dedykowany system: kiedy ma sens</h2>
            <p>Sygnały, że gotowe narzędzia przestają wystarczać:</p>
            <ul>
              <li>Pracownicy <strong>ręcznie przepisują dane</strong> między programami.</li>
              <li>Arkusz kalkulacyjny pełni rolę bazy danych dla kilku osób i co chwilę ktoś coś nadpisuje.</li>
              <li>Płacisz za kilka narzędzi, a z każdego używasz niewielkiej części.</li>
              <li>Twój sposób obsługi klienta lub produkcji jest <strong>Twoją przewagą</strong> i nie chcesz go upraszczać pod cudzy program.</li>
              <li>Potrzebujesz panelu dla klientów lub kontrahentów — np. do składania zamówień, sprawdzania statusu czy pobierania dokumentów.</li>
            </ul>

            <h2>Porównanie w skrócie</h2>
            <div class="table-wrap">
              <table>
                <thead><tr><th scope="col">Kryterium</th><th scope="col">Gotowe oprogramowanie</th><th scope="col">Dedykowany system</th></tr></thead>
                <tbody>
                  <tr><td>Czas startu</td><td>Dni</td><td>Tygodnie lub miesiące</td></tr>
                  <tr><td>Koszt początkowy</td><td>Niski</td><td>Wyższy</td></tr>
                  <tr><td>Koszt w czasie</td><td>Rośnie z liczbą użytkowników</td><td>Głównie utrzymanie i rozwój</td></tr>
                  <tr><td>Dopasowanie do procesu</td><td>Ty dopasowujesz się do narzędzia</td><td>Narzędzie dopasowane do Ciebie</td></tr>
                  <tr><td>Integracje</td><td>Tylko te, które przewidział dostawca</td><td>Dowolne, według potrzeb</td></tr>
                  <tr><td>Własność</td><td>Licencja na korzystanie</td><td>Możliwe przeniesienie praw do kodu</td></tr>
                </tbody>
              </table>
            </div>

            <h2>Jak zamówić system i nie przepłacić</h2>
            <ol>
              <li><strong>Opisz proces, a nie funkcje.</strong> Zamiast „potrzebuję modułu zamówień” napisz, jak dziś wygląda droga zamówienia od klienta do faktury i gdzie się zacina.</li>
              <li><strong>Zacznij od wersji minimalnej.</strong> Pierwsza wersja powinna rozwiązywać jeden najbardziej bolesny problem. Kolejne funkcje dokładaj, gdy zobaczysz, jak ludzie z niej korzystają.</li>
              <li><strong>Zadbaj o własność kodu.</strong> W umowie zapisz przeniesienie praw autorskich i dostęp do kodu źródłowego.</li>
              <li><strong>Sprawdź, gdzie będą dane.</strong> Przy danych osobowych klientów ważne jest RODO — zapytaj, gdzie stoi serwer i kto ma dostęp.</li>
              <li><strong>Zapytaj o utrzymanie.</strong> Kto naprawia błędy, w jakim czasie i ile to kosztuje po wdrożeniu?</li>
            </ol>

            <h2>Ile kosztuje dedykowany system?</h2>
            <p>Uczciwa odpowiedź: rozrzut jest bardzo duży. Prosta aplikacja wewnętrzna — formularz, panel z listą zgłoszeń i raport — to zupełnie inna skala niż system połączony z księgowością, magazynem i sklepem. Dlatego zanim podamy cenę, prosimy o krótką rozmowę o Twoim procesie. Często okazuje się, że najlepszym rozwiązaniem jest dobrze skonfigurowane gotowe narzędzie, a nie nowy system — i wtedy też to mówimy.</p>""",
        "cta_title": "Masz proces, który zjada czas Twojego zespołu?",
        "cta_text": "Opisz go w kilku zdaniach. Podpowiemy, czy wystarczy gotowe narzędzie, czy warto zbudować coś dla Twojej firmy — bezpłatnie i bez zobowiązań.",
        "sources": [
            ("GUS, „Wykorzystanie technologii informacyjno-komunikacyjnych w przedsiębiorstwach i gospodarstwach domowych w 2025 r.”, tablice 12 i 15", GUS_URL),
        ],
    },
]
