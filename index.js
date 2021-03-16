//imports
const getReversedString = require('./utils/get-reverse-string');

process.stdout.write('Input any string for reversing: ');

//input string and output reversed string
process.stdin.on('data', (data) => {
  let reversedString = getReversedString(data.toString());

  process.stdout.write(`${reversedString} \n Input string yet: `);

});