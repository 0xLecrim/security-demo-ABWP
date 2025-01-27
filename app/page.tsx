"use client";

import Header from './components/Header';
import EncryptionDemo from './components/EncryptionDemo';
import SqlInjectionDemo from './components/SqlInjectionDemo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">About This Demo</h2>
              <p className="text-gray-300 mt-1">
                Understanding security concepts through practical examples
              </p>
            </div>
            <div className="p-6">
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  This application demonstrates two important security concepts in web development:
                </p>
                <ul className="list-none space-y-4 mt-4">
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">AES Encryption</h3>
                      <p className="text-gray-600">Shows how to securely encrypt and decrypt messages using the Advanced Encryption Standard.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">SQL Injection</h3>
                      <p className="text-gray-600">Demonstrates a common security vulnerability and how to prevent it using parameterized queries.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Demo Components */}
          <div className="space-y-12">
            <EncryptionDemo />
            <SqlInjectionDemo />
          </div>

          {/* SQL Injection Explanation */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">Jak działa SQL Injection?</h2>
              <p className="text-gray-300 mt-1">
                Szczegółowe wyjaśnienie mechanizmu ataku i obrony
              </p>
            </div>
            <div className="p-6 space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-2">1. Podatna implementacja</h3>
                <div className="bg-gray-50 p-4 rounded-xl">
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
                <div className="bg-gray-50 p-4 rounded-xl">
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
                <div className="bg-gray-50 p-4 rounded-xl">
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
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      
    </div>
  );
}
