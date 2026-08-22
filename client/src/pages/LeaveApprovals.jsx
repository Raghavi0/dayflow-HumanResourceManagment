import React, { useState, useEffect } from 'react';
import { API_URL } from '../services/api';
import { useAuth } from '../context/AuthContext';
export default function LeaveApprovals() {
  const { user } = useAuth();
  const [pending,setPending]=useState([]);
  useEffect(()=>fetch(API_URL + '/api/leave').then(r=>r.json()).then(d=>setPending(d.filter(x=>x.status==='Pending'))),[]);
  const action = async (id,status) => { await fetch(API_URL + '/api/leave/'+id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({status,approved_by:user?.id||1})}); window.location.reload(); };
  if(user?.role!=='HR' && user?.role!=='Admin') return <div><h2 className="gradient-text">Access Restricted</h2><p>HR/Admin only.</p></div>;
  return <div><h2 className="gradient-text">Leave Approvals</h2><div className="glass-card"><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr style={{borderBottom:'1px solid rgba(255,255,255,0.1)'}}><th>Employee</th><th>Type</th><th>Start-End</th><th>Reason</th><th>Action</th></tr></thead><tbody>{pending.map(p=><tr key={p.id} style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}><td style={{padding:10}}>{p.full_name}</td><td style={{padding:10}}>{p.leave_type}</td><td style={{padding:10}}>{p.start_date} → {p.end_date}</td><td style={{padding:10}}>{p.reason}</td><td style={{padding:10}}><button className="btn-primary" style={{padding:'6px 14px',fontSize:'0.8rem',marginRight:8}} onClick={()=>action(p.id,'Approved')}>Approve</button><button style={{padding:'6px 14px',fontSize:'0.8rem',background:'rgba(255,77,109,0.1)',border:'1px solid rgba(255,77,109,0.3)',color:'#ff4d6d',borderRadius:10,cursor:'pointer'}} onClick={()=>action(p.id,'Rejected')}>Reject</button></td></tr>)}</tbody></table></div></div>;
}


