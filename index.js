//file path
const csvFile = './csv/nodejs-hw1-ex11.csv';

//import modules
const csv = require('csvtojson');
const fs = require('fs');

//crete streams
const readStream = fs.createReadStream(csvFile);
const writeStream = fs.createWriteStream('nodejs-hw1-ex11.txt');


readStream.pipe(csv()).pipe(writeStream);