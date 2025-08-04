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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        {editingId ? 'Edit Weight' : 'Add Weight'}
      </h3>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border w-full p-2 mb-3 rounded"
      />
      <input
        type="number"
        placeholder="Weight in kg"
        value={wgt}
        onChange={(e) => setWgt(e.target.value)}
        className="border w-full p-2 mb-3 rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {editingId ? 'Update Entry' : 'Add Entry'}
      </button>
    </form>
  );
};

export default AddWeightForm;
