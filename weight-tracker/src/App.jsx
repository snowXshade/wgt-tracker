
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
// import WeightTracker from './pages/WeightTracker';
import ProtectedRoute from './components/ProtectedRoute';
import { isLoggedIn } from './utils/auth.js';
import { ToastContainer, toast } from 'react-toastify';
// import chartjs from '../src/utils/chartjs.js'
import WeightDashboard from './pages/WeightDashboard.jsx';

function App() {
  return (
    <div>
      <ToastContainer />
    
      <Routes>
        <Route path="/" element={isLoggedIn() ? <Navigate to="/tracker" /> : <Login />} />
        <Route
          path="/tracker"
          element={
            <ProtectedRoute>
              <WeightDashboard />
            </ProtectedRoute>
          }
        />
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
   
    </div>
  );
}

export default App;
