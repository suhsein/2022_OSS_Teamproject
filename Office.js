const Office = function (rtm, text, channel) {
  console.log('학과를 입력해주세요');
  console.log(text);

  switch (text) {
    case 'Architectural Engineering':
      rtm.sendMessage('공대 1호관 132호입니다(College of Engineering Building 1, 132)', channel);
      break;
    case 'Mechanical Engineering':
      rtm.sendMessage('공대 4호관 212호입니다(College of Engineering Building 4, 212)', channel);
      break;
    case 'Urban Engineering':
      rtm.sendMessage('공대 9호관 917호입니다(College of Engineering Building 9, 917)', channel);
      break;
    case 'Electronic Engineering':
      rtm.sendMessage('공대 7호관 224호입니다(College of Engineering Building 7, 224)', channel);
      break;
    case 'Computer Science and Engineering':
      rtm.sendMessage('공대 7호관 224호입니다(College of Engineering Building 7, 224)', channel);
      break;
    case 'Chemical Engineering':
      rtm.sendMessage('공대 6호관 999호입니다(College of Engineering Building 6, 999)', channel);
      break;
    case 'Accounting':
      rtm.sendMessage('공대 2호관 9999호입니다(College of Commerce 2, 9999)', channel);
      break;
    case 'International Trade':
      rtm.sendMessage('상대 1호관 9999호입니다(College of Commerce 1, 9999)', channel);
      break;
    case 'Korean Language and Literature':
      rtm.sendMessage('인문대 320호입니다(College of Humanities, 320)', channel);
      break;
    case 'Library and Information Science':
      rtm.sendMessage('인문대 427호입니다(College of Humanities, 427)', channel);
      break;
    default:
      rtm.sendMessage('아직 서비스에 등록되지 않은 과입니다 이용에 불편을 드려 죄송합니다', channel);
  }
};

module.exports = Office;
