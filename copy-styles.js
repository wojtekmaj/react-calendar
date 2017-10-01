const fs = require('fs');

fs.copyFile('./src/Calendar.less', 'build/Calendar.less', (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log('Styles copied successfully.');
});
