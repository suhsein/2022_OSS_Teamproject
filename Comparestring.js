const levenshtein = require('./js-levenshtein');
const getOfficeDict = require('./getOfficeDict');

const officeDict = getOfficeDict();

const Comparestring = function (rtm, text, channel) {
  const spaceRegex = / /gi;
  const dept = text.replace(spaceRegex, '').toLowerCase();

  // OfficeDict에서 얻어온 Dictionary 형태의 배열을 입력 문자열하고 비교한다.
  const keys = Object.keys(officeDict);
  keys.forEach((key) => {
    key.replace(spaceRegex, '').toLowerCase();
  });
  const original = Object.keys(officeDict);
  let lowercase;
  let minimum = Infinity;
  for (let i = 0; i < keys.length; i += 1) {
    const val = levenshtein(dept, keys[i]);

    if (minimum > val) {
      minimum = val;
      retstr = keys[i];
      lowercase = original[i];
    }
  }

  rtm.sendMessage(`${lowercase}학과를 찾으시나요? ${lowercase}의 학과사무실 위치는 ${officeDict[retstr]}입니다`, channel);
  console.log(`${lowercase}학과를 찾으시나요? ${lowercase}의 학과사무실 위치는 ${officeDict[retstr]}입니다`);

  return officeDict[retstr];
};

module.exports = Comparestring;
