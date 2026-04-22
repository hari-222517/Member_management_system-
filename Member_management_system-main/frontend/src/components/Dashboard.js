import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Member');
  const [error, setError] = useState('');
  const { logout, user } = useAuth();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('/members');
      setMembers(response.data);
    } catch (err) {
      setError('Failed to fetch members.');
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/members', { name, email, role });
      setName('');
      setEmail('');
      setRole('Member');
      fetchMembers(); // Refresh member list
    } catch (err) {
      setError('Failed to add member. Email might already exist.');
    }
  };

  const handleDeleteMember = async (memberId) => {
    try {
      await axios.delete(`/members/${memberId}`);
      fetchMembers(); // Refresh member list
    } catch (err) {
      setError('Failed to delete member.');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="welcome-text">
          <h2>Dashboard</h2>
          {user && <p>Welcome back, {user.email}!</p>}
        </div>
      </div>

      <div className="member-form">
        <h3>Add New Member</h3>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleAddMember}>
          <div className="form-row">
            <div className="form-group">
              <label style={{display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--dark)'}}>Name</label>
              <input
                type="text"
                placeholder="Enter member name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label style={{display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--dark)'}}>Email</label>
              <input
                type="email"
                placeholder="Enter member email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label style={{display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--dark)'}}>Role</label>
              <input
                type="text"
                placeholder="Enter role (e.g., Manager, Developer)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Add Member</button>
        </form>
      </div>

      <h3>Members List</h3>
      {members.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <div className="empty-state-text">No members yet</div>
          <div className="empty-state-subtext">Add your first member to get started</div>
        </div>
      ) : (
        <div className="members-grid">
          {members.map(member => (
            <div key={member.id} className="member-card">
              <div className="member-card-header">
                <div className="member-info">
                  <div className="member-name">{member.name}</div>
                  <div className="member-email">{member.email}</div>
                  <span className="member-role">{member.role}</span>
                </div>
                <button 
                  onClick={() => handleDeleteMember(member.id)} 
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
              <div className="member-date">
                Added: {new Date(member.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
