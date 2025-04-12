import React, { useContext } from 'react';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import { FaUserCircle, FaWallet, FaCog, FaSignOutAlt, FaHistory } from 'react-icons/fa';
import { AllContext } from '../context/AllContext';
import { useNavigate } from 'react-router';
import { BiCoinStack } from "react-icons/bi";


const Account = () => {
  const {
    balance,
    summary,
    loadingBalance,
    loadingSummary,
    error,
  } = useContext(AllContext);

  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];

  const todaysBets = summary.filter((item) => {
    const itemDate = new Date(item.created_at).toISOString().split('T')[0];
    return itemDate === today;
  });

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    // localStorage.removeItem("token"); // optional if you're using token
    navigate("/login");
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      <Header2 />

      <div className="flex flex-col items-center mt-8 px-4">
        {/* Profile Info */}
        <div className="bg-[#111111] rounded-3xl shadow-md p-6 w-full max-w-md text-center border border-gray-800">
          <FaUserCircle className="text-6xl text-purple-400 mx-auto mb-2" />
          <h2 className="text-2xl font-semibold">Yadav Saab</h2>
          <p className="text-sm text-gray-400">@yadav_cricpro</p>
        </div>

        {/* Wallet Section */}
        <div className="bg-[#111111] rounded-3xl shadow-md p-6 mt-4 w-full max-w-md border border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaWallet className="text-2xl text-green-400" />
              <span className="text-lg font-medium text-white">Wallet Balance</span>
            </div>
            <span className="text-xl font-bold text-green-300 flex items-center gap-1 "><BiCoinStack/>{balance}</span>
          </div>
        </div>

        {/* Today's Bets Section - Enhanced */}
        <div
        //  className=" rounded-3xl shadow-md p-6 mt-4 w-full max-w-md  "
         className="bg-[#111111] rounded-3xl shadow-md p-6 mt-4 w-full max-w-md border border-gray-800"
         >
          <div className="flex items-center gap-3 mb-4">
            <FaHistory className="text-xl text-pink-400" />
            <h3 className="text-lg font-semibold text-white">Today’s Bets</h3>
          </div>

          {todaysBets.length > 0 ? (
            <ul className="space-y-4">
              {todaysBets.map((item, i) => {
                const time = new Date(item.created_at).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                });
                return (
                  <li
                    key={i}
                    className="flex justify-between items-center  p-3 rounded-xl    transition-all duration-200"
                    // className="flex justify-between items-center bg-[#1b1b1b] p-3 rounded-xl border border-gray-800 hover:bg-[#222222] transition-all duration-200"
                  >
                    <div className="flex flex-col">
                      <span className="text-white font-medium">
                        {item.match || 'Match'} -{' '}
                        <span className="text-sm text-gray-400">
                          {item.mode === 'debit' ? 'Bet Placed' : 'Deposit'}
                        </span>
                      </span>
                      <span className="text-xs text-gray-500 mt-1">{time}</span>
                    </div>
                    <span
                      className={`text-md font-semibold flex items-center gap-1 ${
                        item.mode === 'debit' ? 'text-red-400' : 'text-green-400'
                      }`}
                    >
                      {item.mode === 'debit' ? `-  ${item.bet_amount}` : `+${item.bet_amount}`}<BiCoinStack/>
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm text-center">No bets placed today.</p>
          )}
        </div>

        {/* Settings Section */}
        <div className="bg-[#111111] rounded-3xl shadow-md p-6 mt-4 mb-24 w-full max-w-md space-y-4 border border-gray-800">
          <div className="flex items-center justify-between cursor-pointer hover:opacity-80">
            <div className="flex items-center gap-3">
              <FaCog className="text-lg text-blue-400" />
              <span className="text-md font-medium text-white">Account Settings</span>
            </div>
            <span className="text-sm text-gray-500">›</span>
          </div>

          <div className="flex items-center justify-between cursor-pointer hover:opacity-80">
            <div onClick={handleLogout}  className="flex items-center gap-3">
              <FaSignOutAlt className="text-lg text-red-400" />
              <span   className="text-md font-medium text-red-400">Logout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Account;
