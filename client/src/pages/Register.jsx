import React, { useState } from 'react';
import { API_URL } from '../services/api';
export default function Register() {
  const [form, setForm] = useState({name:'',email:'',password:'',role:'Employee',department:'General'});
  const submit = async e => { e.preventDefault(); const r = await fetch(API_URL + '/api/auth/register', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form)}); const d = await r.json(); alert(d.message || 'Registered'); };
  return <div className="glass-card" style={{maxWidth:480,margin:'40px auto'}}><h2 className="gradient-text">Register</h2><form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:12}}><input className="input-glass" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input className="input-glass" type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><input className="input-glass" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/><button className="btn-primary" type="submit">Sign Up</button></form></div>;
}


