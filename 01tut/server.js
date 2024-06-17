// In nodejs, we have the global object which is way smaller than the windows object in the frontend.
// Node has core modules like the os module which is only found in js.
// Nodejs is missing some api like fetch

// console.log(global);

const os = require('os');
const path = require('path');
const { add, substract, multiply, divide } = require('./math');

// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname);
// console.log(__filename);

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

// console.log(path.parse(__filename));

console.log(add(2, 5));
console.log(substract(5, 4));
console.log(multiply(5, 4));
console.log(divide(5, 4));
