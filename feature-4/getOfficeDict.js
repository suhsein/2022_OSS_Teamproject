const fs = require('fs');

const getOfficeDict = function () {
  const dict = {};
  let dept;

  try {
    dept = fs.readFileSync('./dept.txt').toString('utf-8').split('\n');
  } catch (err) {
    console.error(err);
  }

  dept.forEach((element) => {
    const spaceRegex = / /gi;
    let D = element.split('-').at(0); // hypen 기준으로 split.
    const O = element.split('-').at(1).trim();

    D = D.replace(spaceRegex, '').toLowerCase();

    dict[D] = O;
  });

  return dict;
};
module.exports = getOfficeDict;
