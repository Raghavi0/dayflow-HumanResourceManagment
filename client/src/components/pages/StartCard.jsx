import React from 'react';
export default function StartCard({ title, value, desc }) {
  return <div className="glass-card" style={{padding:20}}>
    <h3 style={{fontSize:'1.1rem',fontWeight:700,marginBottom:6}}>{title}</h3>
    <div style={{fontSize:'1.8rem',fontWeight:800,color:'var(--accent)'}}>{value}</div>
    <div style={{color:'var(--text-sub)',fontSize:'0.9rem',marginTop:6}}>{desc}</div>
  </div>;
}
