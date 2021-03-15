const getReverseString = (string) => string.split( " " ).map(s => s.split("").reverse().join( "" )).join( " " );

module.exports = getReverseString;