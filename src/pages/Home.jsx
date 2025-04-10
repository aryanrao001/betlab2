import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header';
import Banner from '../components/Banner';
import Category from '../components/Category';
import Lottery from '../components/Lottery';
import SuperJackpot from '../components/SuperJacker';
import Slots from '../components/Slots';
import Footer from '../components/Footer';
import { AllContext } from '../context/AllContext';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { matchdata, setMatchData } = useContext(AllContext);

  useEffect(() => {
    const fetchData = async () => {
      const lastFetched = localStorage.getItem("match_data_fetched");
      const today = new Date().toISOString().split("T")[0];

      // Check if data was fetched today
      if (lastFetched === today && localStorage.getItem("match_data")) {
        const cachedData = JSON.parse(localStorage.getItem("match_data"));
        setMatchData(cachedData);
        setLoading(false);
        console.log("Using cached match data.");
        return;
      }

      // Otherwise fetch new data
      try {
        const [response1, response2] = await Promise.all([
          axios.get('https://rest.entitysport.com/exchange/competitions/129413/matches?token=7b5e8407ec97bb503e1a7d0c66441c43&status=1'),
          axios.get('https://rest.entitysport.com/exchange/competitions/129413/matches?token=7b5e8407ec97bb503e1a7d0c66441c43&status=3'),
        ]);

        const combinedData = {
          status1: response1.data,
          status3: response2.data
        };

        // Set to context and cache
        setMatchData(combinedData);
        localStorage.setItem("match_data", JSON.stringify(combinedData));
        localStorage.setItem("match_data_fetched", today);
        console.log("Fetched and stored new match data.");
      } catch (error) {
        console.error('API Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setMatchData]);

  if (loading) {
    return (
      <div style={styles.spinnerWrapper}>
        <div style={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Banner data={matchdata?.status1} data2={matchdata?.status3} />
      <Category />
      <Lottery />
      <SuperJackpot />
      <Slots />
      <Footer />
    </div>
  );
};

const styles = {
  spinnerWrapper: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '6px solid #ccc',
    borderTopColor: '#000',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

// Add this CSS to your global stylesheet
/*
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
*/

export default Home;
