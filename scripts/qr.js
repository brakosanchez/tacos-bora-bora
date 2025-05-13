const qrcode = require('qrcode-terminal');

const url = 'http://192.168.0.16:3000';

qrcode.generate(url, {small: true}, function (qrcode) {
    console.log(qrcode);
});
