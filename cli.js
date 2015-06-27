#!/usr/bin/env node
var YandexTranslator = require('./index');

// Russian the default language, because I'm Russian.
var DEFAULT_LANG = process.env.YANDEX_TRANSLATE_DEFAULT_LANG || 'ru';

var KEY = process.env.YANDEX_TRANSLATE_KEY;
if (!KEY) {
  console.error('Setup YANDEX_TRANSLATE_KEY environment variable');
  console.error('Get a free API key on this page: http://api.yandex.com/key/keyslist.xml')
  process.exit(1);
}

var translator = new YandexTranslator(KEY);

var args = process.argv.slice(2);
if (!args.length) {
  console.log('Usage: yandex-translate <text> [<lang>]');
  process.exit(1);
}

var text = args[0];
var lang = args[1];

function getLang() {
  if (lang) {
    return Promise.resolve(lang);
  }

  return translator.detect(text).then(function(detectedLang) {
    if (detectedLang === DEFAULT_LANG) {
      return 'en';
    }

    return DEFAULT_LANG;
  });
}

getLang().then(function(lang) {
  return translator.translate(text, lang);
}).then(function(text) {
  console.log(text.join('\n'));
}).catch(function(e) {
  console.trace(e);
  process.exit(1);
});
