var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt(`Test > `);
rl.prompt();
var data = [];

rl.on('line', function (line) {
    data.push(line.trim())
    rl.prompt();
});

rl.on('close', function () {
    process.exit(0);
});

// ctrl + c 事件
rl.on('SIGINT', () => {
    rl.question('确定要退出吗？ ', (answer) => {
        if (answer.match(/^y(es)?$/i)) rl.pause();
    });
});

rl.on('pause', function () {
    // console.log('hahah')
})

