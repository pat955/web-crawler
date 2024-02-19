const { JSDOM } = require('jsdom')
const { print } = require('./print.js')

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
    return hrefAttributes.toString().split(',')
}
function updatePages(pages, newPages){
    print(newPages)
    for (const [key, value] of Object.entries(newPages)){
        pages[key] += value
    }
}

async function crawlPage(baseURL, currentURL, pages){
    const normURL = normalizeURL(currentURL)
    // If the page is no longer on our base url, return
    if (!(normURL.startsWith(normalizeURL(baseURL)))){
        return pages}
    // If the pages object already has an entry for the normalized version of the current URL, just increment the count and return the current pages.
    if (normURL in pages){
        pages[normURL] += 1
        return pages}
    //Otherwise, add an entry to the pages object for the normalized version of the current URL, 
    //and set the count to 1 as long as the current url isn't the base url (the first page we're crawling). Set it to 0 if it is the base url.
    else{
        if (!(normURL == (normalizeURL(baseURL)))){
            pages[normURL] = 1}
        else{
            pages[normURL] = 0
        }
    }
    
    print(normURL)
    const response = await fetch(currentURL)
    const html = await response.text()
    const allURLs = await getURLfromHTML(html)
    // Recursively crawl each URL you found on the page and update the pages to keep an aggregate count
    // Finally, return the updated pages object
    for (let url of allURLs){
        if (url[0] === '/' && url.length > 2){
            url =`${baseURL}${url}`}
        pages = await crawlPage(baseURL, url, pages)
    }   
    return pages
}  

module.exports = {
    normalizeURL,
    getURLfromHTML,
    crawlPage
  }
