import React, { useRef } from 'react';
import img1 from '../assets/cricket1.avif';
import img2 from '../assets/cricket1.avif';
import img3 from '../assets/cricket1.avif';
import img4 from '../assets/cricket1.avif';
import img5 from '../assets/cricket1.avif';
import { MdOutlineLiveTv } from "react-icons/md";
import { Link } from 'react-router-dom';

const ImageSlider = ({ data: matches }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollBy({ left: -300, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="relative w-full max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-50 bg-white/80 hover:bg-white p-2 rounded-full shadow"
        >
          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide scroll-smooth relative"
        >
          {matches.map((match, index) => {
            const teamA = match.teama;
            const teamB = match.teamb;

            let matchStatus = 'Upcoming';
            if (match.status_str.toLowerCase().includes('live')) {
              matchStatus = 'Live';
            }

            // Force first card to say Today's Match
            if (index === 0) {
              matchStatus = "Today's Match";
            }

            const MatchCard = (
              <div key={match.match_id} className="relative flex-shrink-0 w-72">
                <div className="rounded-xl overflow-hidden shadow-lg bg-black group transition-transform duration-300 hover:scale-105">
                  <img
                    src={img1}
                    className="w-full h-40 object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    alt="match"
                  />

                  <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-between px-4">
                    {/* Team A */}
                    <div className="flex flex-col items-center text-white gap-1">
                      <img src={teamA.logo_url} alt={teamA.short_name} className="w-10 h-10" />
                      <span className="text-xs font-semibold">{teamA.short_name}</span>
                    </div>

                    {/* Center Info */}
                    <div className="flex flex-col items-center text-white gap-1">
                      <MdOutlineLiveTv
                        className={`text-xl ${
                          matchStatus === 'Live'
                            ? 'text-red-500'
                            : matchStatus === "Today's Match"
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                      <span className="text-sm font-medium">{matchStatus}</span>
                    </div>

                    {/* Team B */}
                    <div className="flex flex-col items-center text-white gap-1">
                      <img src={teamB.logo_url} alt={teamB.short_name} className="w-10 h-10" />
                      <span className="text-xs font-semibold">{teamB.short_name}</span>
                    </div>
                  </div>
                </div>
              </div>
            );

            return index === 0 ? (
              <Link to={`/match/${match.match_id}`} key={match.match_id}>
                {MatchCard}
              </Link>
            ) : (
              <div key={match.match_id}>{MatchCard}</div>
            );
          })}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1 z-50 bg-white/80 hover:bg-white p-2 rounded-full shadow"
        >
          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default ImageSlider;
