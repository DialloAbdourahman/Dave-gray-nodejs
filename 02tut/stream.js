const fs = require('fs');

const rs = fs.createReadStream('./files/lorem.txt', { encoding: 'utf-8' });

const ws = fs.createWriteStream('./files/new-lorem.txt');

// rs.on('data', (dataChunc) => {
//   console.log('Chunck received');
//   ws.write(dataChunc);
// });

// Piping is more efficient that the listener
rs.pipe(ws);
