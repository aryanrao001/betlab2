import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header2 from '../components/Header2';
import { AllContext } from '../context/AllContext';
import { BiCoinStack } from "react-icons/bi";


const Wallet = () => {
  const {
    balance,
    summary,
    loadingBalance,
    loadingSummary,
    error,
  } = useContext(AllContext);

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-zinc-900 to-black text-white">
      <Header2 />

      <div className="flex-1 flex flex-col items-center px-4 py-6 space-y-6 overflow-auto">
        {/* Balance Card */}
        <div className="w-full max-w-md bg-zinc-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-400 mb-2">Available Coins </h2>
          {loadingBalance ? (
            <div className="text-yellow-400 text-xl animate-pulse">Loading...</div>
          ) : (
            <div className="text-4xl font-bold text-yellow-400 flex items-center gap-2"> <BiCoinStack/> {balance || '0.00'}</div>
          )}
        </div>

        {/* Transaction History */}
        <div className="w-full pb-16 max-w-md">
          {/* <h3 className="text-xl font-semibold mb-3 text-gray-300">Transaction History</h3> */}

          {/* {loadingSummary ? (
            <p className="text-gray-400 animate-pulse">Loading summary...</p>
          ) : summary.length > 0 ? (
            <div className="space-y-3">
              {summary.map((item, i) => (
                <div
                  key={i}
                  className="bg-zinc-800 px-4 py-3 rounded-xl flex justify-between items-center shadow"
                >
                  <div>
                    <p className="font-medium text-gray-200">
                      {item.mode === 'debit' ? 'Bet Placed' : 'Deposit'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`font-semibold ${
                      item.mode === 'debit' ? 'text-red-400' : 'text-green-400'
                    }`}
                  >
                    {item.mode === 'debit' ? `- ₹${item.bet_amount}` : `+ ₹${item.bet_amount}`}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No transactions found.</p>
          )} */}

          {/* Optional: Display error */}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Wallet;
