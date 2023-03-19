const iconv = require('iconv-lite')



const atext = '오징어'
const btext =  '%BF%C0%C2%A1%BE%EE'



const euckrString = encodeURIComponent(atext);
const textEncoded = iconv.encode(euckrString, 'EUC-KR').toString();
// const euckrString = encodeURIComponent(textEncoded);

// const contnet = iconv.decode(btext, "EUC-KR").toString()
// const euckrString2 = decodeURIComponent(btext);
const k1 = encodeURI(atext, 'EUC-KR') 
const k2 = encodeURIComponent(atext,'EUC-KR')
const k3 = encodeURIComponent(k2,'EUC-KR')


// const k3 = iconv.decode(btext, 'EUC-KR').toString()
const buffer = iconv.encode(atext, 'EUC-KR');
const param = escape(buffer.toString('binary'));
// const k6 = iconv.decode(k4, 'UTF-8');
const k7 = encodeURI(atext) 


// const k5 = encodeURIComponent(k3)


// console.log(textEncoded,euckrString)
console.log(param)
// console.log(Encoding.detect(atext))
