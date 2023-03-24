
const axios = require('axios').default

// board_read.asp?id=talk1&page=1&category=0&key_field=&mypost=0&key_word=&idx=6582775&ref=3415437&step=1&level=0 
// andbc


// board_reply_list.asp?id=talk1&idx=6580211&ref=3413705&step=1
const test1 = async() => {
       
    const url= 'http://m.missyusa.com/mainpage/boards/' + 'board_reply_list.asp?id=talk1&idx=6580199&ref=3413693&step=1'

    const data = {
        txtComment: '정보 감사합니다. ',
        id: 'talk1',
        idx: '6580199',
        ref: '3413693',
        step: '1',
        oindex: '40798642',
        ostep: '1',
        fl: '1'
    }

    const res = await axios.post(url, data)

    console.log(res)


   
   
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