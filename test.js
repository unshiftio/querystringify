describe('querystringify', function () {
  'use strict';

  var querystring = require('querystring')
    , assume = require('assume')
    , qs = require('./');

  describe('#stringify', function () {
    var obj = {
      foo: 'bar',
      bar: 'foo'
    };

    it('is exposed as method', function () {
      assume(qs.stringify).is.a('function');
    });

    it('transforms an object', function () {
      assume(qs.stringify(obj)).equals('foo=bar&bar=foo');
    });

    it('can optionally prefix', function () {
      assume(qs.stringify(obj, true)).equals('?foo=bar&bar=foo');
    });

    it('can prefix with custom things', function () {
      assume(qs.stringify(obj, '&')).equals('&foo=bar&bar=foo');
    });

    it('doesnt prefix empty query strings', function () {
      assume(qs.stringify({}, true)).equals('');
      assume(qs.stringify({})).equals('');
    });

    it('works with object keys with empty string values', function () {
      assume(qs.stringify({ foo: '' })).equals('foo=');
    });

    it('works with nulled objects', function () {
      var obj = Object.create(null);

      obj.foo='bar';
      assume(qs.stringify(obj)).equals('foo=bar');
    });

    it('transforms `undefined` into nothing', function () {
      assume(qs.stringify({ foo: undefined })).equals('foo=');
    });

    it('transforms `NaN` into nothing', function () {
      assume(qs.stringify({ foo: NaN })).equals('foo=');
    });

    it('transforms `null` into nothing', function () {
      assume(qs.stringify({ foo: null })).equals('foo=');
    });
  });

  describe('#parse', function () {
    it('is exposed as method', function () {
      assume(qs.parse).is.a('function');
    });

    it('will parse a querystring to an object', function () {
      var obj = qs.parse('foo=bar');

      assume(obj).is.a('object');
      assume(obj.foo).equals('bar');
    });

    it('will also work if querystring is prefixed with ?', function () {
      var obj = qs.parse('?foo=bar&shizzle=mynizzle');

      assume(obj).is.a('object');
      assume(obj.foo).equals('bar');
      assume(obj.shizzle).equals('mynizzle');
    });

    it('will also work if querystring is prefixed with #', function () {
      var obj = qs.parse('#foo=bar&shizzle=mynizzle');

      assume(obj).is.a('object');
      assume(obj.foo).equals('bar');
      assume(obj.shizzle).equals('mynizzle');
    });

    it('does not overide prototypes', function () {
      var obj = qs.parse('?toString&__proto__=lol');

      assume(obj).is.a('object');
      assume(obj.toString).is.a('function');
      assume(obj.__proto__).does.not.equals('lol');
    });

    it('works with querystring parameters without values', function () {
      var obj = qs.parse('?foo&bar=&shizzle=mynizzle');

      assume(obj).is.a('object');
      assume(obj.foo).equals('');
      assume(obj.bar).equals('');
      assume(obj.shizzle).equals('mynizzle');
    });

    it('first value wins', function () {
      var obj = qs.parse('foo=1&foo=2');

      assume(obj.foo).equals('1');
    });

    it('decodes plus signs', function () {
      var obj = qs.parse('foo+bar=baz+qux');

      assume(obj).is.a('object');
      assume(obj['foo bar']).equals('baz qux');

      obj = qs.parse('foo+bar=baz%2Bqux');

      assume(obj).is.a('object');
      assume(obj['foo bar']).equals('baz+qux');
    });

    it('does not throw on invalid input', function () {
      var obj = qs.parse('?%&');

      assume(obj).is.a('object');
    });

    it('does not include invalid output', function () {
      var obj = qs.parse('?%&');

      assume(obj).is.a('object');
      assume(obj).is.length(0);
    });
  });
});
