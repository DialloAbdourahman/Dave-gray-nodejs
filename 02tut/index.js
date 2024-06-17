// const fs = require('fs');
// const path = require('path');

// fs.readFile(
//   path.join(__dirname, 'files', 'starter.txt'),
//   'utf8',
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

// console.log('Hello..., this should run last');

// fs.writeFile(
//   path.join(__dirname, 'files', 'reply.txt'),
//   'Nice to meet you',
//   (err, data) => {
//     if (err) throw err;
//     console.log('write complete');

//     fs.appendFile(
//       path.join(__dirname, 'files', 'reply.txt'),
//       'Yes it is',
//       (err, data) => {
//         if (err) throw err;
//         console.log('Append complete');

//         fs.appendFile(
//           path.join(__dirname, 'files', 'reply.txt'),
//           'Rename',
//           (err, data) => {
//             if (err) throw err;
//             console.log('Rename complete');
//           }
//         );
//       }
//     );
//   }
// );

// console.log('Another code that should run last');

// // Recommended to listen for an uncaught exception when reading from a file.
// process.on('uncaughtException', (err) => {
//   console.log(`There was an uncaught error: ${err}`);
//   process.exit();
// });

// // We can't control the async nature of js. In our example sometimes the read is first and the write is last and vice versa. the only way to control this is to use the callbacks or the promises.

/////////////////////////////////////////////////////////////////////////////////////////

// const fs = require('fs');
// const path = require('path');

// const writeFileAndRead = () => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(
//       path.join(__dirname, 'files', 'reply.txt'),
//       'Nice to meet you',
//       (err, data) => {
//         if (err) throw reject(err);

//         fs.readFile(
//           path.join(__dirname, 'files', 'reply.txt'),
//           'utf8',
//           (err, data) => {
//             if (err) throw reject(err);
//             resolve(data);
//           }
//         );
//       }
//     );
//   });
// };

// const test = async () => {
//   try {
//     const data = await writeFileAndRead();
//     console.log(data);
//     console.log('this should run last in the async function');
//   } catch (error) {
//     console.log(error);
//   }
// };
// test();
// console.log('Hello, this is last');

////////////////////////////////////////////////////////////////////////////////

const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, 'files', 'starter.txt'),
      'utf8'
    );
    console.log(data);
    await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));
    await fsPromises.writeFile(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      '\nNice to meet you.'
    );
    await fsPromises.rename(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      path.join(__dirname, 'files', 'promiseComplete.txt')
    );

    const newData = await fsPromises.readFile(
      path.join(__dirname, 'files', 'promiseComplete.txt'),
      'utf8'
    );
    console.log(newData);
  } catch (error) {
    console.log(error);
  }
};

fileOps();
