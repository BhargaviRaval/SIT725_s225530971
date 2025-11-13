const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press Enter to simulate button click: ', () => {
    console.log('Button clicked!');
    rl.close();
});
