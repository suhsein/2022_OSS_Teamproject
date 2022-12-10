const levenshtein = require('./js-levenshtein');

const Comparestring = function (text, officeDict) {
  const spaceRegex = / /gi;
  const modifiedText = text.replace(spaceRegex, '').toLowerCase();
  // OfficeDict에서 얻어온 Dictionary 형태의 배열을 입력 문자열하고 비교한다.
  const keys = Object.keys(officeDict);
  let lowercase;
  let minimum = Infinity;
  for (let i = 0; i < keys.length; i += 1) {
    const modifedMajor = keys[i].replace(spaceRegex, '').toLowerCase();
    const val = levenshtein(modifiedText, modifedMajor);

    if (minimum > val) {
      minimum = val;
      lowercase = keys[i];
    }
  }
  return lowercase;
};

module.exports = Comparestring;
