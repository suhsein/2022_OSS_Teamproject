const levenshtein = require('js-levenshtein');
const getOfficeDict = require('./getOfficeDict');

const officeDict = getOfficeDict();
const Office = require('./Office');
const OriginalOfficeDict = require('./getOriginalOfficeDict');

const originalDict = OriginalOfficeDict();

const Comparestring = function (rtm, channel, dept) {
  // OfficeDict에서 얻어온 Dictionary 형태의 배열을 입력 문자열하고 비교한다.
  const keys = Object.keys(officeDict);
  const original = Object.keys(originalDict);
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
  rtm.sendMessage(`${lowercase}학과를 찾으시나요? ${lowercase}의 학과사무실 위치는 ${Office(rtm, retstr, channel, officeDict)}입니다`, channel);
};

module.exports = Comparestring;
