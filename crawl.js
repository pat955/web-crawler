const { JSDOM } = require('jsdom')
const { print } = require('./print.js')

function normalizeURL(url){
    // https://example.com --> example.com
    if (url[url.length-1] === '/'){
        return url.slice(url.indexOf('/')+2, url.length-1)
    }
    return url.slice(url.indexOf('/')+2)
}

function getURLfromHTML(htmlBody, _baseURL){
    // Returns all urls found in html body as a list 
    const dom  = new JSDOM(htmlBody)
    const links = dom.window.document.querySelectorAll("a")
    const hrefAttributes = Array.from(links).map(link => link.href);
    return hrefAttributes.toString().split(',')
}

async function crawlPage(baseURL, currentURL, pages){
    const normURL = normalizeURL(currentURL)
    // If the page is no longer on our base url, return pages
    if (!(normURL.startsWith(normalizeURL(baseURL)))){
        return pages}
    // If the pages object already has an entry, increment
    if (normURL in pages){
        pages[normURL] += 1
        return pages}
    // Otherwise, add an entry. Set it to 1 unless its the base url.
    else{
        if (!(normURL == (normalizeURL(baseURL)))){
            pages[normURL] = 1}
        else{
            pages[normURL] = 0
        }
    }
    // Print url when moving on, fetch url and extract urls
    print(normURL)
    const response = await fetch(currentURL)
    const html = await response.text()
    const allURLs = await getURLfromHTML(html)
    // Update and recursively call crawlPage
    for (let url of allURLs){
        if (url[0] === '/' && url.length > 2){
            url =`${baseURL}${url}`}
        pages = await crawlPage(baseURL, url, pages)
    }   
    return pages
}  

// Export modules for main
module.exports = {
    normalizeURL,
    getURLfromHTML,
    crawlPage
  }
