const fs = require('fs');
const f = 'client/src/pages/EmployeeDashboard.jsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(/import \{ API_URL \} from '\.\.\/services\/api';\nimport React, \{ useState, useEffect \} from 'react';/, "import React, { useState, useEffect } from 'react';\nimport { useAuth } from '../context/AuthContext';\nimport { API_URL } from '../services/api';");
fs.writeFileSync(f, c);
console.log('Fixed');
