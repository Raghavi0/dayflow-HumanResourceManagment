import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
export default function Navbar() {
  return <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 24px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(255,255,255,0.03)',backdropFilter:'blur(12px)',position:'sticky',top:0,zIndex:50}}><div style={{fontWeight:800,fontSize:'1.2rem'}}><span className="gradient-text">DayFlow</span></div><div style={{display:'flex',gap:16,alignItems:'center'}}><Link to="/notifications" style={{color:'var(--text-main)',textDecoration:'none'}}><Bell size={20}/></Link><Link to="/profile" style={{color:'var(--text-main)',textDecoration:'none',fontWeight:600}}>Profile</Link></div></nav>;
}
