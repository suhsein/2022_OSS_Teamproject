const fs = require('fs');
const dict = {};

const haksa = fs.readFileSync('./haksa.txt');
const lineArray = haksa.toString('utf-8').split('\n');

lineArray.forEach((text) => {
  const d = text.substring(0, text.indexOf(':') - 1); // 날짜
  const s = text.substring(text.indexOf(':') + 2).replace('\r', ''); // 학사일정

  if (d.includes('-')) { // 연속되는 날짜라면
    const start = d.substring(0, d.indexOf('-') - 1).split('/'); // 시작날짜를 월, 일로 나눔
    const end = d.substring(d.indexOf('-') + 2).split('/'); // 끝나는날자를 월, 일로 나눔

    let day = Number(start[1]); // 시작일부터
    while(day <= Number(end[1])) { // 끝나는 일까지
      let cur = `${start[0]}/${(day).toString()}`;
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
console.log(dict);

let text = '9/4'
if (text in dict) {
  let schedules = "";
  dict[text].forEach((schedule) => {
      if(schedules == ""){
          schedules += schedule;
      }else{
          schedules += ', ' + schedule;
      }

  });
  console.log(`${text}는 ${schedules} 입니다.`);
}