import React, { useContext, useEffect, useState } from 'react';
// import Header from './header';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AllContext } from '../context/AllContext';
import { toast } from 'react-toastify';
import Header2 from './Header2';

const Match = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [callCount, setCallCount] = useState(0);
  const [liveData, setLiveData] = useState(null);
  const [selectedBet, setSelectedBet] = useState(null);
  const [betAmount, setBetAmount] = useState("");
  const { Base_url } = useContext(AllContext);
  const [questionId, setQuestionId] = useState("");
  const [betCon, setBetCon] = useState("");
  const [bet, setBet] = useState();
  const [betType, setBetType] = useState("");
  const [profit, setProfit] = useState("");
  const [userid, setuserid] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const errors = [];
    if (!questionId) errors.push("Question ID is required.");
    if (!betCon) errors.push("Bet condition is required.");
    if (!bet) errors.push("Bet is required.");
    if (!betAmount) errors.push("Bet amount is required.");
    else if (parseFloat(betAmount) < 100) errors.push("Bet amount must be at least ₹100.");
    if (!betType) errors.push("Bet type is required.");
    if (!profit) errors.push("Profit calculation is required.");
    if (!id) errors.push("Match ID is required.");
    if (!userid) errors.push("User ID is required.");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const formData = new FormData();
    formData.append('question_id', questionId);
    formData.append('bet_condition', betCon);
    formData.append('bet', bet);
    formData.append('bet_amount', betAmount);
    formData.append('bet_type', betType);
    formData.append('return_value', profit);
    formData.append('match_id', id);
    formData.append('user_id', userid);

    try {
      const response = await axios.post(`${Base_url}/api/place_bet`, formData);
      if (response?.data?.status) {
        toast.success(response.data.msg || "Bet placed successfully!");
        toast.success("Remaining Balance: " + response.data.balance);
      } else {
        toast.error(response.data.msg + " " + response.data.balance || "Error placing bet.");
      }
    } catch (error) {
      console.error("API call failed:", error.response ? error.response.data : error);
      alert("Failed to place bet. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://rest.entitysport.com/exchange/matchesmultiodds?token=7b5e8407ec97bb503e1a7d0c66441c43&match_id=${id}`
        );
        setQuestions(response.data);
        setCallCount((prev) => prev + 1);
      } catch (error) {
        console.error('API Error:', error);
      } finally {
        setLoading(false);
      }
    };
    const user = localStorage.getItem('user_id');
    setuserid(user);
    fetchData();
  }, [id]);

  useEffect(() => {
    const ws = new WebSocket(
      'ws://webhook.entitysport.com:8087/connect?token=7b5e8407ec97bb503e1a7d0c66441c43'
    );

    ws.onopen = () => console.log('WebSocket connected');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Live Data:', data);
      if(data.response.match_id == id || !data.response.ball_event   ){
        setLiveData(data);
      }
      // setLiveData(data);
    };
    ws.onerror = (error) => console.error('WebSocket Error:', error);
    ws.onclose = () => console.log('WebSocket disconnected');

    return () => ws.close();
  }, [id]);

  useEffect(() => {
    if (selectedBet?.odds && betAmount && parseFloat(betAmount) >= 100) {
      const totalReturn = ((parseFloat(selectedBet.odds) + 100) / 100) * parseFloat(betAmount);
      const onlyProfit = totalReturn - parseFloat(betAmount);
      setProfit(onlyProfit.toFixed(2));
    } else {
      setProfit('');
    }
  }, [betAmount, selectedBet]);

  const sessionOdds = questions?.response?.[id]?.session_odds ?? [];
  const ballEvent = liveData?.response?.ball_event ?? 'N/A';

  if (loading && !questions) {
    return <div className="w-full h-screen flex justify-center items-center text-white">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      <Header2 />
      <form onSubmit={onSubmitHandler} className="px-4 py-6">
        <div className="text-center text-sm mb-4">
          <span className="text-green-500 text-2xl font-semibold">Ball Event:</span>
          <h1 className="text-3xl pl-4">{ballEvent}</h1>
        </div>

        <h2 className="text-center text-gray-400 mb-2">API Called: {callCount} times</h2>

        <h1 className="bg-[#222121] rounded-2xl w-full h-12 text-gray-400 flex items-center text-2xl pl-3 mb-4">
          Match Session Odds
        </h1>

        <div className="overflow-x-auto mb-10">
          <table className="min-w-full border border-gray-600 text-sm">
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
                    <td className="text-center px-4 py-3 bg-blue-200 text-black cursor-pointer" onClick={() => {
                      setSelectedBet({ type: 'BACK', title: item?.title, odds: item?.back, condition: item?.back_condition });
                      setQuestionId(item?.question_id);
                      setBetCon(item?.back_condition);
                      setBet(item?.back);
                      setBetType('Back');
                    }}>{item?.back ?? '-'}<br /><span className="text-xs text-gray-700">{item?.back_condition ?? '-'}</span></td>
                    <td className="text-center px-4 py-3 bg-pink-200 text-black cursor-pointer" onClick={() => {
                      setSelectedBet({ type: 'LAY', title: item?.title, odds: item?.lay, condition: item?.lay_condition });
                      setQuestionId(item?.question_id);
                      setBetCon(item?.lay_condition);
                      setBet(item?.lay);
                      setBetType('LAY');
                    }}>{item?.lay ?? '-'}<br /><span className="text-xs text-gray-700">{item?.lay_condition ?? '-'}</span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center px-4 py-4 text-gray-400">No session odds data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedBet && (
          <div className="bg-[#1e1e1e] p-4 rounded-xl mb-6">
            <h3 className="text-lg mb-2">Selected Bet: <span className="font-bold text-green-400">{selectedBet.title}</span></h3>
            <input type="number" className="text-black w-full p-2 mb-2" placeholder="Enter Amount (min ₹100)" value={betAmount} onChange={(e) => setBetAmount(e.target.value)} />
            <p className="text-yellow-400">Expected Profit: ₹{profit}</p>
            <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Place Bet</button>
          </div>
        )}
      </form>
      <Footer />
    </div>
  );
};

export default Match;
