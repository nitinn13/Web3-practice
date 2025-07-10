const crypto = require('crypto');

function hashing(prefix) {
    let input = 0;
    while (true) {
        let inputStr = "100xDevs" + input.toString();

        const hash = crypto.createHash('sha256').update(inputStr).digest('hex');
        if (hash.startsWith(prefix)){
            return { input: inputStr, hash: hash };
        }
        input++;
    }
}
const result = hashing('00000');
console.log(`Input: ${result.input}`);
console.log(`Hash: ${result.hash}`);