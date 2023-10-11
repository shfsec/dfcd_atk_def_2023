//  - - - Fuctionality Section - - - 


// Passing a string returns it's ASCII equivalent letters separated by spaces

function toBinary(text) {
    return text.split('').map(function (char) {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    });
}


// Passing an array of ASCII values returns a string

function toText(binary) {
    return binary.map(function (bin) {
        return String.fromCharCode(parseInt(bin, 2));
    }).join("");
}


//TODO: add support from key [] in input because of scientific notation problem at numbers greater than 21 digits
// ^ This was accidentally resolved. Cool!

// Expects ascii values array and a key string
function xor(str, key) {
    key = '' + key;
    let output = [];

    // Extends the key to match the string len (with a bit of extra which remains un-used)
    const cipherKey = chunkString(key.repeat(Math.round(str.join('').length / key.length)), str[0].length);

    for (let i = 0; i < str.length; i++) {

        output[i] = '';

        // Should be compatible with Unicode as well. Just need to change toBinary()
        for (let ii = 0; ii < str[i].length; ii++) {
            output[i] += (str[i][ii] ^ cipherKey[i][ii]);
        }
    }

    // console.log('Str: ' + str);
    // console.log('Key: ' + cipherKey);
    // console.log('Cip: ' + output.toString());

    return output;
}


// First value is the Cipher text, second is the key
function encode(message, key) {
    let output = [];
    output.push(xor(toBinary(message), key));
    output.push(key);
    return output;
}


function decode(cipher, key) {
    return toText(key === 0 ? cipher : xor(cipher, key));
}

// decode(...encode('hello'))

// Returns an array of str separated into n-sized chunck
function chunkString(str, length) {
    return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

export default encode