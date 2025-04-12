import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';


    export const AllContext = createContext();

    const AllContextProvider = ({ children }) => {
    const Base_url = import.meta.env.VITE_BASE_URL;  // Make sure it's prefixed with VITE_ for Vite
    
    const [matchdata, setMatchData] = useState();
    const [balance, setBalance] = useState("");
    const [user, setuser] = useState("")

    const [user_id, setUser_id] = useState('');
    const [summary, setSummary] = useState([]); // ✅ FIX: Make this an array
    
    
  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) setUser_id(storedUserId);
  }, []);

  useEffect(() => {
    if (!user_id) return;

    const fetchBalance = async () => {
      const formData = new FormData();
      formData.append('user_id', user_id);

      try {
        const response = await axios.post(`${Base_url}api/get_wallet_balance`, formData);
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Failed to fetch wallet balance:', error);
      }
    };

    fetchBalance();
  }, [user_id]);

  useEffect(() => {
    if (!user_id) return;

    const fetchSummary = async () => {
      const formData = new FormData();
      formData.append('user_id', user_id);

      try {
        const response = await axios.post(`${Base_url}api/api_wallet_summary`, formData);
        setSummary(response.data.transactions || []); // ✅ Fallback to empty array
      } catch (error) {
        console.error('Failed to fetch wallet summary:', error);
      }
    };

    fetchSummary();
  }, [user_id]);


    const value = { user , Base_url ,matchdata,setMatchData, setuser, balance , summary };

    return (
        <AllContext.Provider value={value}>
        {children}
        </AllContext.Provider>
    );
    };

    export default AllContextProvider;
