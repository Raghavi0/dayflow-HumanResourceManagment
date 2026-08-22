import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
export default function Reports() {
  const { user } = useAuth();
  const [msg,setMsg]=useState('');
  const generate = async () => { const r = await fetch('http://localhost:5000/api/reports',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({report_type:'Summary',generated_by:user?.id||1})}); const d = await r.json(); setMsg('Report saved ID '+d.id); };
  return <div><h2 className="gradient-text">Reports & Analytics</h2>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:20}}>
      <div className="glass-card"><h3>Attendance Rate</h3><p style={{fontSize:'2rem',fontWeight:800,color:'#00ffa3'}}>92%</p><p style={{color:'var(--text-sub)',fontSize:'0.85rem'}}>Present / Total</p></div>
      <div className="glass-card"><h3>Leave Approved</h3><p style={{fontSize:'2rem',fontWeight:800,color:'#ffd166'}}>78%</p><p style={{color:'var(--text-sub)',fontSize:'0.85rem'}}>Approval rate</p></div>
      <div className="glass-card"><h3>Avg Salary</h3><p style={{fontSize:'2rem',fontWeight:800,color:'#7b2cbf'}}>₹72,400</p><p style={{color:'var(--text-sub)',fontSize:'0.85rem'}}>Monthly avg</p></div>
      <div className="glass-card"><h3>Headcount</h3><p style={{fontSize:'2rem',fontWeight:800,color:'#00e0ff'}}>128</p><p style={{color:'var(--text-sub)',fontSize:'0.85rem'}}>Active employees</p></div>
    </div>
    <div className="glass-card" style={{marginTop:20}}><h3>Generate Report</h3><button className="btn-primary" onClick={generate}>Generate Report</button>{msg && <p style={{marginTop:10,color:'var(--success)'}}>{msg}</p>}</div>
  </div>;
}
