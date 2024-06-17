const fs = require('fs');

// Always try to check if a file exists before creatirng it, updating or deleting it.
if (!fs.existsSync('./new')) {
  fs.mkdir('./new', (err) => {
    if (err) throw err;
    console.log('Directory created.');
  });
}

if (fs.existsSync('./new')) {
  fs.rmdir('./new', (err) => {
    if (err) throw err;
    console.log('Directory deleted.');
  });
}
