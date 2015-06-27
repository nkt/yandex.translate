# Yandex.Translate
Yandex.Translate API for node.js

## Installation
```sh
npm install yandex.translate
```

## Usage
```javascript
var YandexTranslator = require('yandex.translate');

var translator = new YandexTranslator(YOUR_API_KEY);

var translator.translate('hello', 'ru').then(console.log); // привет
var translator.detect('hello').then(console.log); // en
```

## CLI Usage
```sh
$ yandex-translate hello
привет

$ yandex-translate hello fr
bonjour

$ yandex-translate hello | say # It's talking!
```

## License
[MIT](LICENSE)
