# LogicJS list spread

This is an extension to the beautiful [logicjs](https://npm.im/logicjs) logic programming library. This extension enables you to use spreads of variables in `list`s, which enables you to use common Prolog idioms.

```javascript
eq(list(1, 2, ...x), list(1, 2, 3, 4, 5)) // => x=list(3, 4, 5)
```

## Installation

```
npm install logicjs-list-spread
```

Currently you must import it through `register`, which overrides some functions in `logicjs` itself.

```javascript
require('logicjs-list-spread/register')
```

## License

MIT

## Contribution

Welcome! Submit an issue or pull request!

