import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error details:', err.response?.data || err.message);
      const detail = err.response?.data?.detail;
      if (detail) {
        setError(typeof detail === 'string' ? detail : JSON.stringify(detail));
      } else {
        setError('Failed to log in. Please check your credentials or server connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container fade-in">
      <div className="auth-header">
        <div style={{fontSize: '3rem', marginBottom: '10px'}}>👥</div>
        <h2>MemberHub</h2>
        <p>Welcome back! Sign in to manage your members</p>
      </div>
      
      {error && <div className="error slide-in">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--dark)'}}>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="fade-in"
            style={{animationDelay: '0.1s'}}
          />
        </div>
        
        <div className="form-group">
          <label style={{display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--dark)'}}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="fade-in"
            style={{animationDelay: '0.2s'}}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary fade-in"
          style={{animationDelay: '0.3s'}}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      
      <div className="auth-links fade-in" style={{animationDelay: '0.4s'}}>
        <p>Don't have an account? <Link to="/register" className="link">Create one here</Link></p>
      </div>
    </div>
  );
}

export default Login;
