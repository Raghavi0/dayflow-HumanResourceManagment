import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Clock, CalendarDays, BadgeDollarSign, FileText, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/employees', label: 'Employees', icon: Users },
  { to: '/attendance', label: 'Attendance', icon: Clock },
  { to: '/leave-approvals', label: 'Leave Approvals', icon: CalendarDays },
  { to: '/payroll', label: 'Payroll', icon: BadgeDollarSign },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  return (
    <aside style={{ width: 260, background: 'rgba(255,255,255,0.03)', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', padding: 20, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 28 }}><span className="gradient-text">DayFlow</span></div>
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {links.map(l => (
          <Link key={l.to} to={l.to} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, textDecoration: 'none', color: pathname === l.to ? 'var(--accent)' : 'var(--text-sub)', fontWeight: 500, fontSize: '0.95rem', background: pathname === l.to ? 'rgba(0,224,255,0.10)' : 'transparent', border: pathname === l.to ? '1px solid rgba(0,224,255,0.25)' : '1px solid transparent', transition: 'all 0.2s' }}>
            <l.icon size={18} /> {l.label}
          </Link>
        ))}
      </nav>
      <button onClick={logout} style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, background: 'rgba(255,77,109,0.10)', border: '1px solid rgba(255,77,109,0.3)', color: '#ff4d6d', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}><LogOut size={18}/> Logout</button>
    </aside>
  );
}
