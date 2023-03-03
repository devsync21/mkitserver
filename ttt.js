const puppeteer = require('puppeteer');
const cheerio = require('cheerio')



const test1 = async() => {
       
    const url= "http://m.missyusa.com/mainpage/boards/board_read.asp?id=talk1&page=2&category=0&key_field=&mypost=0&key_word=&idx=6567490&ref=3404090&step=1&level=0"
    //          https://missyusa.com/mainpage/boards/board_read.asp?section=talk&id=talk1&page=1&category=0&key_field=&mypost=&key_word=&idx=6567490&ref=3404090&step=1&level=0
    //         http://m.missyusa.com/mainpage/boards/board_read.asp?id=talk1&page=2&category=0&key_field=&mypost=0&key_word=&idx=6567490&ref=3404090&step=1&level=0
   
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto(url);
    page.waitForSelector('#post_reply > ul')
    .then(()=>console.log('got it'))

    const dataPage = await page.evaluate (()=> {
        return {
            html: document.documentElement.innerHTML
        }
    })
    
    const $ = cheerio.load(dataPage.html);
    // console.log(dataPage.html)

    // const $element = $('body > table:nth-child(2) > tbody > tr:nth-child(2) > td > table:nth-child(1) > tbody > tr > td:nth-child(2) > table:nth-child(1) > tbody > tr > td');


    const detailContent = $.html('.rep_list')
    // $element.each((idx,node) => {
    //     console.log($(node).text())
    // })
    console.log(detailContent)
   
}

test1()