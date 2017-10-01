const fs = require('fs');

fs.copyFile('./src/Calendar.less', 'build/Calendar.less', (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log('Calendar.less copied successfully.');
});

fs.copyFile('./src/Calendar.css', 'build/Calendar.css', (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log('Calendar.css copied successfully.');
});
