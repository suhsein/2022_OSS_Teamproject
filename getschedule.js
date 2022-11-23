const fs = require('fs');

const getschedule = function () {
  const dict = {};
  let haksa;

  try {
    haksa = fs.readFileSync('./haksa.txt').toString('utf-8').split('\n');
  } catch (err) {
    console.error(err);
  }

  haksa.forEach((element) => {
    let Date = element.split(':').at(0).trim(); // colon 기준으로 split. 날짜만 parsing 해 옴.
    const Schedule = element.split(':').at(1).trim();

    if (element.includes('-')) { // 기간 일정에 대한 처리.
      Date = Date.split('-');
      const startDate = Date[0].trim().split('/');
      const endDate = Date[1].trim().split('/');
      // 만약 학사일정이 날짜가 아닌 기간으로 되어있는 경우, 시작 날짜와 종료 날짜.
      // 주어진 haksa.txt는 기간이 같은 달에 걸쳐있으므로 시작 월, 종료 월을 따로 나누지 않음.

      const month = parseInt(startDate[0], 10);
      let sDay = parseInt(startDate[1], 10);
      const eDay = parseInt(endDate[1], 10);

      while (sDay <= eDay) {
        const cur = `${month}/${sDay}`;
        if (!(cur in dict)) {
          dict[cur] = [];
        }
        dict[cur].push(Schedule);
        sDay += 1;
      }
    } else {
      if (!(Date in dict)) { // 날짜 일정에 대한 처리.
        dict[Date] = [];
      }
      dict[Date].push(Schedule);
    }
  });

  return dict;
};

module.exports = getschedule;
