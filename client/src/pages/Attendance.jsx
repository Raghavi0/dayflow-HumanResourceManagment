import React, { useState, useEffect } from 'react';
export default function Attendance() {
  const [data,setData]=useState([]);
  const [form,setForm]=useState({employee_id:'',date:'',status:'Present'});
  useEffect(()=>fetch('http://localhost:5000/api/attendance').then(r=>r.json()).then(setData),[]);
  const [tab,setTab]=useState('daily');
  const submit = async () => { await fetch('http://localhost:5000/api/attendance',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)}); window.location.reload(); };
  return <div><h2 className="gradient-text">Attendance</h2>
    <div style={{display:'flex',gap:10,marginBottom:14}}><button className={tab==='daily'?'btn-primary':'input-glass'} onClick={()=>setTab('daily')}>Daily</button><button className={tab==='weekly'?'btn-primary':'input-glass'} onClick={()=>setTab('weekly')}>Weekly</button></div>
    <div className="glass-card" style={{display:'flex',gap:10,marginBottom:20,flexWrap:'wrap'}}>
      <input className="input-glass" placeholder="Employee ID" value={form.employee_id} onChange={e=>setForm({...form,employee_id:e.target.value})}/>
      <input className="input-glass" type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
      <select className="input-glass" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Present</option><option>Absent</option><option>Half Day</option></select>
      <button className="btn-primary" onClick={submit}>Mark</button>
    </div>
    <div className="glass-card" style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr style={{borderBottom:'1px solid rgba(255,255,255,0.1)'}}><th>Name</th><th>Date</th><th>Check In</th><th>Status</th></tr></thead><tbody>{data.map(a=><tr key={a.id} style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}><td style={{padding:10}}>{a.full_name||a.employee_id}</td><td style={{padding:10}}>{a.date}</td><td style={{padding:10}}>{a.check_in}</td><td style={{padding:10}}><span style={{padding:'4px 8px',borderRadius:6,background:a.status==='Present'?'rgba(0,255,163,0.15)':a.status==='Absent'?'rgba(255,77,109,0.15)':'rgba(255,209,102,0.15)',color:a.status==='Present'?'#00ffa3':a.status==='Absent'?'#ff4d6d':'#ffd166',fontWeight:600,fontSize:'0.8rem'}}>{a.status}</span></td></tr>)}</tbody></table></div></div>;
}
