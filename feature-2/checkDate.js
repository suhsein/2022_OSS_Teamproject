const checkDate = function (text) {
  const m1 = [1, 3, 5, 7, 8, 10, 12];
  const m2 = [4, 6, 9, 11];

  const month = Number(text.split('/')[0]);
  const day = Number(text.split('/')[1]);

  if (m1.includes(month) && day >= 1 && day <= 31) {
    return true;
  } if (m2.includes(month) && day >= 1 && day <= 30) {
    return true;
  } if (month === 2 && day >= 1 && day <= 29) {
    return true;
  }
  return false;
};
module.exports = checkDate;
