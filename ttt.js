const axios = require('axios').default
const cheerio = require('cheerio')
const iconv = require('iconv-lite')


// board_read.asp?id=talk1&page=1&category=0&key_field=&mypost=0&key_word=&idx=6582775&ref=3415437&step=1&level=0 
// andbc


// board_reply_list.asp?id=talk1&idx=6580211&ref=3413705&step=1
const test1 = async() => {
    // http://m.missyusa.com/mainpage/boards/board_reply_update_ok.asp
    const url = 'http://m.missyusa.com/mainpage/boards/board_reply_update_ok.asp'
    // const url= 'http://m.missyusa.com/mainpage/boards/' + 'board_reply_list.asp?id=talk1&idx=6580170&ref=3413664&step=1/board_reply_update_ok.asp'
    const Cookie= "__qca=P0-1916131976-1671221339080; _ga=GA1.1.1065826753.1679943432; __gads=ID=b18992079a09125b:T=1679943431:S=ALNI_MZ9-V19F6wR6iCpptl0gO2Zkw5G7g; ASPSESSIONIDCQAASRQR=OECMOEPAPMFLJILAAMENLEEH; __gpi=UID=00000a3244a349bf:T=1679943431:RT=1680010172:S=ALNI_MbOI_ktg-24tDlXYThQDhdWaSCUqw; _ga_GZT8WBC5BM=GS1.1.1680010173.2.1.1680010473.0.0.0; _ga_HYVXTN0P7X=GS1.1.1680010879.2.0.1680010881.0.0.0; MissyUSA=secu=10c458b38111a8ed5023331920f3b393&MemberPermit=3&UserNick=%BD%C2%C8%F1%B8%BE&UserName=jinhee+kim&UserID=jhkim73&Login=loginok"

    // Cookie: __qca=P0-1916131976-1671221339080; _ga=GA1.1.1065826753.1679943432; __gads=ID=b18992079a09125b:T=1679943431:S=ALNI_MZ9-V19F6wR6iCpptl0gO2Zkw5G7g; ASPSESSIONIDCQAASRQR=OECMOEPAPMFLJILAAMENLEEH; __gpi=UID=00000a3244a349bf:T=1679943431:RT=1680010172:S=ALNI_MbOI_ktg-24tDlXYThQDhdWaSCUqw; _ga_GZT8WBC5BM=GS1.1.1680010173.2.1.1680010473.0.0.0; MissyUSA=secu=7c76779814b96d19f224cb3d41c4c2d3&MemberPermit=3&UserNick=%BD%C2%C8%F1%B8%BE&UserName=jinhee+kim&UserID=jhkim73&Login=loginok; _ga_HYVXTN0P7X=GS1.1.1680010879.2.1.1680011916.0.0.0

    const data = {
        txtComment: '222',
        id: 'talk1',
        idx: '6580170',
        ref: '3413664',
        step: '1',
        // oindex: '40826320',
        index: '40826320'
        // ostep: '1',
        // fl: '1'
    }

    const res = await axios.request({
    url: url,
    method: 'POST',
    headers: {
    cookie: Cookie
    },
    responseType: 'arraybuffer',
    // responseEncoding: 'binary'
    });

    const content = iconv.decode(res.data, "EUC-KR").toString()
    const $ = cheerio.load(content)
    const detailContent = $.html()





    console.log(res)
    console.log(detailContent)


   
   
}

test1()


// document.getElementById("btnComment").addEventListener("click", function () {
//     var form = document.OneLineReply;
//     if (Check(form.txtComment.value) < 2) {
//         form.txtComment.focus();
//         alert("댓글 내용을 입력해 주세요.");
//         return false;
//     } else {
//         form.action = "board_reply_oneline.asp";
//         top.load_onoff('block');
//         vw_btnsub("hidden");
//         form.submit();
//     }
// });


// function AddCommentRe(j) {

//     var form = document.all("frm_commre" + j);

//     if (Check(form.txtComment.value) < 2) {
//         form.txtComment.focus();
//         alert("답글을 입력해 주세요.");
//     } else {
//         top.load_onoff("block");
//         form.action = "board_reply_oneline.asp";
//         form.submit();
//     }

// }

// function UpComment(j) {

//     var form = document.all("frm_commup" + j);

//     if (Check(form.txtComment.value) < 2) {
//         form.txtComment.focus();
//         alert("내용을 입력해 주세요.");
//     } else {
//         top.load_onoff("block");
//         form.action = "board_reply_update_ok.asp";
//         form.submit();
//     }

// }


// <form name="OneLineReply" action="" method="post" target="iiresult" enctype="multipart/form-data">
//     <input type="hidden" name="id" value="talk1">
// 	<input type="hidden" name="idx" value="6580202">
// 	<input type="hidden" name="ref" value="3413696">
// 	<input type="hidden" name="step" value="1">
//     <input type="hidden" name="fl" value="1">
//     <input type="hidden" name="index" value="">
//     <textarea cols="40" rows="8" name="txtComment" id="txtComment"></textarea>
    
//     <span id="btnsub"><a id="btnComment" class="button gray"><font color="#fff">댓글달기</font></a></span>
//     </form>

//     <form name="frm_commre2" target="iiresult" method="post" enctype="multipart/form-data">
//      <input type="hidden" name="id" value="talk1">
//     <input type="hidden" name="idx" value="6580202">
//     <input type="hidden" name="ref" value="3413696">
//     <input type="hidden" name="step" value="1">
//     <input type="hidden" name="oindex" value="40798646">
//     <input type="hidden" name="ostep" value="1">
//     <input type="hidden" name="fl" value="1">
//     <a href="javascript:AddCommentRe(2);" class="button gray"><font color="#fff">답글달기</font></a></form>    