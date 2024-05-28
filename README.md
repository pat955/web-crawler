# Web Crawler
This is a simple webcrawler. Provided a url, it will (if possible) recursively go through html searching for links to other pages under provided domain, and count/collect them. 

## How to use
```
git clone https://github.com/pat955/web-crawler
```


After cloning run main with a website(that allows crawling) as argument
```
node main.js <example.com>  # You can use blog.boot.dev/go ("/go" for brevity) to test
```
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
