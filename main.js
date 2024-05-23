const { crawlPage } = require('./crawl.js')
const fs = require('fs');


async function main(){
    const args = process.argv.slice(2);
    if (args.length != 1){
        throw new Error(`One argument needed, you have: ${args.length}` )}

    const baseURL = args[0]
    console.log(`${baseURL}\nStarting crawling...`)
    
    try{
        const json = JSON.parse(fs.readFileSync("cache.json"))
        if (baseURL in json["urls"]){
            console.log('here')
            console.log(json["urls"][baseURL]["page count"])
            return 
        }
        const pages = {}
        const pageCount = await crawlPage(baseURL, baseURL, pages)

        console.log(cache(baseURL, await pageCount))

    }catch (error) {
        console.log(error)
        const pages = {}
        const pageCount = await crawlPage(baseURL, baseURL, pages)

        console.log(cache(baseURL, await pageCount))
    }    
}

function searchCache(keyword, baseURL){
    const json = JSON.parse(fs.readFileSync("cache.json"))
    if (!baseURL in json["urls"]){
        throw new Error(`You have not crawled through this url before` )
    }
    const array = []
    const pages = json["urls"][baseURL]["page count"]
    for (const [page, count] of Object.entries(pages)){
        // remove the base url from page so that it only searches the subpages
        if (page.match(keyword)){
            array.push(`https://${page}`)
        }
    }
    return array
}

function cache(baseURL, pageCount){
    const date = new Date()  
    const today =  date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
    
    if (!fs.existsSync('cache.json')){
        const json = {"urls": {[baseURL] : {"page count" : pageCount, "cache time": today}}}
        fs.writeFile('cache.json', JSON.stringify(json, undefined, 4), (err) => err && console.error(err))
        // return used for prints to avoid redundancy 

        return json["urls"][baseURL]["page count"]

    }else{
        const json = JSON.parse(fs.readFileSync("cache.json"))
        json["urls"][baseURL] =  {
            "page count": pageCount,
            "cache time" : today
        }
        fs.writeFile('cache.json', JSON.stringify(json, undefined, 4), (err) => err && console.error(err))
        // return used for prints to avoid redundancy 

        return json["urls"][baseURL]["page count"]
    }
}

main()

// Ideas
// Add more robust error checking so that you can crawl larger sites without issues.
// Count external links, as well as internal links, and add them to the report
// Use a graphics library to create an image that shows the links between the pages as a graph visualization
// Make requests concurrently to speed up the crawling process
// Add a README.md file explaining to users how to clone your git repo and get started