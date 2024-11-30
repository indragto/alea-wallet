import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to Alea Wallet !</h1>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Card 1 */}
          <Link 
            href="/create-wallet"
            className="block p-6 bg-blue-800 text-white rounded-lg shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-500 transition duration-300"
          >
            <h2 className="text-lg font-semibold">Create Wallet</h2>
            <p className="mt-2 text-sm">
              Create a Wallet for transactions on the Alea Blockchain.
            </p>
          </Link>

          {/* Card 2 */}
          <Link 
            href="/recover-wallet"
            className="block p-6 bg-green-800 text-white rounded-lg shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-500 transition duration-300"
          >
            <h2 className="text-lg font-semibold">Recover Wallet</h2>
            <p className="mt-2 text-sm">
              Recover your wallet's private key and public key.
            </p>
          </Link>

          {/* Card 3 */}
          <Link 
            href="/info-wallet"
            className="block p-6 bg-yellow-600 text-white rounded-lg shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-500 transition duration-300"
          >
            <h2 className="text-lg font-semibold">Wallet Info</h2>
            <p className="mt-2 text-sm">
              Download your wallet info by your private key.
            </p>
          </Link>

          <Link 
            href="/sign-transaction"
            className="block p-6 bg-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl border border-gray-200 hover:border-purple-500 transition duration-300"
          >
            <h2 className="text-lg font-semibold">Sign Transaction</h2>
            <p className="mt-2 text-sm">
              Create signature for your transaction.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
