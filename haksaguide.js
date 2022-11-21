const haksaguide = (rtm, text, channel) {
    console.log("학사 일정을 안내합니다.");
    console.log(text);

    const fs = require('fs');

    let haksa;

    try {
    haksa = fs.readFileSync('./haska').toString('utf-8');
    } catch (err) {
    console.error(err);
    }

    


    rtm.sendMessage();
};

module.exports = haskaguide;