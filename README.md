# querystringify

[![Version npm](https://img.shields.io/npm/v/querystringify.svg?style=flat-square)](https://www.npmjs.com/package/querystringify)[![Build Status](https://img.shields.io/github/workflow/status/unshiftio/querystringify/CI/master?label=CI&style=flat-square)](https://github.com/unshiftio/querystringify/actions?query=workflow%3ACI+branch%3Amaster)[![Coverage Status](https://img.shields.io/coveralls/unshiftio/querystringify/master.svg?style=flat-square)](https://coveralls.io/r/unshiftio/querystringify?branch=master)

First off, see if the built-in
[`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
is suitable for your needs.

Development of this module started in 2014, when `URLSearchParams` wasn't
available. The module provides a somewhat JSON-compatible interface for query
string parsing. This query string parser is dumb, don't expect to much from it
as it only wants to parse simple query strings. If you want to parse complex,
multi level and deeply nested query strings then you should rethink your
approach, due to the lack of spec and numerous edge cases.

## Installation

This module is released in npm as `querystringify`. It's also compatible with
`browserify` so it can be used on the server as well as on the client. To
install it simply run the following command from your CLI:

```
npm install --save querystringify
```

## Usage

In the following examples we assume that you've already required the library as:

```js
'use strict';

var qs = require('querystringify');
```

### qs.parse()

The parse method transforms a given query string in to an object. Parameters
without values are set to empty strings. It does not care if your query string
is prefixed with a `?`, a `#`, or not prefixed. It just extracts the parts
between the `=` and `&`:

```js
qs.parse('?foo=bar');         // { foo: 'bar' }
qs.parse('#foo=bar');         // { foo: 'bar' }
qs.parse('foo=bar');          // { foo: 'bar' }
qs.parse('foo=bar&bar=foo');  // { foo: 'bar', bar: 'foo' }
qs.parse('foo&bar=foo');      // { foo: '', bar: 'foo' }
```

### qs.stringify()

This transforms a given object in to a query string. By default we return the
query string without a `?` prefix. If you want to prefix it by default simply
supply `true` as second argument. If it should be prefixed by something else
simply supply a string with the prefix value as second argument:

```js
qs.stringify({ foo: bar });       // foo=bar
qs.stringify({ foo: bar }, true); // ?foo=bar
qs.stringify({ foo: bar }, '#');  // #foo=bar
qs.stringify({ foo: '' }, '&');   // &foo=
```

## License

MIT
