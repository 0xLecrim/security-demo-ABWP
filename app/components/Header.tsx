import React from 'react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 transform -skew-y-12 bg-white"></div>
          <div className="absolute inset-0 transform skew-x-12 bg-white"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4 tracking-tight">
              Security Demo Application
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Demonstrating encryption and security vulnerabilities in modern web applications
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-semibold">AES-256 Encryption</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-semibold">SQL Injection Demo</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-semibold">Interactive Examples</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-gray-50"></div>
        <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-blue-500 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-blue-400 rounded-full filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </header>
  );
}
