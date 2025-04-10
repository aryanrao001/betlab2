import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import lottery1 from '../assets/lotterysec1.png'; // ✅ Simple image import
import lottery2 from '../assets/lotterysec2.png';
import lottery3 from '../assets/lotterysec3.png';

const Lottery = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (direction === 'left') {
      scrollRef.current.scrollLeft -= 300;
    } else {
      scrollRef.current.scrollLeft += 300;
    }
  };

  const lotteryItems = [
    { name: '3X', img: lottery1 },
    { name: '5D', img: lottery2 },
    { name: 'WinGo', img: lottery1 },
    { name: '3X', img: lottery1 },
    { name: '5D', img: lottery2 },
    { name: 'WinGo', img: lottery1 },
    // { name: '6D', img: '/lottery4.png' },
    // { name: 'Classic', img: '/lottery5.png' },
  ];

  return (
    <div className="p-4 bg-black text-white rounded-lg mt-2 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-orange-500 rounded-sm"></div>
          <h2 className="text-lg font-semibold">Lottery</h2>
          <span className="bg-orange-500 text-xs font-bold px-2 py-0.5 rounded-md">
            More 3
          </span>
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
      <p className="text-gray-400 text-sm mb-3">
        Fair and diverse lottery gameplay
      </p>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth"
      >
        {lotteryItems.map((item, index) => (
          <div
            key={index}
            className="min-w-[100px] max-w-[100px] h-auto  rounded-xl p-2 text-center"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-[100%] h-[80%] object-contain mb-2"
            />
            <p className="text-sm">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lottery;
