var readline = require('readline');

module.exports = (avtar = 'User input', cb) => {
    var rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt(`${avtar}> `);
    rl.prompt();

    rl.on('line', function (line) {
        rl.setPrompt('');
        rl.prompt();
        rl.close()
        cb(line.trim(), rl)
    });

    rl.on('close', function () {
        // process.exit(0);
    });

    rl.on('pause', function () {

    })

    // ctrl + c 事件
    rl.on('SIGINT', () => {
        // rl.question('Sure to quit? ', (answer) => {
        //     if (answer.match(/^y(es)?$/i)) {
        //         rl.pause()
        //     }
        // });
    });
}

