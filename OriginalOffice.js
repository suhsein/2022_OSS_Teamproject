const Office = function (rtm, text, channel) {
  console.log('학과를 입력해주세요');
  console.log(text);

  let returnVal;
  switch (text) {
    case 'Architectural Engineering':
    case '건축공학과':
      rtm.sendMessage('College of Engineering Building 1, 132', channel);
      returnVal = 'College of Engineering Building 1, 132';
      break;
    case 'Mechanical Engineering':
    case '기계공학과':
      rtm.sendMessage('College of Engineering Building 4, 212', channel);
      returnVal = 'College of Engineering Building 4, 212';
      break;
    case 'Urban Engineering':
    case '도시공학과':
      rtm.sendMessage('College of Engineering Building 9, 917', channel);
      returnVal = 'College of Engineering Building 9, 917';
      break;
    case 'Electronic Engineering':
      rtm.sendMessage('College of Engineering Building 7, 224', channel);
      returnVal = 'College of Engineering Building 7, 224';
      break;
    case 'Computer Science and Engineering':
    case '컴퓨터공학부':
      rtm.sendMessage('College of Engineering Building 7, 224', channel);
      returnVal = 'College of Engineering Building 7, 224';
      break;
    case 'Chemical Engineering':
    case '화학공학부':
      rtm.sendMessage('College of Engineering Building 6, 999', channel);
      returnVal = 'College of Engineering Building 6, 999';
      break;
    case 'Accounting':
    case '회계학과':
      rtm.sendMessage('College of Commerce 2, 9999', channel);
      returnVal = 'College of Commerce 2, 9999';
      break;
    case 'International Trade':
    case '무역학과':
      rtm.sendMessage('College of Commerce 1, 9999', channel);
      returnVal = 'College of Commerce 1, 9999';
      break;
    case 'Korean Language and Literature':
    case '국어국문학과':
      rtm.sendMessage('College of Humanities, 320', channel);
      returnVal = 'College of Humanities, 320';
      break;
    case 'Library and Information Science':
    case '문헌정보학과':
      rtm.sendMessage('College of Humanities, 427', channel);
      returnVal = 'College of Humanities, 427';
      break;
    default:
      rtm.sendMessage('아직 서비스에 등록되지 않은 과입니다 이용에 불편을 드려 죄송합니다', channel);
      returnVal = '학과 사무실 위치 없음';
  }
  return returnVal;
};

module.exports = Office;
