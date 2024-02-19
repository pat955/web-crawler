const { print } = require('./print.js')

function printReport(pages){
    print("Report starting...")
    for (const url in pages){
        print(`Found ${pages[url]} internal links to ${url}`)
    }
    //Sort the pages so that pages with the largest number of inbound internal links are first
    //Print each page in a nice, formatted way. Something like: Found ${count} internal links to ${url}
}

module.exports = {
    printReport
  }
