import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axios.post('/register', { email, password });
      console.log('Registration success:', response.data);
      navigate('/login');
    } catch (err) {
      console.error('Registration error details:', err.response?.data || err.message);
      const detail = err.response?.data?.detail;
      if (detail) {
        setError(typeof detail === 'string' ? detail : JSON.stringify(detail));
      } else {
        setError('Failed to register. Server might be unreachable or email is in use.');
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
        <p>Create your account to start managing members</p>
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
            placeholder="Create a password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            className="fade-in"
            style={{animationDelay: '0.2s'}}
          />
        </div>
        
        <div className="form-group">
          <label style={{display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--dark)'}}>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength="6"
            className="fade-in"
            style={{animationDelay: '0.3s'}}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary fade-in"
          style={{animationDelay: '0.4s'}}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      
      <div className="auth-links fade-in" style={{animationDelay: '0.5s'}}>
        <p>Already have an account? <Link to="/login" className="link">Sign in here</Link></p>
      </div>
    </div>
  );
}

export default Register;
