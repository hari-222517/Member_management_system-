import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function Header() {
  const location = useLocation();
  const { token, logout, user } = useAuth();

  if (!token) return null;

  return (
    <header className="app-header">
      <div className="header-logo">
        <span className="header-logo-icon">👥</span>
        <span>MemberHub</span>
      </div>
      <nav className="header-nav">
        <span className="nav-link active">Dashboard</span>
        <span style={{color: 'var(--gray)', fontSize: '0.9rem'}}>{user?.email}</span>
        <button onClick={logout} className="btn btn-logout">Logout</button>
      </nav>
    </header>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/login" element={
              <div className="main-content">
                <div className="auth-container">
                  <Login />
                </div>
              </div>
            } />
            <Route path="/register" element={
              <div className="main-content">
                <div className="auth-container">
                  <Register />
                </div>
              </div>
            } />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Header />
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
