const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// const puppeteer = require('puppeteer');
const cheerio = require('cheerio')


// const request = require('request');

const iconv = require('iconv-lite')

const axios = require('axios').default
const wrapper = require('axios-cookiejar-support').wrapper;
// const axiosCookieJarSupport = require('axios-cookiejar-support').default;

const CookieJar = require('tough-cookie').CookieJar;


// const requests = require('requests')
// const request = require("request-promise")
// const cookieJar = request.jar()
// request = request.defaults({jar:cookieJar})




app.use(express.json())

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})



// 아이디로 로그인후 쿠키 저장
app.post('/get_auth_info', async (req,res) => {
    
  
    
    const authinfo = req.body
    const linkurl = "http://m.missyusa.com/mainpage/boards/" + authinfo.link

    const url = 'http://m.missyusa.com/mainpage/account/login_ok.asp'
 
    const jar = new CookieJar();
    const client = wrapper(axios.create({ jar }));

    const params = new URLSearchParams();
    params.append('userid', authinfo.userid);
    params.append('passwd', authinfo.passwd);
    
    client.post(url, params, {
    headers: {
        'Accept': '*/*'
    }
    })
        .then(function (response) {


            res.send(response.headers)

            })
        .catch(function (error) {
            console.log(error);
            });    


    

})

// 각 게시판 제목 보는 것
app.get('/get_board_title_lists/:section/:sectionid/:page', (req, res) => {
    
    const info = req.params;
  
    const url = 'http://m.missyusa.com/mainpage/boards/board_list.asp?id='
                + info.sectionid  + '&category=0&key_field=&mypost=0&key_word=&page=' + info.page;

      axios.get(url,{responseType: "arraybuffer"})
        .then((response)=>{
            const contnet = iconv.decode(response.data, "EUC-KR").toString()
            const $ = cheerio.load(contnet)

        titles = [] 
       
        const element = $('ul.pr_list > li')
   
        element.each((idx,node) => {

            const title = $(node).find('span[data-icon="pr_title"]').text()     // 제목
            let youtubeicon = $(node).find('span[data-icon="pr_title"]').find('img').attr('src') // 유튜브 아이콘 표시
            const link = $(node).find('a').attr('href')                         // 링크
            const repl = $(node).find('span[data-icon="pr_repl"]').text()       // 댓글수
            const date = $(node).find('span[data-icon="pr_date"]').text()       // 날짜
            const read = $(node).find('span[data-icon="pr_read"]').text()       // 조회수 
            

            if (youtubeicon===undefined){
                youtubeicon = ""
            }
            
            const titletemp = {
                  title,
                  youtubeicon,
                  link,
                  repl,
                  date,
                  read
                  
                
            }
            
            titles.push(titletemp)
            
        })
      
        res.send(titles)
    
        })

})

// 각 게시판 검색 결과 보는 것
app.post('/get_board_search_title_lists/:section/:sectionid/:page', (req, res) => {
    
    const info = req.params;
    const info2 = req.body

   
    // //한글을 euc-kr과 url endoing 하는 함수
    // const buffer = iconv.encode(info2.text, 'EUC-KR');
    // const textEncoded = escape(buffer.toString('binary'));


    const url = 'http://m.missyusa.com/mainpage/boards/board_list.asp?id='
                + info.sectionid  + '&category=0&mypost=0&key_field=title&key_word=' + info2.text + '&page=' + info.page;


      axios.get(url,{responseType: "arraybuffer"})
        .then((response)=>{
            const contnet = iconv.decode(response.data, "EUC-KR").toString()
            const $ = cheerio.load(contnet)

        titles = [] 

       
        const element = $('ul.pr_list > li')
      
        element.each((idx,node) => {

            const title = $(node).find('span[data-icon="pr_title"]').text()     // 제목
            let youtubeicon = $(node).find('span[data-icon="pr_title"]').find('img').attr('src') // 유튜브 아이콘 표시



            const link1= $(node).find('a').attr('href')     
            const link = link1.replace(info2.originalText, info2.text)                    // 링크
           
            const repl = $(node).find('span[data-icon="pr_repl"]').text()       // 댓글수
            const date = $(node).find('span[data-icon="pr_date"]').text()       // 날짜
            const read = $(node).find('span[data-icon="pr_read"]').text()       // 조회수 
            

            if (youtubeicon===undefined){
                youtubeicon = ""
            }

            
            const titletemp = {
                  title,
                  youtubeicon,
                  link,
                  repl,
                  date,
                  read
                  
                
            }
            
            titles.push(titletemp)
            
        })
      
        res.send(titles)
   
    
        })

})

// 제목 클릭했을때 자세한 내용 보는 것
app.post('/get_board_detail', async (req, res) => {
    
    
    const info = req.body;

    const url="http://m.missyusa.com/mainpage/boards/" + info.link

    console.log('cooookie', info.auth.cookie['set-cookie'])

   
    const response = await axios.request({
        url: url,
        method: 'GET',
        headers: {
            cookie: info.auth.cookie['set-cookie'],
        },
        responseType: 'arraybuffer',
        // responseEncoding: 'binary'
      });

    //   console.log( info.auth.cookie['set-cookie'])

    const content = iconv.decode(response.data, "EUC-KR").toString()

    

    const $ = cheerio.load(content)

    titles = [] 

    // 자세한 글 가져오기.
    const detailContent = $.html('#post_cont')

    const del = $.html('.cont_top')
 
    const final = detailContent.replace(del,"")
    


    res.send(final)

})

// 제목 클릭했을때 위에 자세한 글 가져오면서 동시에 댓글에 대한 정보도 받는 것
app.post('/get_board_detail_replies', async (req,res) => {

    const url = req.body.link;

    // console.log('url',url)

    const response = await axios.request({
        url: url,
        method: 'GET',
        responseType: 'arraybuffer',
        // responseEncoding: 'binary'
      });

    const content = iconv.decode(response.data, "EUC-KR").toString()

    // console.log(content)

    const $ = cheerio.load(content)

    const $detail2 = $('.rep_list li') 

    let replies = []
 


    $detail2.each((id_num,node)=>{
 
        const rep_detail = $(node).find('span.rep_block').find('td:eq(0)').html() //글들
        const rep_rep_icon = $(node).find('span.rep_menu').text().length   //댓글이면 6 대댓글이면 0
        const if_deleted = $(node).find('font[color="#A0A0A0"]').text()    //삭제된 글입니다. 길이가 0
        let rep_no = $(node).find('span.rep_no').text().split(' ')[0]     

        if ((rep_rep_icon==0) && (if_deleted.length == 0)){
            rep_no = ""
        }
        const ip_address = $(node).find('span.rep_no > font:eq(0)').text()
        const time = $(node).find('span.rep_no > font:eq(1)').text()

        const id = $(node).find('form').find('input[name="id"]').val()
        const idx = $(node).find('form').find('input[name="idx"]').val()
        const ref = $(node).find('form').find('input[name="ref"]').val()
        const step = $(node).find('form').find('input[name="step"]').val()
        const oindex = $(node).find('form').find('input[name="oindex"]').val()
        const ostep = $(node).find('form').find('input[name="ostep"]').val()
        const fl = $(node).find('form').find('input[name="fl"]').val()
    
        reply = {
            id_num,
            rep_no,
            rep_detail,
            rep_rep_icon,
            if_deleted,
            ip_address,
            time,
            id,
            idx,
            ref,
            step,
            oindex,
            ostep,
            fl,
            url
        }
        
        replies.push(reply)
   

    })


    res.send(replies)
})

// 댓글을 다는 함수
app.post('/send_reply', async (req,res) => {
    // const url = req.body.link;

    // const response = await axios.request({
    //     url: url,
    //     method: 'GET',
    //     responseType: 'arraybuffer',
    //     // responseEncoding: 'binary'
    //   });
    console.log("??????",req.body, req.body.txt)
    

    


    res.send('hahha')
})

