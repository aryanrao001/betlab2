import React, { useContext, useEffect, useState } from 'react';
// import Header from './header';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AllContext } from '../context/AllContext';
import { toast } from 'react-toastify';
import Header2 from './Header2';
import { BiCoinStack } from "react-icons/bi";

const Match = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [callCount, setCallCount] = useState(0);
  const [matchData, setMatchData] = useState(null);
  const [liveData, setLiveData] = useState(null);
  const [selectedBet, setSelectedBet] = useState(null);
  const [betAmount, setBetAmount] = useState('');
  const {Base_url} = useContext(AllContext);
  const [questionId, setQuestionId] = useState();
  const [betCon, setBetCon] = useState('');
  const [bet, setBet] = useState('');
  const [betType, setBetType] = useState('');
  const [profit, setProfit] = useState('');
  const [userid, setuserid] = useState('');



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
    const user = localStorage.getItem('user_id');
    setuserid(user);

    fetchData();
  }, [id]);

  useEffect(() => {
    const user = localStorage.getItem('user_id');
    if (user) {
      setuserid(user);
    }
  }, [])
  

  // useEffect(() => {
  //   const ws = new WebSocket(
  //     // `wss://rest.entitysport.com/exchange/live/match?token=7b5e8407ec97bb503e1a7d0c66441c43&match_id=${id}`
  //     'ws://webhook.entitysport.com:8087/connect?token=7b5e8407ec97bb503e1a7d0c66441c43'
  //   );

  //   ws.onopen = () => console.log('📡 WebSocket connected');

  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log('⚡ Live Data:', data);
  //     setLiveData(data);
  //   };

  //   ws.onerror = (error) => console.error('WebSocket Error:', error);

  //   ws.onclose = () => console.log('❌ WebSocket disconnected');

  //   return () => {
  //     ws.close();
  //   };
  // }, [id]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    // Initialize an array to hold error messages
    const errors = [];
  
    // Check each field and push an error message if it's invalid
    if (!questionId) {
      errors.push("Question ID is required.");
    }
    if (!betCon) {
      errors.push("Bet condition is required.");
    }
    if (!bet) {
      errors.push("Bet is required.");
    }
    if (!betAmount) {
      errors.push("Bet amount is required.");
    } else if (parseFloat(betAmount) < 100) {
      errors.push("Bet amount must be at least ₹100.");
    }
    if (!betType) {
      errors.push("Bet type is required.");
    }
    if (!profit) {
      errors.push("Profit calculation is required.");
    }
    if (!id) {
      errors.push("Match ID is required.");
    }
    if (!userid) {
      errors.push("User ID is required.");
    }
  
    // If there are any errors, alert the user and return
    if (errors.length > 0) {
      alert(errors.join("\n")); // Join the error messages with a newline for better readability
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
  
    // const payload = {
    //   question_id: questionId,
    //   bet_condition: betCon,
    //   bet: bet,
    //   bet_amount: betAmount,
    //   bet_type: betType,
    //   return_value: profit,
    //   match_id: id,
    //   user_id: userid,
    // };
  
    console.log("Payload:", formData);
    console.log(`Sending request to: ${Base_url}/api/place_bet`);
  
    try {
      const response = await axios.post(`${Base_url}/api/place_bet`, formData);
      console.log("Response:", response.data.msg);
  
      if (response) {
        console.log("✅ Bet placed successfully:", response.data);
        toast.success(response.data.msg || "Bet placed successfully!");
      } else {
        console.warn("⚠️ Server responded with error:", response.data);
        alert(response.data.msg || "Something went wrong");
      }
      setSelectedBet(null);

    } catch (error) {
      console.error("❌ API call failed:", error.response ? error.response.data : error);
      alert("Failed to place bet. Please try again.");
    }
  };
  useEffect(() => {
     if (selectedBet?.odds && betAmount && parseFloat(betAmount) >= 100) { const totalReturn = ((parseFloat(selectedBet.odds) + 100) / 100) * parseFloat(betAmount); const onlyProfit = totalReturn - parseFloat(betAmount); setProfit(onlyProfit.toFixed(2)); } else { setProfit(''); } }, [betAmount, selectedBet]);

useEffect(() => { console.log(questions) }, [questions])

// const sessionOdds = questions?.response?.[id]?.session_odds ?? [];

    // useEffect(() => { if (selectedBet?.odds && betAmount && parseFloat(betAmount) >= 100) { const totalReturn = ((parseFloat(selectedBet.odds) + 100) / 100) * parseFloat(betAmount); const onlyProfit = totalReturn - parseFloat(betAmount); setProfit(onlyProfit.toFixed(2)); } else { setProfit(''); } }, [betAmount, selectedBet]);
  


  useEffect(() => {
    console.log(questions)
  }, [questions])
  

  const sessionOdds = questions?.response?.[id]?.session_odds ?? [];

  if (loading && !questions) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-white">
        <div>Loading...</div>
      </div>
    );
  }

  const calculateProfit = (odds, amount) => {
    if (!odds || !amount || isNaN(amount)) return 0;
    // const result = ((parseFloat(odds) + 100) / 100) * parseFloat(amount);
    // // setProfit();

    // return (result.toFixed(2));
    return ((parseFloat(odds) + 100)/100 * parseFloat(amount)).toFixed(2);
  };

  const ballEvent = liveData?.response?.ball_event ?? 'N/A';

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col relative">
      <Header2/>
    <form onSubmit={onSubmitHandler} >
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

                    <td
                      className="text-center px-4 py-3 bg-blue-200 text-black cursor-pointer"
                      onClick={() =>
                      (
                        setSelectedBet({
                          type: 'BACK',
                          title: item?.title,
                          odds: item?.back,
                          condition: item?.back_condition,
                                                    

                        }),
                        setQuestionId(item?.question_id),
                        setBetCon(item?.back_condition),
                        setBet(item?.back),
                        setBetType('Back')
                      )
                      }
                      
                    >
                      {item?.back ?? '-'} <br />
                      <span className="text-xs text-gray-700">{item?.back_condition ?? '-'}</span>
                    </td>

                    <td
                      className="text-center px-4 py-3 bg-pink-200 text-black cursor-pointer"
                      onClick={() =>(
                        setSelectedBet({
                          type: 'LAY',
                          title: item?.title,
                          odds: item?.lay,
                          condition: item?.lay_condition,
                          questionId: item?.question_id,

                        }),
                        setQuestionId(item?.question_id),
                        setBetCon(item?.lay_condition),
                        setBet(item?.lay),
                        setBetType('LAY')
                      )
                        
                      }
                    >
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
      </div>

      {selectedBet && (
        <div className="fixed bottom-16 left-0 right-0 px-4 z-50">
          <div className="bg-black bg-opacity-90 backdrop-blur-md text-white rounded-2xl shadow-lg p-4 w-full max-w-xl mx-auto">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">🎯 Place Your Bet ({selectedBet.type})</h2>
              <button
                className="text-red-400 font-bold text-lg"
                onClick={() => {
                  setSelectedBet(null);
                  setBetAmount('');


                }}
              >
                ×
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <p><strong>Title:</strong> {selectedBet.title}</p>
              <p><strong>Odds:</strong> {selectedBet.odds}</p>
              <p><strong>Condition:</strong> {selectedBet.condition}</p>
              <p><strong>You selected:</strong> <span className="text-yellow-400">{selectedBet.type}</span></p>
              <p className='flex ' >
                <strong> Coins + Profit : </strong> <span className='flex  items-center' > {
                   betAmount && parseFloat(betAmount) >= 100 ? (
                    <>
                      <span>
                        {betAmount} + {calculateProfit(selectedBet.odds, betAmount) - parseFloat(betAmount)} =
                      </span>{' '}
                      <BiCoinStack /> {calculateProfit(selectedBet.odds, betAmount)}
                    </>
                  ) : (
                    'Minimum amount should be ₹100'
                  )
                  }  </span> {} {' '}
                {/* {betAmount && parseFloat(betAmount) >= 100
                  ? `₹ ${calculateProfit(selectedBet.odds, betAmount)}`
                  : 'Minimum amount should be ₹100'} */}
              </p>
              {/* f */}
            </div>

            <input
              type="number"
              placeholder="Enter Amount (₹)"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="w-full px-4 my-4 py-2 rounded-lg bg-black text-white border border-gray-600 mb-3"
              min={100}
            />

            <div className='grid grid-cols-5 items-center gap-5'  > 
              <button type='button' className='px-2 bg-gray-700' onClick={()=>setBetAmount(100)}  > 100  </button>
              <button type='button' className='px-2 bg-gray-700' onClick={()=>setBetAmount(200)}  > 200  </button>
              <button type='button' className='px-2 bg-gray-700' onClick={()=>setBetAmount(500)}  > 500  </button>
              <button type='button' className='px-2 bg-gray-700' onClick={()=>setBetAmount(600)}  > 600  </button>
              <button type='button' className='px-2 bg-gray-700' onClick={()=>setBetAmount(800)}  > 800  </button>
              <button type='button' className='px-2 bg-gray-700' onClick={()=>setBetAmount(1000)}  > 1000  </button>
              <button type='button' className='px-2 bg-gray-700' onClick={()=>setBetAmount(1500)}  > 1500  </button>
            </div>

            <input
              disabled={parseFloat(betAmount) < 100}
              type='submit'
              value="Confirm Bet"
              className={`mt-4 font-semibold py-2 px-4 rounded-xl w-full transition-all ${
                parseFloat(betAmount) < 100
                  ? 'bg-gray-600 text-white cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-black'
              }`}



              // onClick={()=>selectedBet(null)}
              
            />
              {/* ✅ Confirm Bet */}
            {/* </button> */}
          </div>
        </div>
      )}
    </form>

      <Footer />
    </div>
  );
};

export default Match;



// Updated One



// i want to store profit coming from calculate profit through setProfit