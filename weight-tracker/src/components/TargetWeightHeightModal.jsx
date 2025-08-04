import React, { useState } from 'react';

const TargetWeightHeightModal = ({ isOpen, onClose, onSubmit }) => {
  const [targetWeight, setTargetWeight] = useState('');
  const [height, setHeight] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!targetWeight.trim() && !height.trim()) {
      alert('Please enter at least one value: Target Weight or Height');
      return;
    }

    const targetWeightNum = targetWeight ? Number(targetWeight) : null;
    const heightNum = height ? Number(height) : null;

    if (targetWeightNum !== null && (targetWeightNum < 0 || targetWeightNum > 150)) {
      alert('Target weight must be between 0 and 150 kg');
      return;
    }

    if (heightNum !== null && (heightNum < 0 || heightNum > 213)) {
      alert('Height must be between 0 and 213 cm');
      return;
    }

    onSubmit({
      targetWeight: targetWeightNum,
      height: heightNum,
    });

    // Optionally clear inputs after submit
    setTargetWeight('');
    setHeight('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h3 className="text-lg font-semibold mb-4">Enter Your Target Weight and Height</h3>
        <label className="block mb-3">
          Target Weight (kg):
          <input
            type="number"
            min="0"
            max="150"
            step="0.1"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            className="border p-1 w-full"
            placeholder="Optional"
          />
        </label>
        <label className="block mb-4">
          Height (cm):
          <input
            type="number"
            min="0"
            max="213"
            step="0.1"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border p-1 w-full"
            placeholder="Optional"
          />
        </label>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>
          <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default TargetWeightHeightModal;
