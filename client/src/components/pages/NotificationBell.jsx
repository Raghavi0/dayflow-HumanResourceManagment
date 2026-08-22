import React from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function NotificationBell() { return <Link to="/notifications" style={{color:'var(--text-main)',position:'relative'}}><Bell size={20}/><span style={{position:'absolute',top:-4,right:-4,width:8,height:8,background:'#ff4d6n',borderRadius:'50%'}}/></Link>; }
