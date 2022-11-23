const schedule = function (rtm, state, text, channel, scheduledict) {
  if (text === '학사일정') {
    console.log('학사일정을 안내합니다.');
    rtm.sendMessage('안내 받을 날짜를 이야기해주세요. (예, 12/21)', channel);
    return Promise.resolve('안내 메세지 출력');
  }

  if (state === 2) { // set = 2 날짜 양식이 틀렸거나 존재하지 않는 날짜의 경우 에러 메세지 출력
    console.log('잘못된 날짜 양식입니다.');
    rtm.sendMessage('날짜 양식이 틀리거나 존재하지 않는 날짜입니다.', channel);
    return Promise.resolve('잘못된 날짜 양식');
  }

  if (state === 1) { // set = 1 (즉, 학사일정이 먼저 입력된 경우)만 날짜에 대한 학사일정 안내하기
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
    console.log('학사일정 없음');
    rtm.sendMessage('해당 날짜의 학사일정이 없습니다.', channel);
    return Promise.resolve('학사일정 없음');
  }
  // set = 0 인데 날짜 양식이 먼저 입력된 경우 접근 막기
  console.log('학사일정 안내 실패');
  rtm.sendMessage('[학사일정] 을 입력하십시오.', channel);
  return Promise.resolve('학사일정 안내 실패');
};

module.exports = schedule;
