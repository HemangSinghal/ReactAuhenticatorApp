import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Auth/Register';
import Dashboard from './Auth/Dashboard';
import Login from './Auth/Login';
import { useAuth } from './contexts/AuthContext';
const App = () => {
  const { isAuthenticated } = useAuth();
  return <Router>
    <Routes>
      <Route path='/' element={
        !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path='/login' element={
        !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path='/dashboard'
        element={isAuthenticated ? <Dashboard /> : <Login />} />
    </Routes>
  </Router>
};

export default App;