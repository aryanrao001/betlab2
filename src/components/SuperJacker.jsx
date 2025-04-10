import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SuperJackpot = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += direction === 'right' ? 300 : -300;
    }
  };

  const jackpotItems = [
    {
      name: 'KENO',
      short: 'Ke',
      color: 'bg-red-600',
      icon: '🎯', // Replace with image or SVG as needed
      multiplier: '30.92X',
    },
    {
      name: 'MINI ROULETTE',
      short: 'Mr',
      color: 'bg-green-600',
      icon: '🎰',
    },
    {
      name: 'HOTLINE',
      short: 'Ho',
      color: 'bg-blue-600',
      icon: '📞',
    },
  ];

  return (
    <div className="p-4 bg-black text-white rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-orange-500 rounded-sm"></div>
          <h2 className="text-lg font-semibold">Super Jackpot</h2>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => scroll('left')}
            className="bg-orange-500 p-1 rounded hover:bg-orange-600"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="bg-orange-500 p-1 rounded hover:bg-orange-600"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Subtext */}
      <p className="text-gray-400 text-sm">
        When you win a super jackpot, you will receive additional rewards
      </p>
      <p className="text-sm text-white mt-1">
        Maximum bonus <span className="text-orange-400 font-semibold">₹300.00</span>
      </p>

      {/* Cards */}
      <div
        ref={scrollRef}
        className="mt-4 flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {jackpotItems.map((item, index) => (
          <div
            key={index}
            className={`${item.color} relative min-w-[130px] rounded-xl px-3 py-4 text-white`}
          >
            {item.multiplier && (
              <span className="absolute top-1 left-1 bg-purple-500 text-xs font-bold px-2 py-0.5 rounded">
                {item.multiplier}
              </span>
            )}
            <div className="text-xl font-bold">{item.short}</div>
            <div className="text-sm mt-1">{item.name}</div>
            <div className="text-3xl mt-2">{item.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperJackpot;
