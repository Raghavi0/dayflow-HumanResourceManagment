import React, { useState, useEffect } from 'react';
export default function Leave() {
  const [requests,setRequests]=useState([]);
  useEffect(()=>fetch('http://localhost:5000/api/leave').then(r=>r.json()).then(setRequests),[]);
  return <div><h2 className="gradient-text">Leave Requests</h2><div className="glass-card"><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr style={{borderBottom:'1px solid rgba(255,255,255,0.1)'}}><th>Employee</th><th>Type</th><th>Start</th><th>End</th><th>Status</th></tr></thead><tbody>{requests.map(l=><tr key={l.id} style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}><td style={{padding:8}}>{l.full_name}</td><td style={{padding:8}}>{l.leave_type}</td><td style={{padding:8}}>{l.start_date}</td><td style={{padding:8}}>{l.end_date}</td><td style={{padding:8}}>{l.status}</td></tr>)}</tbody></table></div></div>;
}
