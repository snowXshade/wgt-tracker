// src/components/DataTable.jsx
import React from 'react';

const DataTable = ({ weights, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto mt-6 w-full max-w-3xl bg-white rounded-md shadow-md">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-blue-100 text-blue-700">
          <tr>
            <th className="px-4 py-3 border-b">#</th>
            <th className="px-4 py-3 border-b">Date</th>
            <th className="px-4 py-3 border-b">Weight (kg)</th>
            <th className="px-4 py-3 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {weights.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No entries yet.
              </td>
            </tr>
          ) : (
            weights.map((entry, index) => (
              <tr key={entry._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(entry.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b">{entry.wgt}</td>
                <td className="px-4 py-2 border-b text-center space-x-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => {
                      onEdit(entry);
                      scrollTo(0, 0);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => onDelete(entry._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
