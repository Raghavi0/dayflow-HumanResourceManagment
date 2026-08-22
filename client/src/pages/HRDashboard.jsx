import React from 'react';
import { API_URL } from '../services/api';
import { Link } from 'react-router-dom';
import { Users, Clock, CalendarDays, BadgeDollarSign, FileText, Bell, BarChart3 } from 'lucide-react';

const cards = [
  { title: 'Total Employees', value: '128', icon: Users, color: '#00e0ff', link: '/employees' },
  { title: 'Present Today', value: '112', icon: Clock, color: '#00ffa3', link: '/attendance' },
  { title: 'Leave Requests', value: '14', icon: CalendarDays, color: '#ffd166', link: '/leave-approvals' },
  { title: 'Payroll Due', value: '$84,200', icon: BadgeDollarSign, color: '#ff4d6d', link: '/payroll' },
  { title: 'Reports', value: '32', icon: FileText, color: '#7b2cbf', link: '/reports' },
];

export default function HRDashboard() {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 24 }}><span className="gradient-text">HR Overview</span></h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
        {cards.map(c => (
          <Link key={c.title} to={c.link} className="glass-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: '16px', background: `linear-gradient(135deg, ${c.color}20, ${c.color}40)`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${c.color}60` }}>
              <c.icon size={26} color={c.color} />
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1 }}>{c.value}</div>
              <div style={{ color: 'var(--text-sub)', fontSize: '0.9rem', fontWeight: 500 }}>{c.title}</div>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20 }}>
        <div className="glass-card">
          <h3 style={{ fontWeight: 600, marginBottom: 14 }}>Recent Notifications</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['New employee onboarded: Alex Morgan', 'Leave approved for Priya', 'Payroll processed for June'].map(t => (
              <li key={t} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, fontSize: '0.92rem', border: '1px solid rgba(255,255,255,0.05)' }}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="glass-card">
          <h3 style={{ fontWeight: 600, marginBottom: 14 }}>Quick Actions</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['Add Employee', 'Approve Leaves', 'Generate Report'].map(a => (
              <button key={a} className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>{a}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
