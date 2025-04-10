import React from 'react';
import img1 from '../assets/cricket1.avif';
import { MdOutlineLiveTv } from "react-icons/md";
import { Link } from 'react-router';

const ImageSlider2 = ({ data1 = [], data2 = [] }) => {
  // Priority: data1[0] > data2[0]
  const match = data1[0] || data2[0];

  if (!match) {
    return (
      <div className="w-full flex items-center justify-center h-40 rounded-lg shadow-md mt-4">
        <p className="text-gray-600 text-lg font-semibold">No Live Matches</p>
      </div>
    );
  }

  const teamA = match.teama;
  const teamB = match.teamb;
  const matchStatus = match.status_str?.toLowerCase().includes('live') ? 'Live' : 'Upcoming';

  return (
    <>
    <Link to={`/match/${match.match_id}`} key={match.match_id}>
      <div className="relative p-2 pt-4">
      <img
        src={img1}
        alt={`Match`}
        className="w-full h-40 object-cover rounded-lg shadow-md"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#00000020] z-10 flex items-center justify-around px-4">
        {/* Team A */}
        <div className="flex flex-col items-center text-white">
          <img src={teamA.logo_url} alt={teamA.short_name} className="w-10 h-10" />
          <h1 className="text-sm font-bold mt-1">{teamA.short_name}</h1>
        </div>

        {/* Status */}
        <div className="text-white flex flex-col items-center gap-2 font-semibold text-base">
          <MdOutlineLiveTv className={matchStatus === 'Live' ? 'text-red-500' : 'text-gray-300'} />
          <span>Today's Match</span>
        </div>

        {/* Team B */}
        <div className="flex flex-col items-center text-white">
          <img src={teamB.logo_url} alt={teamB.short_name} className="w-10 h-10" />
          <h1 className="text-sm font-bold mt-1">{teamB.short_name}</h1>
        </div>
      </div>
    </div>
    </Link>
    </>
  );
};

export default ImageSlider2;
