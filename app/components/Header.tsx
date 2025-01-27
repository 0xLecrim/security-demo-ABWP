import React from 'react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4 shadow-lg">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-2">Security Demo Application</h1>
        <p className="text-lg opacity-90">
          Demonstrating encryption and security vulnerabilities in modern web applications
        </p>
      </div>
    </header>
  );
}
