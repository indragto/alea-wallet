"use client"
import { useState } from 'react';
import * as bip39 from 'bip39';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

export default function RestoreWallet() {
  const [recoveryPhrase, setRecoveryPhrase] = useState('');
  const [wallet, setWallet] = useState(null);

  const restoreWallet = () => {
    if (!bip39.validateMnemonic(recoveryPhrase)) {
        resetForm();
        alert('Invalid recovery phrase');
    }else{
        const seed = bip39.mnemonicToSeedSync(recoveryPhrase);
        const key = ec.keyFromPrivate(seed.slice(0, 32));
        const privateKey = key.getPrivate('hex');
        
        const address = key.getPublic('hex');
        const restoredWallet = {
            address,
            privateKey,
        };
        setWallet(restoredWallet);
    }
  };

  const downloadWallet = () => {
    const fileName = 'wallet.json';
    const walletBlob = new Blob([JSON.stringify(wallet, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(walletBlob);
    link.download = fileName;
    link.click();
  };

  const resetForm = () => {
    setRecoveryPhrase("");
  }

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg space-y-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800">Restore Wallet</h2>
        <input
          type="text"
          placeholder="Enter Recovery Phrase"
          value={recoveryPhrase}
          onChange={(e) => setRecoveryPhrase(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-gray-800"
        />
        <button
          onClick={restoreWallet}
          className="w-full px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Restore Wallet
        </button>
        {wallet && (
            <div className="space-y-4">
                <p className="text-gray-600">Wallet Restored!</p>
                <button
                    onClick={downloadWallet}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Download Wallet File
                </button>
            </div>
        )}
      </div>
    </div>
  );
}
