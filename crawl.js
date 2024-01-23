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

async function crawlPage(baseURL, currentURL, pages){
    const normURL = currentURL
    console.log(normURL)
    if (!normURL.startsWith(normalizeURL(baseURL))){
        return await pages}

    if (!(normURL in pages)){
        pages[normURL] = 0}
    pages[normURL]++

    const response = await fetch(currentURL)
    const html = await response.text()     
    const newURLs = await getURLfromHTML(html)

    for (url of await newURLs){
        let newURL = url
        
        if (!url.startsWith('http') && url.length > 2){
            newURL = await normalizeURL(`${baseURL}${url}`)
        }

        pages = await crawlPage(baseURL, newURL, pages)
    }
    return pages
}


module.exports = {
    normalizeURL,
    getURLfromHTML,
    crawlPage
  }
