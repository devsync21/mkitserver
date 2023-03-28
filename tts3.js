const axios = require('axios').default
const cheerio = require('cheerio')
const iconv = require('iconv-lite')





const test1 = async() => {
    
    
    // const info = req.body;

    // const url="http://m.missyusa.com/mainpage/boards/board_read.asp?id=talk1&page=57&category=0&key_field=&mypost=0&key_word=&idx=6580170&ref=3413664&step=1&level=0#"
    const url="http://m.missyusa.com/mainpage/boards/board_read.asp?id=talk13&page=5&category=0&key_field=&mypost=0&key_word=&idx=4302404&ref=3657512&step=1&level=0"


    // console.log('cooookie', info.auth.cookie['set-cookie'])
    const Cookie= "__qca=P0-1916131976-1671221339080; _ga=GA1.1.1065826753.1679943432; __gads=ID=b18992079a09125b:T=1679943431:S=ALNI_MZ9-V19F6wR6iCpptl0gO2Zkw5G7g; ASPSESSIONIDCQAASRQR=OECMOEPAPMFLJILAAMENLEEH; __gpi=UID=00000a3244a349bf:T=1679943431:RT=1680010172:S=ALNI_MbOI_ktg-24tDlXYThQDhdWaSCUqw; _ga_GZT8WBC5BM=GS1.1.1680010173.2.1.1680010473.0.0.0; _ga_HYVXTN0P7X=GS1.1.1680010879.2.0.1680010881.0.0.0; MissyUSA=secu=10c458b38111a8ed5023331920f3b393&MemberPermit=3&UserNick=%BD%C2%C8%F1%B8%BE&UserName=jinhee+kim&UserID=jhkim73&Login=loginok"

   
    const response = await axios.request({
        url: url,
        method: 'GET',
        headers: {
            cookie: Cookie,
        },
        responseType: 'arraybuffer',
        // responseEncoding: 'binary'
      });

      console.log( response)

    const content = iconv.decode(response.data, "EUC-KR").toString()

    

    const $ = cheerio.load(content)

    titles = [] 

    // 자세한 글 가져오기.
    const detailContent = $.html('#post_cont')

    const del = $.html('.cont_top')
 
    const final = detailContent.replace(del,"")
    


    console.log(final)

}

test1()