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
    
    // console.log('시작',req.body)
    
    const authinfo = req.body
    const linkurl = "http://m.missyusa.com/mainpage/boards/" + authinfo.link

    // console.log('시작',linkurl)

   
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
            // console.log(response.headers);
            // console.log("*********************************")

            res.send(response.headers)


            // client.get (linkurl , {responseType: 'arraybuffer'})
            //     .then((respo) => {

            //         const content = iconv.decode(respo.data, "EUC-KR").toString()

            //         const $ = cheerio.load(content)

            //         titles = [] 
                
            //         // 자세한 글 가져오기.
            //         const detailContent = $.html('.detail_content')
                
                 
            //         res.send(detailContent)

            //     })
                

            })
        .catch(function (error) {
            console.log(error);
            });    


    // console.log(result.cookies)
    

})

// 제목 클릭했을때 자세한 내용 보는 것  --> test with auth
app.post('/test3', async (req, res) => {
   
    
    
    const info = req.body;
   
    const url="http://m.missyusa.com/mainpage/boards/" + info.link
    // console.log("**************************")
    // console.log('3 시작',info.auth['set-cookie'][0])   // 만료시간
    // console.log('3 시작',info.auth['set-cookie'][1])    //진짜 쿠키




    const response = await axios.request({
        url: url,
        method: 'GET',
        headers: {
            cookie: info.auth['set-cookie'],
        },
        responseType: 'arraybuffer',
        // headers: info.auth
        // responseEncoding: 'binary'
      });

    const content = iconv.decode(response.data, "EUC-KR").toString()

    

    const $ = cheerio.load(content)

    titles = [] 

    // 자세한 글 가져오기.
    const detailContent = $.html('.detail_content')

    // const del = $.html('.cont_top')
 
    // const final = detailContent.replace(del,"")
    

    // console.log("**************************")

    res.send(detailContent)

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
   
        // console.log(url)
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

// 제목 클릭했을때 자세한 내용 보는 것
app.post('/get_board_detail', async (req, res) => {
    
    
    const info = req.body;
   
    const url="http://m.missyusa.com/mainpage/boards/" + info.link

   
    const response = await axios.request({
        url: url,
        method: 'GET',
        responseType: 'arraybuffer',
        // responseEncoding: 'binary'
      });

    const content = iconv.decode(response.data, "EUC-KR").toString()

    

    const $ = cheerio.load(content)

    titles = [] 

    // 자세한 글 가져오기.
    const detailContent = $.html('#post_cont')

    const del = $.html('.cont_top')
 
    const final = detailContent.replace(del,"")
    


    res.send(final)

})

// 위에 자세한 글 가져오면서 동시에 댓글에 대한 정보도 받는 것
app.post('/get_board_detail_replies', async (req,res) => {
    const url = req.body.link;

    // console.log(url)
    // console.log("http://m.missyusa.com/mainpage/boards/board_reply_list.asp?id=talk1&idx=6567791&ref=3404319&step=1")
   
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



    $detail2.each((id,node)=>{
 
        const rep_detail = $(node).find('span.rep_block').find('td:eq(0)').html() //글들
        const rep_rep_icon = $(node).find('span.rep_menu').text().length   //댓글이면 6 대댓글이면 0
        const if_deleted = $(node).find('font[color="#A0A0A0"]').text()    //삭제된 글입니다. 길이가 0
        let rep_no = $(node).find('span.rep_no').text().split(' ')[0]     

        if ((rep_rep_icon==0) && (if_deleted.length == 0)){
            rep_no = ""
        }
        const ip_address = $(node).find('span.rep_no > font:eq(0)').text()
        const time = $(node).find('span.rep_no > font:eq(1)').text()


        
        reply = {
          
            rep_no,
            rep_detail,
            rep_rep_icon,
            if_deleted,
            ip_address,
            time
        }
        
        replies.push(reply)

    })


    res.send(replies)
})



