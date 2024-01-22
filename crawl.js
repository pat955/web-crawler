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

module.exports = {
    normalizeURL,
    getURLfromHTML
  }
