"use client"
import { useState, useEffect } from 'react';

export default function InfoWallet() {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet');
    if (savedWallet) {
      setWallet(JSON.parse(savedWallet));
    }
  }, []);

  if (!wallet) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">No Wallet Found</h1>
          <p className="text-gray-600">Please create or restore a wallet first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg space-y-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800">Wallet Info</h2>
        <div className="text-sm text-gray-800">
          <p><strong>Address:</strong> {wallet.address}</p>
          <p><strong>Private Key:</strong> {wallet.privateKey}</p>
        </div>
      </div>
    </div>
  );
}
