import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
export default function Profile() {
  const { user } = useAuth();
  const [tab,setTab]=useState('overview');
  return <div><h2 className="gradient-text">Profile</h2>
    <div className="glass-card" style={{display:'flex',gap:16,alignItems:'center',marginBottom:20}}>
      <div style={{width:80,height:80,borderRadius:'50%',background:'linear-gradient(135deg,#00e0ff,#7b2cbf)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.8rem',fontWeight:700,color:'#fff'}}>{user?.name?.charAt(0)||'U'}</div>
      <div><h3 style={{margin:0,fontWeight:700}}>{user?.name}</h3><p style={{margin:2,color:'var(--text-sub)',fontSize:'0.9rem'}}>{user?.role} • {user?.department}</p><p style={{margin:2,fontSize:'0.85rem',color:'var(--accent)'}}>{user?.email}</p></div>
    </div>
    <div style={{display:'flex',gap:8,marginBottom:20}}>{['overview','work','salary'].map(t=><button key={t} className={tab===t?'btn-primary':'input-glass'} onClick={()=>setTab(t)} style={{textTransform:'capitalize'}}>{t}</button>)}</div>
    <div className="glass-card">
      {tab==='overview' && <div><h3>Overview</h3><p>Employee ID: <strong>{user?.id||'—'}</strong></p><p>Joining: <strong>2023-01-15</strong></p><p>Status: <strong>Active</strong></p></div>}
      {tab==='work' && <div><h3>Work</h3><p>Department: <strong>{user?.department||'—'}</strong></p><p>Position: <strong>Senior Engineer</strong></p><p>Manager: <strong>HR Lead</strong></p></div>}
      {tab==='salary' && <div><h3>Salary Structure</h3><p>Basic: <strong>₹95,000</strong></p><p>Allowances: <strong>₹5,000</strong></p><p>Deductions: <strong>₹12,000</strong></p><p>Net: <strong style={{color:'#00ffa3'}}>₹88,000</strong></p></div>}
    </div>
  </div>;
}
