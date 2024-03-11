const { Console, time } = require('console')
const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')
const { normalizeURL } = require('./crawl.js')
const fs = require('fs');


async function main(){
    const args = process.argv.slice(2);
    if (args.length != 1){
        throw new Error(`One argument needed, you have: ${args.length}` )}
    const baseURL = args[0]
    console.log(`${baseURL}\nStarting crawling...`)
    
    const date = new Date()  
    const today =  date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()

    if (fs.existsSync('cache.json')){
        const json = JSON.parse(fs.readFileSync("cache.json"))
        if (baseURL in json["urls"]){
            console.log(json["urls"][baseURL]["page count"])
            return 

        }else{
            const pages = {}
            const pageCount = await crawlPage(baseURL, baseURL, pages)
            console.log(pageCount)

            json["urls"][baseURL] =  {
                "page count": await pageCount,
                "cache time" : today
            }
            fs.writeFile('cache.json', JSON.stringify(json, undefined, 4), (err) => err && console.error(err))
        }
    }else{
        const pages = {}
        const pageCount = await crawlPage(baseURL, baseURL, pages)
        console.log(pageCount)
        
        const newCacheFile = JSON.stringify({"urls": {[baseURL] : {"page count" : pageCount, "cache time": today}}}, undefined, 4)
        fs.writeFile('cache.json', newCacheFile, (err) => err && console.error(err))
    }    
}

main()

// Ideas
// Make the script run on a timer and deploy it to a server. Have it email you every so often with a report.
// Add more robust error checking so that you can crawl larger sites without issues.
// Count external links, as well as internal links, and add them to the report
// Save the report as a CSV spreadsheet rather than printing it to the console
// Use a graphics library to create an image that shows the links between the pages as a graph visualization
// Make requests concurrently to speed up the crawling process
// Add a README.md file explaining to users how to clone your git repo and get started