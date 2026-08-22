import React, { useState } from 'react';
import { API_URL } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(API_URL + '/api/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) { login(data); navigate('/dashboard'); }
    else alert(data.message || 'Login failed');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 20% 30%, #250b3d 0%, #0b0c15 70%)', padding: 24 }}>
      <div className="glass-card" style={{ maxWidth: 420, width: '100%', textAlign: 'center', animation: 'fadeIn 0.7s ease' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #00e0ff, #7b2cbf)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 30px rgba(0,224,255,0.4)' }}>
          <span style={{ fontSize: 32, fontWeight: 700, color: '#fff' }}>D</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 6 }}><span className="gradient-text">DayFlow</span></h1>
        <p style={{ color: 'var(--text-sub)', marginBottom: 28 }}>HR Management System</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input className="input-glass" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="input-glass" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button className="btn-primary" type="submit">Login</button>
        </form>
        <p style={{ marginTop: 18, color: 'var(--text-sub)', fontSize: '0.9rem' }}>Don't have an account? <a href="/register" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>Register</a></p>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}


