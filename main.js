const { crawlPage } = require('./crawl.js')

async function main(){
    const args = process.argv.slice(2);
    if (args.length != 1){
        throw new Error(`One argument needed, you have: ${args.length}` )}
    const baseURL = args[0]
    console.log(`${baseURL}\nStarting crawling...`)
    const jre = await crawlPage(baseURL)
    console.log(jre)
}


main()