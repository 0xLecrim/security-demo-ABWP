"use client";

import Header from './components/Header';
import EncryptionDemo from './components/EncryptionDemo';
import SqlInjectionDemo from './components/SqlInjectionDemo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Introduction */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">About This Demo</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600">
                This application demonstrates two important security concepts in web development:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                <li>
                  <span className="font-semibold">AES Encryption:</span>{" "}
                  Shows how to securely encrypt and decrypt messages using the Advanced Encryption Standard.
                </li>
                <li>
                  <span className="font-semibold">SQL Injection:</span>{" "}
                  Demonstrates a common security vulnerability and how to prevent it using parameterized queries.
                </li>
              </ul>
            </div>
          </div>

          {/* Demo Components */}
          <div className="space-y-8">
            <EncryptionDemo />
            <SqlInjectionDemo />
          </div>

          {/* SQL Injection Detailed Explanation */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Jak działa SQL Injection?</h2>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-2">1. Podatna implementacja</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">W podatnej implementacji, zapytanie SQL jest tworzone przez proste łączenie ciągów znaków:</p>
                  <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    {`const query = \`SELECT * FROM users 
  WHERE username = '\${username}' 
  AND password = '\${password}'\`;`}
                  </pre>
                  <p className="mt-2">Problem: Wartości wprowadzone przez użytkownika są bezpośrednio wstawiane do zapytania SQL.</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2">2. Przykład ataku</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">Atakujący może wprowadzić specjalnie spreparowany ciąg znaków:</p>
                  <code className="bg-gray-800 text-white px-3 py-1 rounded">admin' --</code>
                  <p className="mt-2">Co przekształca oryginalne zapytanie w:</p>
                  <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    {`SELECT * FROM users 
WHERE username = 'admin' --' AND password = 'cokolwiek'`}
                  </pre>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Część <code className="bg-gray-200 px-1">admin'</code> zamyka ciąg znaków username</li>
                    <li>Znaki <code className="bg-gray-200 px-1">--</code> komentują resztę zapytania</li>
                    <li>W rezultacie sprawdzanie hasła jest pomijane</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2">3. Bezpieczna implementacja</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">Bezpieczna implementacja używa zapytań parametryzowanych:</p>
                  <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    {`const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
db.get(query, [username, password], (err, row) => {
  // Obsługa wyniku
});`}
                  </pre>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Znaki <code className="bg-gray-200 px-1">?</code> to parametry</li>
                    <li>Wartości są bezpiecznie przekazywane jako osobne parametry</li>
                    <li>Baza danych traktuje całą wartość jako pojedynczy parametr</li>
                    <li>Specjalne znaki są automatycznie eskejpowane</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2">4. Dlaczego to działa?</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">W przypadku zapytań parametryzowanych:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Struktura zapytania i dane są przesyłane osobno</li>
                    <li>Baza danych najpierw kompiluje zapytanie, a potem podstawia parametry</li>
                    <li>Znaki specjalne w parametrach nie mogą zmienić struktury zapytania</li>
                    <li>Nawet jeśli użytkownik wprowadzi kod SQL, zostanie on potraktowany jako zwykły tekst</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2">5. Dodatkowe zabezpieczenia</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Walidacja danych wejściowych (długość, dozwolone znaki)</li>
                    <li>Ograniczanie uprawnień użytkownika bazy danych</li>
                    <li>Szyfrowanie haseł w bazie danych</li>
                    <li>Monitorowanie nietypowych zapytań</li>
                    <li>Używanie ORM (Object-Relational Mapping)</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>Security Demo Application - Built with Next.js and TypeScript</p>
          <p className="mt-2 text-sm">
            Note: This is a demonstration application. Do not use these exact implementations in production.
          </p>
        </div>
      </footer>
    </div>
  );
}
