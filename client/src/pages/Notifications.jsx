import React, { useState, useEffect } from 'react';
import { API_URL } from '../services/api';
import { useAuth } from '../context/AuthContext';
export default function Notifications() {
  const { user } = useAuth();
  const [items,setItems]=useState([]);
  useEffect(()=>{ if(user?.id) fetch(API_URL + '/api/notifications/'+user.id).then(r=>r.json()).then(setItems); },[user]);
  const markRead = async id => { await fetch(API_URL + '/api/notifications/'+id+'/read',{method:'PUT',headers:{'Content-Type':'application/json'}}); setItems(prev=>prev.map(i=>i.id===id?{...i,is_read:1}:i)); };
  return <div><h2 className="gradient-text">Notifications</h2><div className="glass-card">            <button className="btn-primary" onClick={async()=>{await fetch(API_URL + '/api/notifications/'+user.id+'/read-all',{method:'PUT',headers:{'Content-Type':'application/json'}});setItems(prev=>prev.map(i=>({...i,is_read:1})));
            }} style={{marginBottom:12}}>Mark All Read</button><ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10}}>{items.map(i=><li key={i.id} style={{padding:12,background:i.is_read?'rgba(255,255,255,0.02)':'rgba(255,224,255,0.06)',borderRadius:12,border:'1px solid rgba(255,255,255,0.05)'}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><strong>{i.title}</strong><button onClick={()=>markRead(i.id)} style={{fontSize:'0.75rem',padding:'4px 8px',borderRadius:6,border:'none',cursor:'pointer',background:'rgba(255,255,255,0.1)',color:'var(--text-main)'}}>{i.is_read?'Read':'Mark Read'}</button></div><span style={{color:'var(--text-sub)',fontSize:'0.9rem'}}>{i.message}</span></li>)}</ul></div></div>;
}


