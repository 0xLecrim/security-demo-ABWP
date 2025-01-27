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
    <div className="demo-section bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">AES Encryption Demo</h2>
      <p className="text-gray-600 mb-6">
        Demonstrate secure message encryption using AES-256
      </p>

      <div className="demo-content space-y-6">
        <div className="explanation-section bg-blue-50 p-4 rounded-lg">
          <button 
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-blue-600 font-semibold mb-2 hover:text-blue-800"
          >
            {showExplanation ? "Hide" : "Show"} How It Works
          </button>
          {showExplanation && (
            <div className="text-sm text-gray-700 space-y-2">
              <p>1. Enter a message in the text field</p>
              <p>2. Click "Encrypt & Send" to encrypt it using AES-256</p>
              <p>3. The encrypted message appears below (unreadable)</p>
              <p>4. Click "Decrypt Messages" to decrypt using the same key</p>
              <p>5. The original message appears in "Decrypted Messages"</p>
            </div>
          )}
        </div>

        <div className="message-section space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Message to Encrypt
            </label>
            <textarea
              className="input-field min-h-[100px] resize-y"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your secret message here... (e.g., confidential information, passwords, etc.)"
              rows={3}
            />
            <button
              onClick={handleEncrypt}
              className="btn btn-primary mt-2"
              disabled={!message}
            >
              Encrypt & Send
            </button>
          </div>

          {encryptedMessages.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Encrypted Messages</h3>
              <div className="space-y-2">
                {encryptedMessages.map((msg, i) => (
                  <div key={i} className="bg-gray-100 p-3 rounded-lg break-all text-sm font-mono">
                    {msg}
                  </div>
                ))}
              </div>
              <button
                onClick={handleDecrypt}
                className="btn btn-success mt-4"
              >
                Decrypt Messages
              </button>
            </div>
          )}

          {decryptedMessages.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Decrypted Messages</h3>
              <div className="space-y-2">
                {decryptedMessages.map((msg, i) => (
                  <div key={i} className="bg-green-50 p-3 rounded-lg border border-green-200">
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
