const { print } = require('./print.js')
// TODO
// Sort the pages, make new function for that
// put new function through a testcase :)

function printReport(pages){
    print("Report starting...")
    for (const url in pages){
        print(`Found ${pages[url]} internal links to ${url}`)
    }
}

module.exports = {
    printReport
  }
