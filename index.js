//file path
const csvFile = './csv/nodejs-hw1-ex11.csv';
const { pipeline } = require('stream');

//import modules
const csv = require('csvtojson');
const fs = require('fs');

//crete streams
const readStream = fs.createReadStream(csvFile);
const writeStream = fs.createWriteStream('nodejs-hw1-ex1.txt');

//convert by stream
readStream.pipe(csv()).pipe(writeStream);

//processing errors
writeStream.on('error', err => {
  console.log(err);
});

readStream.on('error', err => {
  console.log(err);
});
