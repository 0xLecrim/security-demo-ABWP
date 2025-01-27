# Demonstracja Zabezpieczeń w Aplikacjach Webowych

## Spis Treści
1. [Wprowadzenie](#wprowadzenie)
2. [Zaimplementowane Mechanizmy Bezpieczeństwa](#zaimplementowane-mechanizmy-bezpieczeństwa)
3. [Użyte Technologie](#użyte-technologie)
4. [Struktura Projektu](#struktura-projektu)
5. [Szczegółowy Opis Funkcjonalności](#szczegółowy-opis-funkcjonalności)
6. [Napotkane Problemy i Ich Rozwiązania](#napotkane-problemy-i-ich-rozwiązania)
7. [Instrukcja Uruchomienia](#instrukcja-uruchomienia)

## Wprowadzenie

Projekt przedstawia dwa kluczowe aspekty bezpieczeństwa w aplikacjach internetowych:
1. Szyfrowanie komunikacji przy użyciu algorytmu AES
2. Prezentacja podatności na ataki SQL Injection oraz metody ochrony

Aplikacja została stworzona jako interaktywna demonstracja, umożliwiająca użytkownikom praktyczne zapoznanie się z mechanizmami bezpieczeństwa.

## Zaimplementowane Mechanizmy Bezpieczeństwa

### 1. Szyfrowanie AES (Advanced Encryption Standard)
- **Wykorzystany algorytm**: AES-256 w trybie CBC
- **Cel**: Szyfrowanie wiadomości tekstowych
- **Szczegóły implementacji**: 
  - Zastosowanie biblioteki CryptoJS
  - Pełny cykl: szyfrowanie -> przesyłanie -> deszyfrowanie
  - Prezentacja zaszyfrowanego tekstu
  - Możliwość sprawdzenia poprawności odszyfrowania

### 2. Podatność SQL Injection
- **Wersja podatna na ataki**:
  - Pokazanie niebezpiecznych praktyk w zapytaniach SQL
  - Demonstracja omijania zabezpieczeń logowania
- **Wersja zabezpieczona**:
  - Implementacja zapytań parametryzowanych
  - Pokaz skutecznej ochrony
  - Objaśnienie działania zabezpieczeń

## Użyte Technologie

- **Warstwa prezentacji**:
  - Next.js 13+ (App Router)
  - TypeScript
  - Tailwind CSS
  - CryptoJS (do szyfrowania AES)

- **Warstwa serwerowa**:
  - Node.js
  - SQLite3 (baza danych)
  - API Routes (Next.js)

## Struktura Projektu

```
security-demo/
├── app/                    # Główny katalog aplikacji
│   ├── api/               # Endpointy API
│   │   ├── secure-login/  # Bezpieczne logowanie
│   │   └── vulnerable-login/ # Podatne logowanie
│   ├── components/        # Komponenty React
│   └── page.tsx          # Strona główna
├── lib/                   # Biblioteki pomocnicze
│   └── db.ts             # Obsługa bazy danych
└── public/               # Pliki statyczne
```

## Szczegółowy Opis Funkcjonalności

### 1. Moduł Szyfrowania AES
- Implementacja szyfrowania symetrycznego AES-256
- Pokaz bezpiecznego przesyłania wiadomości
- Interaktywny interfejs prezentujący proces szyfrowania i deszyfrowania
- Wizualizacja danych zaszyfrowanych

### 2. Moduł SQL Injection
- Przykład podatności:
  ```sql
  -- Zapytanie podatne na atak
  SELECT * FROM users 
  WHERE username = '${username}' 
  AND password = '${password}'
  ```
- Demonstracja ataku:
  - Wprowadzenie kodu: `admin' --`
  - Skutek: ominięcie sprawdzania hasła
- Zabezpieczenie:
  ```sql
  -- Zapytanie bezpieczne (parametryzowane)
  SELECT * FROM users 
  WHERE username = ? AND password = ?
  ```

## Napotkane Problemy i Ich Rozwiązania

1. **Problem**: Zarządzanie historią zaszyfrowanych wiadomości
   - **Rozwiązanie**: Zastosowanie React hooks (useState) do obsługi historii

2. **Problem**: Przechowywanie klucza szyfrującego
   - **Rozwiązanie**: W wersji demonstracyjnej użyto stałego klucza, w wersji produkcyjnej wymagane byłoby bezpieczne zarządzanie kluczami

3. **Problem**: Obsługa błędów SQL
   - **Rozwiązanie**: Wdrożenie systemu logowania i obsługi błędów

4. **Problem**: Błędy hydracji w Next.js
   - **Rozwiązanie**: Zastosowanie dynamicznego importu komponentów z wyłączonym SSR

## Instrukcja Uruchomienia

1. Instalacja wymaganych pakietów:
   ```bash
   npm install
   ```

2. Uruchomienie serwera:
   ```bash
   npm run dev
   ```

3. Dostęp do aplikacji:
   ```
   http://localhost:3000
   ```

## Spełnienie Wymagań Projektowych

1. ✅ Implementacja szyfrowania:
   - Wykorzystano AES-256
   - Demonstracja na przykładzie komunikacji tekstowej

2. ✅ Prezentacja podatności:
   - Zaimplementowano podatność SQL Injection
   - Pokazano skuteczny atak i metody obrony

3. ✅ Dokumentacja:
   - Szczegółowy opis wykorzystanych algorytmów
   - Wyjaśnienie mechanizmów ataków
   - Dokumentacja zabezpieczeń

4. ✅ Aspekt praktyczny:
   - Projekt oparty na rzeczywistych scenariuszach
   - Wykorzystanie nowoczesnych technologii

## Podsumowanie

Projekt skutecznie realizuje założone cele, prezentując zarówno aspekty bezpieczeństwa komunikacji (szyfrowanie AES), jak i typowe podatności aplikacji webowych (SQL Injection). Forma interaktywna umożliwia praktyczne zrozumienie mechanizmów ataków oraz metod ochrony przed nimi. Implementacja wykorzystuje nowoczesne technologie webowe, co dodatkowo zwiększa wartość edukacyjną projektu.
