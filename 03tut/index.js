const logEvent = require('./logEvent');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

// Initialize object
const myEmmiter = new MyEmitter();

// Add listener for log event.
myEmmiter.on('log', (msg) => logEvent(msg));

// Emit the event
setTimeout(() => {
  myEmmiter.emit('log', 'Log  event emitted');
}, 2000);
