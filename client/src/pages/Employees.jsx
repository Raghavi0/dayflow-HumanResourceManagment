import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
export default function Employees() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({full_name:'',email:'',position:'',department:'',salary:'',hire_date:'',status:'Active'});
  useEffect(()=>fetch('http://localhost:5000/api/employees').then(r=>r.json()).then(setList),[]);
  const filtered = list.filter(e => (e.full_name||'').toLowerCase().includes(search.toLowerCase()) || (e.email||'').includes(search));
  const add = async () => { await fetch('http://localhost:5000/api/employees',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)}); setForm({full_name:'',email:'',position:'',department:'',salary:'',hire_date:'',status:'Active'}); fetch('http://localhost:5000/api/employees').then(r=>r.json()).then(setList); };
  const del = async id => { await fetch('http://localhost:5000/api/employees/'+id,{method:'DELETE'}); fetch('http://localhost:5000/api/employees').then(r=>r.json()).then(setList); };
  return <div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}><h2 className="gradient-text">Employees</h2><button className="btn-primary" onClick={add} style={{display:'flex',alignItems:'center',gap:8}}><Plus size={18}/> Add</button></div>
    <div className="glass-card" style={{display:'flex',gap:10,marginBottom:14,flexWrap:'wrap'}}>
      <input className="input-glass" placeholder="Search employees..." value={search} onChange={e=>setSearch(e.target.value)} style={{flex:1,minWidth:220}}/>
    </div>
    <div className="glass-card" style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr style={{borderBottom:'1px solid rgba(255,255,255,0.1)'}}><th style={{textAlign:'left',padding:10}}>Name</th><th>Position</th><th>Dept</th><th>Salary</th><th>Status</th><th>Action</th></tr></thead><tbody>{filtered.map(e=><tr key={e.id} style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}><td style={{padding:10,fontWeight:600}}>{e.full_name}</td><td style={{padding:10}}>{e.position}</td><td style={{padding:10}}>{e.department}</td><td style={{padding:10}}>${e.salary}</td><td style={{padding:10}}><span style={{padding:'4px 8px',borderRadius:6,background:e.status==='Active'?'rgba(0,255,163,0.15)':'rgba(255,77,109,0.15)',color:e.status==='Active'?'#00ffa3':'#ff4d6d',fontWeight:600,fontSize:'0.8rem'}}>{e.status}</span></td><td><button onClick={()=>del(e.id)} style={{background:'rgba(255,77,109,0.1)',border:'1px solid rgba(255,77,109,0.3)',color:'#ff4d6d',borderRadius:8,padding:'4px 10px',cursor:'pointer'}}><Trash2 size={14}/></button></td></tr>)}</tbody></table></div>
    <div className="glass-card" style={{marginTop:16,display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
      <input className="input-glass" placeholder="Name" value={form.full_name} onChange={e=>setForm({...form,full_name:e.target.value})}/>
      <input className="input-glass" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
      <input className="input-glass" placeholder="Position" value={form.position} onChange={e=>setForm({...form,position:e.target.value})}/>
      <input className="input-glass" placeholder="Department" value={form.department} onChange={e=>setForm({...form,department:e.target.value})}/>
      <input className="input-glass" placeholder="Salary" type="number" value={form.salary} onChange={e=>setForm({...form,salary:e.target.value})}/>
      <input className="input-glass" type="date" value={form.hire_date} onChange={e=>setForm({...form,hire_date:e.target.value})}/>
    </div>
  </div>;
}
