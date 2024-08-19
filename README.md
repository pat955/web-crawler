# Web Crawler
This is a simple webcrawler. Provided a url, it will (if possible) recursively go through html, searching for links to other pages under provided domain, then count and collect them. 

## How to use

### Clone project
```bash
git clone https://github.com/pat955/web-crawler
```

### Provide a url
After cloning run main with a website(that allows crawling) as argument
```bash
node main.js <example.com> 
```
You can use blog.boot.dev/go ("/go" for brevity) to test

### Expected result
Output should look something like this:
```
blog.boot.dev/go/about
blog.boot.dev/go/categories
...
{
  'blog.boot.dev/go': 0,
  'blog.boot.dev/go/about': 18,
  'blog.boot.dev/go/categories': 9,
  'blog.boot.dev/go/contact': 9,
  ...
}
.../web-crawler$ 
```

# Contributing
Node.js v18.7.0
### Clone project
```bash
git clone https://github.com/pat955/web-crawler
```
### Download dependencies
Install npm and node, then
```bash
npm install
```
### Run the tests
```bash
npm test
```

### Submit a pull request

If you'd like to contribute, please fork the repository and open a pull request to the `main` branch.

# Roadmap
- [ ] Switch to sql db
- [ ] Folder structure
- [ ] Documentation, bug fixes
- [ ] Multiple sites as arguements
- [ ] Better error handling
- [ ] More test cases
