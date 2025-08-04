// src/components/GraphViewer.jsx
import React, { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { getMonthName } from '../components/month.js';
import '../utils/chartjs.js'

const GraphViewer = ({ weights }) => {
  const [graphType, setGraphType] = useState('line');
  const [timeRange, setTimeRange] = useState('all'); // all, month, 6-month, year

  const getFilteredWeights = () => {
    const now = new Date();
    if (timeRange === 'month') {
      return weights.filter(w => new Date(w.date).getMonth() === now.getMonth());
    } else if (timeRange === '6-month') {
      const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 5));
      return weights.filter(w => new Date(w.date) >= sixMonthsAgo);
    } else if (timeRange === 'year') {
      return weights.filter(w => new Date(w.date).getFullYear() === new Date().getFullYear());
    }
    return weights;
  };

  const filteredWeights = getFilteredWeights();

  const chartData = {
    labels: filteredWeights.map(w => new Date(w.date).toLocaleDateString()),
    datasets: [{
      label: 'Weight (kg)',
      data: filteredWeights.map(w => w.wgt),
      backgroundColor: filteredWeights.map(w => {
        const avg = weights.reduce((a, b) => a + b.wgt, 0) / weights.length;
        return w.wgt > avg ? 'rgba(255,99,132,0.6)' : 'rgba(75,192,192,0.6)';
      }),
      borderColor: '#3b82f6',
      borderWidth: 2,
    }]
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl bg-white p-6 rounded-md shadow-md">
      {/* Graph Type and Time Filter */}
      <div className="flex flex-wrap justify-end gap-2 mb-2">
        <button onClick={() => setGraphType('line')} className="px-2 py-1 border rounded">Line</button>
        <button onClick={() => setGraphType('bar')} className="px-2 py-1 border rounded">Bar</button>
        <button onClick={() => setGraphType('donut')} className="px-2 py-1 border rounded">Donut</button>
        <button onClick={() => setTimeRange('all')} className="px-2 py-1 border rounded">All Data</button>
        <button onClick={() => setTimeRange('month')} className="px-2 py-1 border rounded">{getMonthName(new Date().getMonth() + 1)}</button>
        <button onClick={() => setTimeRange('6-month')} className="px-2 py-1 border rounded">6 Months</button>
        <button onClick={() => setTimeRange('year')} className="px-2 py-1 border rounded">Year</button>
      </div>

      {/* Graph Display */}
      <div className="w-full">
        {filteredWeights.length === 0 ? (
          <p className="text-gray-500">No data available for selected range.</p>
        ) : graphType === 'line' ? (
          <Line data={chartData} />
        ) : graphType === 'bar' ? (
          <Bar data={chartData} />
        ) : (
          <Doughnut data={chartData} />
        )}
      </div>
    </div>
  );
};

export default GraphViewer;
