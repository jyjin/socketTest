


function scanf(callback) {
    process.on('exit', function (code) {
        console.log('* process exit code: ', code)
    });
    process.stdin.setEncoding('utf8');
    // process.stdout.write("确认执行吗(y/n)？");
    process.stdin.on('data', (input) => {
        input = input.toString().trim();
        if (['N', 'n', 'NO', 'no'].indexOf(input) > -1) {
            callback(input)
            process.exit(0);
        }
    })
}

scanf((data)=>{
    console.log('* your input is: ', data)
})
