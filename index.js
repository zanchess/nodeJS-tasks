const reverseString = (string) => string.split( " " ).map(s => s.split("").reverse().join( "" )).join( " " );

process.stdout.write('Write any string for reversing: ');

process.stdin.on('data', (data) => {
  let reversedString = reverseString(data.toString());

  process.stdout.write(`${reversedString}`);

});