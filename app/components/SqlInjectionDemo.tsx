import React, { useState } from 'react';

interface LoginFormProps {
  title: string;
  isVulnerable: boolean;
  onSubmit: (username: string, password: string) => Promise<void>;
  hint?: string;
}

const LoginForm = ({ title, isVulnerable, onSubmit, hint }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(username, password);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-semibold text-lg">{title}</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter username"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter password"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-lg text-white transition-colors ${
          isVulnerable 
            ? "bg-red-600 hover:bg-red-700" 
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Loading..." : "Login"}
      </button>
      {hint && (
        <p className="text-sm text-gray-600 mt-2">
          <span className="font-medium">Hint:</span> {hint}
        </p>
      )}
    </form>
  );
};

export default function SqlInjectionDemo() {
  const [result, setResult] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleVulnerableLogin = async (username: string, password: string) => {
    try {
      const res = await fetch("/api/vulnerable-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setResult(`Vulnerable Login Result: ${data.message}`);
    } catch (error) {
      setResult("Error occurred during login");
    }
  };

  const handleSecureLogin = async (username: string, password: string) => {
    try {
      const res = await fetch("/api/secure-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setResult(`Secure Login Result: ${data.message}`);
    } catch (error) {
      setResult("Error occurred during login");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">SQL Injection Demo</h2>
      <p className="text-gray-600 mb-6">
        Demonstrate SQL injection vulnerability and its prevention
      </p>

      <div className="space-y-6">
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <button 
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-yellow-800 font-semibold mb-2 hover:text-yellow-900"
          >
            {showExplanation ? "Hide" : "Show"} How It Works
          </button>
          {showExplanation && (
            <div className="text-sm text-gray-700 space-y-2">
              <p>1. The vulnerable login form uses direct string interpolation in SQL queries</p>
              <p>2. Try logging in with: <code className="bg-gray-100 px-2 py-1 rounded">admin' --</code></p>
              <p>3. This injection makes the password check irrelevant</p>
              <p>4. The secure login form uses parameterized queries to prevent injection</p>
              <p>5. The same attack won't work on the secure form</p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <LoginForm
            title="Vulnerable Login"
            isVulnerable={true}
            onSubmit={handleVulnerableLogin}
            hint="Try: admin' --"
          />
          <LoginForm
            title="Secure Login"
            isVulnerable={false}
            onSubmit={handleSecureLogin}
          />
        </div>

        {result && (
          <div className={`p-4 rounded-lg ${
            result.includes("successful")
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}>
            <p className="text-gray-700">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
