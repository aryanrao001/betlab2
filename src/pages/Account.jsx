import React from 'react'
import Header2 from '../components/Header2'
import Footer from '../components/Footer'
import { FaUserCircle, FaWallet, FaCog, FaSignOutAlt, FaHistory } from 'react-icons/fa'

const Account = () => {
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
            <span className="text-xl font-bold text-green-300">₹2,500</span>
          </div>
        </div>

        {/* Recent Bets */}
        <div className="bg-[#111111] rounded-3xl shadow-md p-6 mt-4 w-full max-w-md border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <FaHistory className="text-xl text-pink-400" />
            <h3 className="text-lg font-semibold text-white">Recent Bets</h3>
          </div>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex justify-between">
              <span>MI vs CSK - MI Win 💰</span>
              <span className="text-green-400 font-bold">+₹400</span>
            </li>
            <li className="flex justify-between">
              <span>RCB vs KKR - RCB Lose 🫠</span>
              <span className="text-red-400 font-bold">-₹200</span>
            </li>
          </ul>
        </div>

        {/* Settings Section */}
        <div className="bg-[#111111] rounded-3xl shadow-md p-6 mt-4 w-full max-w-md space-y-4 border border-gray-800">
          <div className="flex items-center justify-between cursor-pointer hover:opacity-80">
            <div className="flex items-center gap-3">
              <FaCog className="text-lg text-blue-400" />
              <span className="text-md font-medium text-white">Account Settings</span>
            </div>
            <span className="text-sm text-gray-500">›</span>
          </div>

          <div className="flex items-center justify-between cursor-pointer hover:opacity-80">
            <div className="flex items-center gap-3">
              <FaSignOutAlt className="text-lg text-red-400" />
              <span className="text-md font-medium text-red-400">Logout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}

export default Account
