import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getToken, getUserEmailFromToken, clearToken } from '../utils/auth.js';
import Navbar from '../components/Navbar';
import AddWeightForm from '../components/AddWeightForm';
import GraphViewer from '../components/GraphViewer';
import DataTable from '../components/DataTable';
import Suggestions from '../components/Suggestions.jsx';

const WeightDashboard = () => {

  const back_url = import.meta.env.VITE_BACKEND_URL;
  // const [add, setAdd] = useState(false);
  // const [edit,setEdit] = useState(false);
  const [weights, setWeights] = useState([]);
  const [graphType, setGraphType] = useState('line');

  // Lifted states for form
  const [date, setDate] = useState('');
  const [wgt, setWgt] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchWeights = async () => {
    try {
      const res = await axios.get(back_url + '/api/wgt', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setWeights(res.data);
    } catch (err) {
      console.log(err.message);
      toast.error('Failed to load data');
    }
  };

  const handleDeleteFunction = async (id) => {
    try {
      await axios.delete(back_url + `/api/wgt/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchWeights();
      toast.success('Entry deleted');
    } catch (err) {
      console.error('Delete failed', err);
      toast.error('Could not delete entry');
    }
  };

  const handleEditFunction = (entry) => {
    setDate(entry.date.split('T')[0]); // Format date for input
    setWgt(entry.wgt);
    setEditingId(entry._id);
  };

  useEffect(() => {
    fetchWeights();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative">
      {/* Navbar */}
      <Navbar userEmail={getUserEmailFromToken()} onLogout={() => {
        clearToken();
        navigator('/');
      }} />

      {/* main body */}
      <div className='flex flex-wrap flex-col lg:flex-row gap-10 items-start py-8 px-3 justify-around'>

        {/* add data or edit data box */}
        <div>
          <AddWeightForm
            fetchWeights={fetchWeights}
            date={date}
            setDate={setDate}
            wgt={wgt}
            setWgt={setWgt}
            editingId={editingId}
            setEditingId={setEditingId}
          />
          
        </div>

        {/* summary/suggestions */}
        <div>
          <Suggestions />
        </div>


        {/* graph */}
        <div>
          <GraphViewer
          weights={weights}
          graphType={graphType}
          setGraphType={setGraphType}
        />
        </div>

        {/* data history table */}
        <div>
          <DataTable
          weights={weights}
          onEdit={handleEditFunction}
          onDelete={handleDeleteFunction}
        />
        </div>


      </div>

    </div>

  );
};

export default WeightDashboard;
