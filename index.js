const axios = require("axios")
const cheerio = require("cheerio")
const express = require("express")
const PORT = 4000

const app = express()

const url1 = "https://www.joeysutcliffe.com/index.html"
const url2 = "https://www.linkedin.com/in/joseph-sutcliffe-01/"

axios(url1).then(res => {
    const html = res.data
    const $ = cheerio.load(html)
    const info = []


    $(".projects__right-h1", html).each(function(){
        const h1 = $(this).text()
        info.push({
            h1,
        })
    })
    $(".projects__right-p", html).each(function(){
        const p = $(this).text()
        info.push({
            p,
        })
    })
    $(".projects__right", html).each(function(){
        const links = $(this).find("a").attr("href")
        info.push({
            links,
        })
    })


    console.log(info);
}).catch(err => console.log(err))

app.listen(PORT, () => console.log(`Server runing on ${PORT}` ))