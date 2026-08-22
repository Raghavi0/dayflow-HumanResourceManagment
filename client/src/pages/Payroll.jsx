import React, { useState, useEffect } from 'react';
export default function Payroll() {
  const [data,setData]=useState([]);
  useEffect(()=>fetch('http://localhost:5000/api/payroll').then(r=>r.json()).then(setData),[]);
  return <div><h2 className="gradient-text">Payroll</h2><div className="glass-card"><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr style={{borderBottom:'1px solid rgba(255,255,255,0.1)'}}><th>Name</th><th>Month</th><th>Basic</th><th>Allowance</th><th>Deductions</th><th>Net</th></tr></thead><tbody>{data.map(p=><tr key={p.id} style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}><td style={{padding:10,fontWeight:600}}>{p.full_name}</td><td style={{padding:10}}>{p.month} {p.year}</td><td style={{padding:10}}>${p.basic_pay}</td><td style={{padding:10}}>${p.allowances}</td><td style={{padding:10}}>${p.deductions}</td><td style={{padding:10,color:'#00ffa3',fontWeight:700}}>${p.net_pay}</td></tr>)}</tbody></table></div></div>;
}
