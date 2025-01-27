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
    <div className={`bg-white rounded-xl shadow-md overflow-hidden border-2 ${
      isVulnerable ? 'border-red-200' : 'border-green-200'
    }`}>
      <div className={`px-4 py-3 ${
        isVulnerable 
          ? 'bg-gradient-to-r from-red-500 to-red-600' 
          : 'bg-gradient-to-r from-green-500 to-green-600'
      }`}>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white transition-all transform hover:scale-105 ${
            isVulnerable 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        {hint && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">Hint:</span> {hint}
            </p>
          </div>
        )}
      </form>
    </div>
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
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">SQL Injection Demo</h2>
        <p className="text-purple-100 mt-1">
          Demonstrate SQL injection vulnerability and its prevention
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* How It Works Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
          <button 
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-800 transition-colors"
          >
            <svg 
              className={`w-5 h-5 transform transition-transform ${showExplanation ? 'rotate-90' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {showExplanation ? "Hide" : "Show"} How It Works
          </button>
          
          {showExplanation && (
            <div className="mt-3 text-sm text-gray-600 space-y-2 pl-7">
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">1</span>
                The vulnerable form uses direct string concatenation in SQL queries
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">2</span>
                Try the SQL injection attack with the provided hint
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">3</span>
                Notice how the vulnerable form can be bypassed
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">4</span>
                The secure form prevents the same attack
              </p>
            </div>
          )}
        </div>

        {/* Login Forms */}
        <div className="grid md:grid-cols-2 gap-6">
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

        {/* Result Display */}
        {result && (
          <div className={`p-4 rounded-xl ${
            result.includes("successful")
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`${
              result.includes("successful") ? 'text-green-800' : 'text-red-800'
            }`}>
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
