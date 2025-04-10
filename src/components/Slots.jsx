import slots from '../assets/slots1.png'
import slots2 from '../assets/slots2.png'


const Slots = () => {
    const slotItems = [
      { name: 'JILI', img: slots },
      { name: 'MG', img: slots2 },
      { name: 'JILI', img: slots },
      { name: 'MG', img: slots2 },
      { name: 'JILI', img: slots },
      { name: 'MG', img: slots2 },

    //   { name: 'EVO_Electronic', img: '/slots/evo.png' },
    //   { name: 'CQ9', img: '/slots/cq9.png' },
    //   { name: 'PG', img: '/slots/pg.png' },
    ];
  
    return (
      <div className="p-4 bg-black mb-10 text-white rounded-lg">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-4 bg-orange-500 rounded-sm"></div>
          <h2 className="text-lg font-semibold">Slots</h2>
        </div>
  
        {/* Subtext */}
        <p className="text-gray-400 text-sm mb-3">
          Online real-time game dealers, all verified fair games
        </p>
  
        {/* Icons */}
        <div className="flex flex-wrap gap-3 items-center">
          {slotItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <img
                
                src={item.img}
                alt={item.name}
                className=" h-10 object-contain"
              />
              <span className="text-sm text-white">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Slots;
  