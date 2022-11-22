const fs = require('fs');

let haksa;

try {
  haksa = fs.readFileSync('./haksa.txt').toString('utf-8').split('\n');
} catch (err) {
  console.error(err);
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  console.log('학사 일정을 안내합니다.');

  const date = line.split('/');
  const month = parseInt(date[0], 10);
  const day = parseInt(date[1], 10);
  // date는 입력받은 날짜. month와 day로 split.

  haksa.forEach((element) => {
    if (element.includes('-')) { // 기간 일정에 대한 처리.
      const haksaDate = element.split(':').at(0).split('-'); // colon 기준으로 split. 날짜만 parsing 해 옴.

      const startDate = haksaDate[0].trim().split('/');
      const endDate = haksaDate[1].trim().split('/');
      // 만약 학사일정이 날짜가 아닌 기간으로 되어있는 경우, 시작 날짜와 종료 날짜.

      const haksaMonth = parseInt(startDate[0], 10);
      const haksaSDay = parseInt(startDate[1], 10);
      const haksaEDay = parseInt(endDate[1], 10);
      // 기간 일정의 월, 시작일, 종료일.
      // 주어진 haksa.txt는 기간이 같은 달에 걸쳐있으므로 시작 월, 종료 월을 따로 나누지 않음.

      if (month === haksaMonth && day >= haksaSDay && day <= haksaEDay) {
        console.log(element);
      }
    } else if (element.includes(line)) { // 날짜 일정에 대한 처리.
      console.log(element);
    }
  });

  rl.close();
});

rl.on('close', () => {
  process.exit();
});
