import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Match = () => {
  const { id } = useParams(); 
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [callCount, setCallCount] = useState(0);
  const [matchData, setMatchData] = useState(null);
  const [liveData, setLiveData] = useState(null);
  // const id = 88928

  // 🔁 Fetch API data once on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://rest.entitysport.com/exchange/matchesmultiodds?token=7b5e8407ec97bb503e1a7d0c66441c43&match_id=${id}`
        );
        setQuestions(response.data);
        setCallCount((prev) => {
          console.log(`🔁 API Called ${prev + 1} times`);
          return prev + 1;
        });
      } catch (error) {
        console.error('API Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Optional: Uncomment for continuous polling
    // const interval = setInterval(fetchData, 2000);
    // return () => clearInterval(interval);
  }, [id]);

  // 🔌 WebSocket for live data
  useEffect(() => {
    const ws = new WebSocket(
      'ws://webhook.entitysport.com:8087/connect?token=7b5e8407ec97bb503e1a7d0c66441c43'
    );

    ws.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Only accept data if it matches this match ID
        if (
          data &&
          typeof data === 'object' &&
          data?.response?.match_id?.toString() === id?.toString()
        ) {
          console.log('📡 WebSocket Data Received:', data);
          setLiveData(data);
        }
      } catch (error) {
        console.error('❌ Error parsing WebSocket data:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    ws.onclose = () => {
      console.log('❌ WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [id]);

  const sessionOdds = questions?.response?.[id]?.session_odds ?? [];

  if (loading && !questions) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-white">
        <div>Loading...</div>
      </div>
    );
  }

  const ballEvent = liveData?.response?.ball_event ?? 'N/A';

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="flex-1 px-4 py-6">
        <div className="text-center text-sm text-white flex items-center justify-center mb-4">
          🏏 <span className="text-green-500 text-2xl font-semibold ml-2">Ball Event:</span>
          <h1 className="text-3xl pl-6">{ballEvent}</h1>
        </div>

        <h2 className="text-sm text-center text-gray-400 mb-2">
          🔁 API Called: {callCount} times
        </h2>

        <h1 className="bg-[#222121] rounded-2xl w-full h-12 text-gray-400 flex items-center text-2xl pl-3 mb-4">
          Match Session Odds
        </h1>

        <div className="overflow-x-auto mb-10">
          <table className="min-w-full border border-gray-600 text-sm text-white">
            <thead className="bg-gray-800 text-gray-200">
              <tr>
                <th className="text-left px-4 py-2">Title</th>
                <th className="text-center px-4 py-2 bg-blue-500">BACK</th>
                <th className="text-center px-4 py-2 bg-pink-500">LAY</th>
              </tr>
            </thead>
            <tbody className="bg-[#1a1a1a]">
              {sessionOdds.length > 0 ? (
                sessionOdds.map((item, index) => (
                  <tr key={index} className="border-t border-gray-700">
                    <td className="px-4 py-3">{item?.title ?? 'N/A'}</td>
                    <td className="text-center px-4 py-3 bg-blue-200 text-black">
                      {item?.back ?? '-'} <br />
                      <span className="text-xs text-gray-700">{item?.back_condition ?? '-'}</span>
                    </td>
                    <td className="text-center px-4 py-3 bg-pink-200 text-black">
                      {item?.lay ?? '-'} <br />
                      <span className="text-xs text-gray-700">{item?.lay_condition ?? '-'}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center px-4 py-4 text-gray-400">
                    No session odds data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ✅ Optional backend live data block */}
        {matchData && (
          <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-md mt-4">
            <h2 className="text-xl font-bold text-yellow-400 mb-4">🏏 Live Cricket Data</h2>
            <p className="mb-2"><strong>Match ID:</strong> {matchData?.match_id ?? 'N/A'}</p>
            <p className="mb-2"><strong>Market Type:</strong> {matchData?.market_type ?? 'N/A'}</p>
            <p className="mb-2"><strong>Team Name:</strong> {matchData?.team_name ?? 'N/A'}</p>

            <div className="mb-2">
              <strong>Odds:</strong>
              <pre className="bg-black text-white p-2 mt-1 rounded-md text-sm overflow-x-auto">{JSON.stringify(matchData?.odds ?? {}, null, 2)}</pre>
            </div>

            <div>
              <strong>Score:</strong>
              <pre className="bg-black text-white p-2 mt-1 rounded-md text-sm overflow-x-auto">{JSON.stringify(matchData?.score ?? {}, null, 2)}</pre>
            </div>
          </div>
        )}

        {/* 🔴 Raw Live WebSocket Data */}
        {liveData?.response && (
          <div className="bg-[#111] mt-6 p-4 rounded-lg border border-yellow-700">
            <h2 className="text-lg font-semibold text-yellow-500 mb-2">📶 Live WebSocket Data</h2>
            <pre className="text-sm text-green-300 overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(liveData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Match;
