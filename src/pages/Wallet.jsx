import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
// import Header from '../components/Header';
import axios from 'axios';
import { AllContext } from '../context/AllContext';
import Header2 from '../components/Header2';

const Wallet = () => {
  const [balance, setBalance] = useState('');
  const [user_id, setUser_id] = useState('');
  const [summary, setSummary] = useState([]); // ✅ FIX: Make this an array

  const { Base_url } = useContext(AllContext);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) setUser_id(storedUserId);
  }, []);

  useEffect(() => {
    if (!user_id) return;

    const fetchBalance = async () => {
      const formData = new FormData();
      formData.append('user_id', user_id);

      try {
        const response = await axios.post(`${Base_url}api/get_wallet_balance`, formData);
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Failed to fetch wallet balance:', error);
      }
    };

    fetchBalance();
  }, [user_id]);

  useEffect(() => {
    if (!user_id) return;

    const fetchSummary = async () => {
      const formData = new FormData();
      formData.append('user_id', user_id);

      try {
        const response = await axios.post(`${Base_url}api/api_wallet_summary`, formData);
        setSummary(response.data.transactions || []); // ✅ Fallback to empty array
      } catch (error) {
        console.error('Failed to fetch wallet summary:', error);
      }
    };

    fetchSummary();
  }, [user_id]);

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-zinc-900 to-black text-white">
      <Header2 />

      <div className="flex-1 flex flex-col items-center px-4 py-6 space-y-6 overflow-auto">
        <div className="w-full max-w-md bg-zinc-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-400 mb-2">Available Balance</h2>
          <div className="text-4xl font-bold text-yellow-400">₹{balance || '0.00'}</div>
        </div>

        <div className="w-full pb-16 max-w-md">
        <h3 className="text-xl font-semibold mb-3 text-gray-300">Transaction History</h3>
        <div className="space-y-3">
            {summary.length > 0 ? (
            summary.map((item, i) => (
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
            ))
            ) : (
            <p className="text-gray-400">No transactions found.</p>
            )}
        </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Wallet;
