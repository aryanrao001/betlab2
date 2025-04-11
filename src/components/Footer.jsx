import React from 'react';
import { Heart, Gift, Wallet, User, Gamepad2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation(); // Detect current active path

  const navItems = [
    { name: 'Promotion', icon: <Heart className="w-5 h-5" />, path: '/promotion' },
    { name: 'Activity', icon: <Gift className="w-5 h-5" />, path: '/activity' },
    { name: 'Game', icon: <Gamepad2 className="w-8 h-8 text-amber-500 " />, path: '/home' },
    { name: 'Wallet', icon: <Wallet className="w-5 h-5" />, path: '/wallet' },
    { name: 'Account', icon: <User className="w-5 h-5" />, path: '/account' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black text-gray-400 flex justify-between px-6 py-3 shadow-lg">
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            to={item.path}
            key={index}
            className="flex flex-col items-center text-xs font-medium"
          >
            {isActive ? (
              <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-2 rounded-full">
                {React.cloneElement(item.icon, { className: "w-5 h-5 text-white" })}
              </div>
            ) : (
              item.icon
            )}
            <span className={`${isActive ? 'text-white mt-1' : 'mt-1'}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default Footer;
