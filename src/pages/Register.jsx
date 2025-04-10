import React, { useContext, useState } from 'react';
import { Eye, EyeOff,Lock,Headphones, } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AllContext } from '../context/AllContext';
import { toast } from 'react-toastify';



const Register = () => {

  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [reffer, setReffer] = useState('');
  const navigate = useNavigate();
  const { Base_url } = useContext(AllContext);

  // const Base_url = 'https://webloxic.com/cricket/';

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('username', username);
    formData.append('phone_no', phone);
    formData.append('reffer_code', reffer);
  
    // const Base_url = "https://webloxic.com/cricket/";
  
    try {
      const response = await axios.post(Base_url + 'api/register', formData);
      const { status, msg, msg_class } = response.data;
  
      console.log(response); // Optional: Debug
  
      if (status === true || msg_class === "success") {
        toast.success(msg || "Registered successfully! You can now log in.");
        navigate('/');
      } else {
        toast.error(msg || "Registration failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white text-center py-5">
        <h1 className="text-2xl font-bold">Register</h1>
        <p className="text-sm mt-1">Please register by phone number or email</p>
      </div>

      {/* Title Icon */}
      <div className="flex justify-center my-4">
        <div className="bg-orange-500 p-2 rounded">
          <img src="/icons/phone-icon.svg" alt="Phone Icon" className="h-6 w-6" />
        </div>
      </div>
      <h2 className="text-center text-orange-500 font-bold mb-2">Register your phone</h2>
      <hr className="border-orange-500 mx-6 mb-4" />

      <div className="px-6 space-y-4">
      <form onSubmit={onSubmitHandler} >
        {/* Phone Number Input */}
        <div>
          <label className="text-gray-400 flex items-center gap-1">
            <span></span> User Name
          </label>
          <div className="flex mt-1">
            {/*  */}
            <input
              type="text"
              placeholder="Please Enter your Name"
              className="w-full px-4 py-2 rounded-r-md bg-blac text-white outline-none"
              onChange={(e)=>setUsername(e.target.value)}
              value={username}
            />
          </div>
        </div>


        <div className='my-4' >
          <label className="text-gray-400 flex items-center gap-1">
            <span>📱</span> Phone number
          </label>
          <div className="flex mt-1 ">
            <select className="bg-[#1c1c1c] text-white px-3 py-2 rounded-l-md">
              <option>+91</option>
            </select>
            <input
              type="text"
              placeholder="Please enter the phone number"
              className="w-full px-4 py-2 rounded-r-md bg-black  text-white outline-none"
              // onChange={(e)=>setPhone(e.target.value)}
              value={phone}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, '');
                setPhone(onlyNums);
              }}
            />
          </div>
        </div>


        {/* Invite Code */}
        <div>
          <label className="text-orange-400 flex py-2 items-center gap-1 font-semibold">
            <span>🧧</span> Invite code
          </label>
          <input
            type="text"
            value={reffer}
            onChange={(e)=>setReffer(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1c1c1c] text-white"

          />
        </div>

        
        {/* Remember Me */}
        {/* Remember Me */}
        <div className="flex items-center gap-2 text-sm text-orange-400">
          <input type="checkbox" className="accent-orange-500 my-4 " />
          Remember password
        </div>

        {/* Buttons */}
          <input type='submit' value="Register" className="w-full bg-gradient-to-r text-2xl from-orange-400 to-yellow-400 mb-4 text-black py-2 rounded-full font-bold"/>
        <Link to='/' >
          <button className="w-full text-left text-2xl  text-orange-400  rounded-full font-semibol">
            login
          </button>
        </Link>
      </form>
      </div>
      <div className="flex justify-around mt-10 text-sm text-white px-6">
        <div className="flex flex-col items-center">
          <Lock className="w-6 h-6 text-orange-400 mb-1" />
          <span className='text-xl' >Forgot password</span>
        </div>
        <div className="flex flex-col items-center">
          <Headphones className="w-6 h-6 text-orange-400 mb-1" />
          <span className='text-xl' >Customer Service</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
