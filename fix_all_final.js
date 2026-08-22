const fs = require('fs');
const path = require('path');
const dir = 'client/src/pages';
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.jsx')) continue;
  const p = path.join(dir, f);
  let c = fs.readFileSync(p, 'utf8');
  const bad = "import { API_URL } from '../services/api';\\nimport React";
  const good = "import React";
  if (c.includes(bad)) {
    c = c.replace(bad, good);
    // Now add API_URL import after first React import line
    const lines = c.split('\n');
    let insertIdx = lines.findIndex(l => l.includes("import React") && l.includes("from 'react';"));
    if (insertIdx >= 0) {
      lines.splice(insertIdx + 1, 0, "import { API_URL } from '../services/api';");
    }
    fs.writeFileSync(p, lines.join('\n'));
    console.log('Fixed', f);
  }
}
