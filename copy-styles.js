const fs = require('fs');

fs.copyFile('src/Calendar.less', 'dist/esm/Calendar.less', (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log('Calendar.less copied successfully to ESM build.');
});

fs.copyFile('src/Calendar.less', 'dist/umd/Calendar.less', (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log('Calendar.less copied successfully to UMD build.');
});
