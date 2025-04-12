import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoWallet } from "react-icons/io5"; 
import { AllContext } from '../context/AllContext';
import { BiCoinStack } from "react-icons/bi";


const Header2 = () => {
  const navigate = useNavigate();

  const {user , Base_url , balance } = useContext(AllContext);

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    // localStorage.removeItem("token"); // optional if you're using token
    navigate("/login");
  };

  return (
    <div>
      <div className='text-white p-3 flex justify-between items-center' style={{ backgroundColor: '#222121' }}>
        <h1 style={{ color: '#F0960E' }} className='text-3xl w-[30%]'>79 Club</h1>
        
        <div className='flex items-center gap-2'>
          <div className='pl-2'>
            <h1 style={{ color: '#A8A5A1' }} className='flex items-center gap-1' ><BiCoinStack />{balance}</h1>
            {/* <h1 className='font-semibold' style={{ color: '#F0960E' }}>Recharge</h1> */}
          </div>
          <h1 style={{ color: '#F0960E' }} className='text-2xl font'><IoWallet /></h1>

        </div>

        {/* Logout Button */}
        {/* <button 
          onClick={handleLogout} 
          className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
        >
          Logout
        </button> */}
      </div>
    </div>
  );
};

export default Header2;
