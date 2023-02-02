import fs from 'fs';

fs.copyFile('src/Calendar.css', 'dist/Calendar.css', (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log('Calendar.css copied successfully.');
});
