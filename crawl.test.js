const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

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

//   https://blog.boot.dev/path/
//   https://blog.boot.dev/path
//   http://blog.boot.dev/path/
//   http://blog.boot.dev/path