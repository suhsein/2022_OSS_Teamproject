function getschedule() {
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
      console.log('학사일정 안내 성공');
      rtm.sendMessage(`${text}는 ${schedules} 입니다.`, channel); // 슬랫봇으로 학사일정 안내
      return Promise.resolve('학사일정 안내 성공');
    }
    rtm.sendMessage('해당 날짜의 학사일정이 없습니다.', channel);
    return Promise.resolve('학사일정 없음');
  }
  // set = 0 인데 날짜 양식이 먼저 입력된 경우 접근 막기
  rtm.sendMessage('[학사일정] 을 입력하시오.', channel);
  return Promise.resolve('학사일정 안내 실패');
};
module.exports = schedule;
