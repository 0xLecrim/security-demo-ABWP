import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

export default function EncryptionDemo() {
  const [message, setMessage] = useState("");
  const [encryptedMessages, setEncryptedMessages] = useState<string[]>([]);
  const [decryptedMessages, setDecryptedMessages] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const SECRET_KEY = "your-secret-key-2024";

  const handleEncrypt = () => {
    if (!message) return;
    
    const encrypted = CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
    setEncryptedMessages([...encryptedMessages, encrypted]);
    setMessage("");
  };

  const handleDecrypt = () => {
    const decrypted = encryptedMessages.map(msg => {
      const bytes = CryptoJS.AES.decrypt(msg, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    });
    setDecryptedMessages(decrypted);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">AES Encryption Demo</h2>
        <p className="text-blue-100 mt-1">
          Demonstrate secure message encryption using AES-256
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* How It Works Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
          <button 
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-800 transition-colors"
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
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">1</span>
                Enter a message in the text field
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">2</span>
                Click "Encrypt & Send" to encrypt it using AES-256
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">3</span>
                The encrypted message appears below (unreadable)
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">4</span>
                Click "Decrypt Messages" to decrypt using the same key
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">5</span>
                The original message appears in "Decrypted Messages"
              </p>
            </div>
          )}
        </div>

        {/* Message Input Section */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Message to Encrypt
            </label>
            <textarea
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] resize-y bg-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your secret message here... (e.g., confidential information, passwords, etc.)"
              rows={3}
            />
            <button
              onClick={handleEncrypt}
              disabled={!message}
              className={`mt-3 px-4 py-2 rounded-lg text-white transition-all transform hover:scale-105 ${
                message 
                  ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Encrypt & Send
            </button>
          </div>

          {/* Encrypted Messages */}
          {encryptedMessages.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Encrypted Messages</h3>
              <div className="space-y-2">
                {encryptedMessages.map((msg, i) => (
                  <div key={i} className="bg-white p-3 rounded-lg border border-gray-200 break-all text-sm font-mono text-gray-600">
                    {msg}
                  </div>
                ))}
              </div>
              <button
                onClick={handleDecrypt}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg transition-all transform hover:scale-105 hover:bg-green-700"
              >
                Decrypt Messages
              </button>
            </div>
          )}

          {/* Decrypted Messages */}
          {decryptedMessages.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Decrypted Messages</h3>
              <div className="space-y-2">
                {decryptedMessages.map((msg, i) => (
                  <div key={i} className="bg-green-50 p-3 rounded-lg border border-green-200 text-gray-700">
                    {msg}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
