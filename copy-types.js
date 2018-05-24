const fs = require('fs');

fs.copyFile('entry.nostyle.d.ts', 'dist/entry.nostyle.d.ts', (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log('entry.nostyle.d.ts copied successfully.');
});
