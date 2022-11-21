const readline = require("readline");
const schedule = require('./schedule');
 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
 
rl.on("line", (line) => {
    const date_regex = /\d{1,2}\/\d{1,2}/;
    const arr1 = [1,3,5,7,8,10,12];
    const arr2 = [4,6,9,11];

    if (date_regex.test(line)) {
        const m = Number(line.split('/')[0]);
        const d = Number(line.split('/')[1]);
        console.log(m);
        console.log(d);
    // 예외 처리
        if ((arr1.includes(m) && d >= 1 && d <= 31)
            || (arr2.includes(m) && d >= 1 && d <= 30)
            || (m == 2 && d >= 1 && d <= 29)) {
        console.log('날짜 양식이 맞습니다.');
        }else{
            console.log('날짜 양식이 틀렸습니다.');
        }
    }
    rl.close();
});
 
rl.on('close', () => {
        process.exit();
})