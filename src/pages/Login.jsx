import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronLeft,
  User,
  Headphones,
  Phone,

} from 'lucide-react';
import { AllContext } from '../context/AllContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {   
  const [tab, setTab] = useState('phone');
  const [showPassword, setShowPassword] = useState(false);
  const [number, setNumber] = useState('')
  const [refer, setRefer] = useState('');
  const navigate = useNavigate();
  const { Base_url } = useContext(AllContext);

  const onSubmitHandler = async(e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('phone_no', number);
    formData.append('reffer_code', refer);

    
    try {
      const response = await axios.post(Base_url+'api/login',formData);
      console.log(response);
      if (response.data.status === true) {
        toast.success(response.data.msg || "Login successful!");
      } else {
        toast.error(response.data.msg || "Login failed!");
      }
      const userId = response.data.user_id;

      if (userId && !isNaN(userId)) {
        localStorage.setItem("user_id", userId);
        navigate('/home');
      } else {
        toast.error("Invalid user ID. Access denied.");
      }
      
    } catch (error) {
      console.log(error);
      
    }
    console.log("Submittted")
  }



  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3">
        <Link to='/home' ><ChevronLeft /></Link>
        <h1 className="text-2xl font-bold text-yellow-400 mx-auto">79 Club</h1>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-400 to-yellow-400 px-4 py-4 text-black">
        <h2 className="font-semibold text-3xl text-white mb-4 ">Log in</h2>
        <p className="text-md text-white  ">
          Please log in with your phone number or email 
          If you forget your password, please contact customer service 
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-around mt-4 border-b border-gray-600">
        <button
          className={`flex items-center gap-2 py-2 ${
            tab === 'phone'
              ? 'text-orange-400 border-b-2 border-orange-400'
              : 'text-gray-400'
          } text-2xl `}
          onClick={() => setTab('phone')}
        >
          <Smartphone className="w-4 h-4" />
          Log in with phone
        </button>
        {/* <button
          className={`flex items-center gap-2 py-2 ${
            tab === 'email'
              ? 'text-orange-400 border-b-2 border-orange-400'
              : 'text-gray-400'
          }`}
          onClick={() => setTab('email')}
        >
          <Mail className="w-4 h-4" />
          Log in with Email
        </button> */}
      </div>

      {/* Form */}
      <div className="px-4 mt-6 space-y-4">
      <form onSubmit={onSubmitHandler} >
        {/* Phone or Email Input */}
        <div>
          <label className="text-xl text-gray-400  flex items-center gap-1 mb-1">
            <Smartphone className="w-4 h-4 text-orange-400" />
            {tab === 'phone' ? 'Phone number' : 'Email'}
          </label>
          {tab === 'phone' ? (
            <div className="flex gap-2 my-4 ">
              <select className="bg-[#1f1f1f] text-white px-3 py-2 rounded-md">
                <option value="+91">+91</option>
                <option value="+1">+1</option>
              </select>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={number}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, '');
                  setNumber(onlyNums);
                }}
                // onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                placeholder="Please enter the phone number"
                className="bg-[#1f1f1f] h-14 text-white px-3 py-2 rounded-md flex-1"
              />
              {/* <input
                type="text"
                placeholder="Please enter the phone number"
                className="bg-[#1f1f1f] h-14 text-white px-3 py-2 rounded-md flex-1"
              /> */}
            </div>
          ) : (
            <input
              type="email"
              placeholder="Enter email"
              className="bg-[#1f1f1f] text-white px-3 py-2 rounded-md w-full"
            />
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-xl text-gray-400 flex items-center gap-1 mb-1">
            <Lock className="w-4 h-4 text-orange-400" />
            Refer Code
          </label>
          <div className="relative my-4 flex items-center ">
            <input
              type="text"
              placeholder="Refer"
              value={refer}
              onChange={(e)=>setRefer(e.target.value)}
              className="bg-[#1f1f1f] text-white px-3 h-14 py-2 rounded-md w-full"
            />
            {/* <button
              className="absolute right-3 top-5 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button> */}
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2 text-sm text-orange-400">
          <input type="checkbox" className="accent-orange-500" />
          Remember password
        </div>

        {/* Buttons */}
          <input type='submit' value="Log In"  className="w-full bg-gradient-to-r text-2xl from-orange-400 to-yellow-400 mb-4 text-black py-2 rounded-full font-bold"/>
 
        <Link to='/register' >
          <button className="w-full border text-2xl border-orange-400 text-orange-400 py-2 rounded-full font-bold">
            Register
          </button>
        </Link>
      </form>
      </div>

      {/* Footer links */}
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

export default Login;
