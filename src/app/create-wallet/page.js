"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as bip39 from 'bip39';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

export default function CreateWallet() {
    const [recoveryInputPhrase, setRecoveryInputPhrase] = useState('');
    const [recoveryPhrase, setRecoveryPhrase] = useState('');
    const [wallet, setWallet] = useState(null);

    const createWallet = () => {
    
        if(recoveryInputPhrase == ''){
            setRecoveryPhrase(bip39.generateMnemonic());
        }else{
            setRecoveryPhrase(recoveryInputPhrase);
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
        setRecoveryInputPhrase('');
    }
    const createNew = () => {
        resetForm();
        setWallet(null);
    }

    useEffect(() => {
        if (recoveryPhrase != '') {
        
            const seed = bip39.mnemonicToSeedSync(recoveryPhrase);
            const key = ec.keyFromPrivate(seed.slice(0, 32));
        
            const address = key.getPublic('hex');
            const newWallet = {
            address,
            privateKey: key.getPrivate('hex'),
            recoveryPhrase: recoveryPhrase
            };
            setWallet(newWallet);
            localStorage.setItem('wallet', JSON.stringify(newWallet));

        }
    }, [recoveryPhrase]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg space-y-6 w-full max-w-sm">
                {!wallet ? (
                    <>
                        <h2 className="text-2xl font-bold text-center text-gray-800">Create Wallet</h2>
                        <input
                        type="text"
                        placeholder="Enter Recovery Phrase (optional)"
                        value={recoveryInputPhrase}
                        onChange={(e) => setRecoveryInputPhrase(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md text-gray-800"
                        />
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">The Recovery Phrase is a 12-word combination separated by spaces to recover your Private Key and Public Key. If not provided, it will be automatically generated randomly.</p>
                        <div className="flex justify-between mt-6">
                            <div className="w-full mr-2">
                                <button
                                onClick={createWallet}
                                className="w-full px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                                >
                                Create
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
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center p-4 mb-4 text-sm text-green-700 bg-green-100 border border-green-300 rounded-lg" role="alert">
                        <svg className="flex-shrink-0 w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m0 4v6a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h3.5"></path>
                        </svg>
                        Your wallet created successfully!
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
                                onClick={createNew}
                                className="w-full px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                                >
                                Create New
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