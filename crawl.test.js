const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')
const { getURLfromHTML } = require('./crawl.js')

// Normalize Url 

test('https://blog.boot.dev/path/ to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
  });

test('http://blog.boot.dev/path/ to blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
  });

test('https://blog.boot.dev/path to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
  });

test('http://blog.boot.dev/path/v1 to blog.boot.dev/path/v1', () => {
    expect(normalizeURL('http://blog.boot.dev/path/v1')).toBe('blog.boot.dev/path/v1');
  });

// Get urls from html
test('test 1', ()=> {
    expect(getURLfromHTML(
    `<html>
        <body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        </body>
    </html>`, 'https://blog.boot.dev'
    )).toStrictEqual(['https://blog.boot.dev/'])
})

test('test 2', ()=> {
    expect(getURLfromHTML(
    `<html>
        <body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            <a href="http://example.com"><span>example</span></a>
        </body>
    </html>`, 'https://blog.boot.dev'
    )).toStrictEqual(['https://blog.boot.dev/', 'http://example.com/'])
})
//   https://blog.boot.dev/path/
//   https://blog.boot.dev/path
//   http://blog.boot.dev/path/
//   http://blog.boot.dev/path