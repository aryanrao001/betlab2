import React from 'react'
import Header2 from '../components/Header2'
import Footer from '../components/Footer'
import { FaArrowCircleUp, FaArrowCircleDown, FaMoneyBillAlt, FaTrophy, FaTimesCircle } from 'react-icons/fa'

const Activity = () => {
  const activities = [
    {
      type: 'win',
      match: 'MI vs CSK',
      amount: '+₹500',
      date: 'April 12, 2025',
      icon: <FaTrophy className="text-green-400 text-xl" />,
    },
    {
      type: 'loss',
      match: 'RCB vs KKR',
      amount: '-₹300',
      date: 'April 11, 2025',
      icon: <FaTimesCircle className="text-red-400 text-xl" />,
    },
    {
      type: 'deposit',
      amount: '₹1,000',
      date: 'April 10, 2025',
      icon: <FaArrowCircleUp className="text-blue-400 text-xl" />,
    },
    {
      type: 'withdrawal',
      amount: '₹600',
      date: 'April 09, 2025',
      icon: <FaArrowCircleDown className="text-yellow-400 text-xl" />,
    },
  ]

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      <Header2 />

      <div className="flex flex-col items-center px-4 py-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Your Activity 📊</h2>

        <div className="w-full max-w-md space-y-4">
          {activities.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-[#111111] border border-gray-800 rounded-2xl p-4 hover:bg-[#1a1a1a] transition-all"
            >
              <div>{item.icon}</div>
              <div className="flex-1">
                <p className="text-sm">
                  {item.type === 'win' || item.type === 'loss'
                    ? `${item.match} - ${item.type === 'win' ? 'You Won' : 'You Lost'}`
                    : item.type === 'deposit'
                    ? 'Deposit Added'
                    : 'Withdrawal Made'}
                </p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>
              <div
                className={`text-sm font-bold ${
                  item.amount.startsWith('+')
                    ? 'text-green-400'
                    : item.amount.startsWith('-')
                    ? 'text-red-400'
                    : 'text-blue-300'
                }`}
              >
                {item.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}

export default Activity
