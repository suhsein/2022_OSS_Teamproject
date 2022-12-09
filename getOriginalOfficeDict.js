const fs = require('fs');

const OriginalOfficeDict = function () {
  const dict = {};
  let dept;

  try {
    dept = fs.readFileSync('./dept.txt').toString('utf-8').split('\n');
  } catch (err) {
    console.error(err);
  }

  dept.forEach((element) => {
    const D = element.split('-')[0]; // hypen 기준으로 split.
    const O = element.split('-')[1].trim();

    dict[D] = O;
  });

  return dict;
};
module.exports = OriginalOfficeDict;
