
import React, { useState } from 'react';
import axios from 'axios';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('Login');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      console.log(res.token);
      saveToken(res.data.token);
      navigate('/tracker');
    } catch (err) {
      toast.error('Login failed. Check credentials.');
      console.error(err);
    }
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      saveToken(res.data.token);
      navigate('/tracker');
    } catch (err) {
      alert('Login failed. Check credentials.');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={state === 'Login' ? handleLogin : handleSignup} className="bg-white shadow-md p-8 rounded-md w-80">
        <h2 className="text-xl font-bold mb-6">{state}</h2>
        {
            state === 'Sign Up'
            ?  <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 border"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        : ''
        }
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
            {
                state === 'Login'
                ? <button className="w-full py-2 bg-blue-500 text-white hover:bg-blue-700">Login</button>
                : <button className="w-full py-2 bg-blue-500 text-white hover:bg-blue-700">Sign Up</button>
            }
        
        {
            state === 'Login'
            ? <p className='text-gray-500 py-1'>Dont have an account ? <span onClick={()=>setState('Sign Up')} className='text-blue-500 cursor-pointer'>click here</span></p>
            : <p className='text-gray-500 py-1'>Already have an account ? <span onClick={()=>setState('Login')} className='text-blue-500 cursor-pointer'>click here</span></p>
        }
      </form>
    </div>
  );
};

export default Login;
