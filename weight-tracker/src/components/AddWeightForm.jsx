import React from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getToken } from '../utils/auth.js';

const AddWeightForm = ({ fetchWeights, date, setDate, wgt, setWgt, editingId, setEditingId }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !wgt) return toast.error('Date and weight are required');
    if (wgt < 0 || wgt > 200) return toast.error('Weight must be between 0 and 200');

    try {
      if (editingId) {
        // If editing, send PUT request
        await axios.put(
          `http://localhost:5000/api/wgt/${editingId}`,
          { date, wgt },
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        toast.success("Entry updated!");
        setEditingId(null);
      } else {
        // Else create new entry
        await axios.post(
          'http://localhost:5000/api/wgt',
          { date, wgt },
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        toast.success("Weight added!");
      }

      setDate('');
      setWgt('');
      fetchWeights();
    } catch (err) {
      console.error('Error saving weight', err);
      toast.error('Failed to save weight');
    }
  };

  return (
    <div className='text-gray-500'>

<form onSubmit={handleSubmit} className=" bg-white dark:bg-gray-800 p-6 rounded-md shadow-md w-full max-w-sm z-50">
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-white">
        {editingId ? 'Edit Weight' : 'Add Weight'}
      </h3>
      <input
        type="date"
        value={date}
        max="2025-08-05"
        onChange={(e) => setDate(e.target.value)}
        className="border w-full p-2 mb-3 rounded border-gray-400 dark:bg-gray-700 dark:text-gray-200 web"
      />
      <input
        type="number"
        placeholder="Weight in kg"
        value={wgt}
        onChange={(e) => setWgt(e.target.value)}
        className="border w-full p-2 mb-3 rounded border-gray-400 dark:bg-gray-700 dark:text-gray-200"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600  dark:bg-blue-900 dark:text-blue-100"
      >
        {editingId ? 'Update Entry' : 'Add Entry'}
      </button>
    </form>

    </div>
  );
};

export default AddWeightForm;
