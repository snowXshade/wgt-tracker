import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getToken, getUserEmailFromToken, clearToken } from '../utils/auth.js';
import Navbar from '../components/Navbar';
import AddWeightForm from '../components/AddWeightForm';
import GraphViewer from '../components/GraphViewer';
import DataTable from '../components/DataTable';

const WeightDashboard = () => {
  const [weights, setWeights] = useState([]);
  const [graphType, setGraphType] = useState('line');

  // Lifted states for form
  const [date, setDate] = useState('');
  const [wgt, setWgt] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchWeights = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/wgt', {
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
      await axios.delete(`http://localhost:5000/api/wgt/${id}`, {
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar userEmail={getUserEmailFromToken()} onLogout={() => {
        clearToken();
        window.location.href = '/';
      }} />

      <div className="p-6 flex flex-col lg:flex-row justify-center items-start gap-10">
        <AddWeightForm
          fetchWeights={fetchWeights}
          date={date}
          setDate={setDate}
          wgt={wgt}
          setWgt={setWgt}
          editingId={editingId}
          setEditingId={setEditingId}
        />

        <GraphViewer
          weights={weights}
          graphType={graphType}
          setGraphType={setGraphType}
        />
      </div>

      <div className='flex justify-center py-10'>
        <DataTable
        weights={weights}
        onEdit={handleEditFunction}
        onDelete={handleDeleteFunction}
      />
      </div>
    </div>
  );
};

export default WeightDashboard;
