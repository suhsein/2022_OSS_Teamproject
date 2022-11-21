const fs = require('fs');

function getschedule() {
  const dict = {};

  const haksa = fs.readFileSync('./haksa.txt'); // 학사일정 정보가 담긴 파일 가져옴
  const lineArray = haksa.toString('utf-8').split('\n');

  lineArray.forEach((text) => {
    const d = text.substring(0, text.indexOf(':') - 1); // 날짜
    const s = text.substring(text.indexOf(':') + 2).replace('\r', ''); // 학사일정

    if (d.includes('-')) { // 연속되는 날짜라면 범위에 포함되는 모든 날짜를 딕셔너리에 추가 예) 9/1 - 9/7
      const start = d.substring(0, d.indexOf('-') - 1).split('/'); // 시작날짜를 월, 일로 나눔
      const end = d.substring(d.indexOf('-') + 2).split('/'); // 끝나는날자를 월, 일로 나눔

      let day = Number(start[1]); // 시작일부터
      while (day <= Number(end[1])) { // 끝나는 일까지
        const cur = `${start[0]}/${(day).toString()}`;
        if (!(cur in dict)) { // key에 없는 날짜면
          dict[cur] = [s];
        } else { // 이미 있는 날짜일땐 value에 추가
          dict[cur].push(s);
        }
        day += 1;
      }
    } else if (!(d in dict)) { // 이미 key에 존재하는 날짜인지 확인
      dict[d] = [s];
    } else {
      dict[d].push(s);
    }
  });
  return dict;
}

const schedule = function (rtm, state, text, channel) {
  if (text === '학사일정') {
    console.log('학사일정을 안내합니다.');
    rtm.sendMessage('안내 받을 날짜를 이야기해주세요. (예, 12/21)', channel);
    return Promise.resolve('안내 메세지 출력');
  }

  if (state === 1) { // set = 1 (즉, 학사일정이 먼저 입력된 경우)만 날짜에 대한 학사일정 안내하기
    const scheduledict = getschedule(); // 학사일정을 저장한 딕셔너리 가져오기

    if (text in scheduledict) { // 딕셔너리에 있는 날짜라면
      let schedules = '';
      scheduledict[text].forEach((sche) => { // 해당 날짜의 모든 학사일정
        if (schedules === '') {
          schedules += sche;
        } else {
          schedules += `, ${sche}`;
        }
      });
      rtm.sendMessage(`${text}는 ${schedules} 입니다.`, channel); // 슬랫봇으로 학사일정 안내
      return Promise.resolve(schedules);
    }
    rtm.sendMessage('해당 날짜의 학사일정이 없습니다.', channel);
    return Promise.resolve('학사일정 없음');
  } // set = 0 인데 날짜 양식이 먼저 입력된 경우 접근 막기
  rtm.sendMessage('[학사일정] 을 입력하시오.', channel);
  return Promise.resolve('학사일정 안내 실패');
};
module.exports = schedule;
