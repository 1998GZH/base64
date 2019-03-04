/**
 * author: gzh
 * @param string: the string to encoding
 * date: 2019/3/4
 */

/*
    base64加密原理
    1.将字节转ascii对应二进制数值
    2.每3个字节一组,8位一字节 将3个字节转换成24二进制数,再每6位切割前边补零 3 * 8 = 4 * 6
    3.将补零后的4个8位二进制数转十进制数值，对应base64编码表得到base64编码结果
    举例：
    gzh --> 103 122 104 --> 01100111 01111010 01101000
    按六位一组分，并从左补零 再转十进制根据base编码表得到结果
    --> 011001 110111 101001 101000 --> 00011001 00110111 00101001 00101000
    -->25 55 41 40 --> Z3p0
 */
function myBtoa(string) {
    const base64_table = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b',
        'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
        's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', '+', '/'];
    let origin = '';
    for (let item of string) {
        origin += item.charCodeAt().toString(2).padStart(8, 0);
    }
    let transformBefore = origin.match(/\d{6}/g);
    let lastString = origin.length % 6;
    if (lastString) {
        transformBefore.push(origin.slice(-lastString).padEnd(6, 0));
    }
    let transform = transformBefore.map(item => item.padStart(8, 0));
    let resultString = '',
        equalLength = 4 - transform.length % 4;
    equalLength = equalLength === 4 ? 0 : equalLength;
    transform.forEach(item => {
        resultString += base64_table[Number(`0b${item}`)];
    });
    return resultString + "=".repeat(equalLength);
}

// 使用测试
console.log(myBtoa('gzh'));
console.log(myBtoa('front-end'));
console.log(myBtoa('JavaScript'));
