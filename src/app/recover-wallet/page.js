"use client"
import { useState } from 'react';
import Link from 'next/link';
import * as bip39 from 'bip39';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

export default function RecoverWallet() {
  const [recoveryPhrase, setRecoveryPhrase] = useState('');
  const [wallet, setWallet] = useState(null);

  const restoreWallet = () => {

    if(recoveryPhrase == ''){
      alert("Please enter your recovery phrase!");
      return;
    }

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

  const restoreNew = () => {
    resetForm();
    setWallet(null);
  }

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg space-y-6 w-full max-w-sm">
        {!wallet ? (
            <>
              <h2 className="text-2xl font-bold text-center text-gray-800">Recover Wallet</h2>
              <input
                type="text"
                placeholder="Enter Recovery Phrase"
                value={recoveryPhrase}
                onChange={(e) => setRecoveryPhrase(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-gray-800"
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">The Recovery Phrase is a 12-word combination separated by spaces to recover your Private Key and Public Key.</p>
              <div className="flex justify-between mt-6">
                  <div className="w-full mr-2">
                      <button
                      onClick={restoreWallet}
                      className="w-full px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                      >
                      Recover
                      </button>
                  </div>
                  <div className="w-full ml-2">
                      <button
                      onClick={resetForm}
                      className="w-full px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
                      >
                      Reset
                      </button>
                  </div>
              </div>
            </>
        ):(
          <div className="space-y-4">
                <div className="flex items-center p-4 mb-4 text-sm text-green-700 bg-green-100 border border-green-300 rounded-lg" role="alert">
                    <svg className="flex-shrink-0 w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m0 4v6a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h3.5"></path>
                    </svg>
                    Your wallet restored successfully!
                </div>
               
                <div className="flex justify-between mt-6">
                    <div className="w-full mr-2">
                        <button
                        onClick={downloadWallet}
                        className="w-full px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                        >
                        Download
                        </button>
                    </div>
                    <div className="w-full ml-2">
                        <button
                        onClick={restoreNew}
                        className="w-full px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                        Restore other
                        </button>
                    </div>
                </div>
            </div>
        )}
        <div className="text-center space-y-4">
            <Link href="/" className="px-4 py-2 text-blue-800">
                Go To Home
            </Link>
        </div>
      </div>
    </div>
  );
}
