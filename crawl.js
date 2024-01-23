const { JSDOM } = require('jsdom')

function normalizeURL(url){
    if (url[url.length-1]==='/'){
        return url.slice(url.indexOf('/')+2, url.length-1)
    }
    return url.slice(url.indexOf('/')+2)
}

function getURLfromHTML(htmlBody, baseURL){
    const dom  = new JSDOM(htmlBody)
    const links = dom.window.document.querySelectorAll("a")
    const hrefAttributes = Array.from(links).map(link => link.href);
    return hrefAttributes
}

async function crawlPage(currentURL){
    const response = await fetch(currentURL)
    if (response.status > 399){
        throw new Error(response.status)
    }else{
        return await response.text()
    }   
}

module.exports = {
    normalizeURL,
    getURLfromHTML,
    crawlPage
  }
