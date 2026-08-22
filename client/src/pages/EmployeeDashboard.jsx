import React, { useState, useEffect } from 'react';
import { API_URL } from '../services/api';
import { useAuth } from '../context/AuthContext';
export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [leave, setLeave] = useState([]);
  useEffect(()=>{ fetch(API_URL + '/api/attendance').then(r=>r.json()).then(setAttendance); fetch(API_URL + '/api/leave').then(r=>r.json()).then(d=>setLeave(d.filter(x=>x.employee_id===user?.id||x.user_id===user?.id))); },[user]);
  return <div>
    <h2 style={{fontSize:'2rem',fontWeight:700,marginBottom:24}}><span className="gradient-text">Good morning, {user?.name?.split(' ')[0] || 'Employee'}</span></h2>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:20}}>
      <div className="glass-card"><h3>Profile</h3><p>{user?.name}</p><p style={{color:'var(--text-sub)',fontSize:'0.9rem'}}>{user?.role} • {user?.department}</p></div>
      <div className="glass-card"><h3>Attendance Today</h3><p style={{fontSize:'1.5rem',fontWeight:700,color:'#00ffa3'}}>{attendance.filter(a=>a.status==='Present').length}</p><p style={{color:'var(--text-sub)',fontSize:'0.9rem'}}>Present</p></div>
      <div className="glass-card"><h3>Leave Balance</h3><p style={{fontSize:'1.5rem',fontWeight:700,color:'#ffd166'}}>12</p><p style={{color:'var(--text-sub)',fontSize:'0.9rem'}}>Days remaining</p></div>
      <div className="glass-card"><h3>Payroll</h3><p style={{fontSize:'1.5rem',fontWeight:700,color:'#00e0ff'}}>₹{leave.length ? '68,000' : '—'}</p><p style={{color:'var(--text-sub)',fontSize:'0.9rem'}}>Net salary</p></div>
    </div>
    <div style={{marginTop:20,display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
      <div className="glass-card"><h3>Recent Leave</h3><ul style={{listStyle:'none',padding:0}}>{leave.slice(0,3).map(l=><li key={l.id} style={{padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}><strong>{l.leave_type}</strong> • {l.status} • {l.start_date} to {l.end_date}</li>)}</ul></div>
      <div className="glass-card"><h3>Quick Actions</h3><div style={{display:'flex',gap:10,flexWrap:'wrap'}}><a href="/leave" className="btn-primary" style={{textDecoration:'none',padding:'10px 18px',fontSize:'0.85rem'}}>Apply Leave</a><a href="/attendance" className="btn-primary" style={{textDecoration:'none',padding:'10px 18px',fontSize:'0.85rem'}}>Attendance</a></div></div>
    </div>
  </div>;
}


