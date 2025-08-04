import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import axios from 'axios';

import {
  Bar, Line, Doughnut
} from 'react-chartjs-2';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, ArcElement, PointElement, Tooltip, Legend } from 'chart.js';

import { clearToken, getToken, getUserEmailFromToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { getMonthName } from '../components/month';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, ArcElement, PointElement, Tooltip, Legend);

const WeightTracker = () => {
  const [weights, setWeights] = useState([]);  //backend se weights fetch 

  const [date, setDate] = useState('');  //form data 
  const [wgt, setWgt] = useState('');

  const [graphType, setGraphType] = useState('line');  //for graph style change
  const [graphData, setGraphData] = useState('six-month')
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  const month = new Date().getMonth() + 1;
  const currentMonth = getMonthName(month);

  const fetchWeights = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/wgt', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setWeights(res.data);
    } catch (err) {
      console.error('Error fetching weights', err);
      toast.error('Failed to load data!')
    }
  };

  const handleAddWeight = async (e) => {
    e.preventDefault();
    if (!date || !wgt) return toast.error('Date and weight are required');
    if (wgt < 0 || wgt > 200) return toast.error('Weight must be between 0 and 200');

    try {
      await axios.post(
        'http://localhost:5000/api/wgt',
        { date, wgt },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setDate('');
      setWgt('');
      fetchWeights();
    } catch (err) {
      console.error('Error adding weight', err);
      toast.error('Failed to add data')
    }
  };

  const handleLogout = () => {
    clearToken();
    navigate('/');
  };

  useEffect(() => {
    fetchWeights();
  }, []);

  


  const chartData = {
    labels: weights.map(w => new Date(w.date).toLocaleDateString()),
    datasets: [{
      label: 'Weight (kg)',
      data: weights.map(w => w.wgt),
      backgroundColor: '#60a5fa',
      borderColor: '#3b82f6',
      borderWidth: 2,
    }]
  };

  const userEmail = getUserEmailFromToken();
  const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : 'U';

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Nav */}
      <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-blue-600">Weight Tracker</h2>
        <div onClick={() => setNavOpen(prev => !prev)} className="relative group">
          <div  className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full cursor-pointer">
            {userInitial}
          </div>
          { navOpen && (
            <div className="absolute right-0 mt-2 bg-white border shadow-md rounded-md p-2 z-50">
            <p className="text-sm text-gray-700 mb-2">{userEmail}</p>
            <button onClick={handleLogout} className="text-red-500 hover:underline text-sm">
              Logout
            </button>
          </div>)
          }
        </div>
      </nav>

      {/* Form and Graph Section */}
      <div className="p-6 flex flex-col lg:flex-row justify-center items-start gap-10">
        {/* Form */}
        <form onSubmit={handleAddWeight} className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Add Weight</h3>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border w-full p-2 mb-3 rounded"
          />
          <input
            type="number"
            placeholder="Weight in kg"
            value={wgt}
            onChange={e => setWgt(e.target.value)}
            className="border w-full p-2 mb-3 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add Entry
          </button>
        </form>

        {/* Graph Section */}
        <div className="flex flex-col gap-4 w-full max-w-xl bg-white p-6 rounded-md shadow-md">
          <div className="flex justify-end gap-2">
            <button className="px-2 py-1 border rounded" onClick={() => setGraphType('line')}>Line</button>
            <button className="px-2 py-1 border rounded" onClick={() => setGraphType('bar')}>Bar</button>
            <button className="px-2 py-1 border rounded" onClick={() => setGraphType('donut')}>Donut</button>
            <button className="px-2 py-1 border rounded" onClick={() => setGraphData(`${currentMonth}`)}>{currentMonth}</button>
            <button className="px-2 py-1 border rounded" onClick={() => setGraphData('six-month')}>Half yearly</button>
            <button className="px-2 py-1 border rounded" onClick={() => setGraphData('yearly')}>Yearly</button>
          </div>
          <div>
            {graphType === 'line' && <Line data={chartData} />}
            {graphType === 'bar' && <Bar data={chartData} />}
            {graphType === 'donut' && <Doughnut data={chartData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightTracker;
