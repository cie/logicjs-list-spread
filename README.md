# LogicJS list spread

This is an extension to the beautiful [logicjs](https://npm.im/logicjs) logic programming library. This extension enables you to use spreads of variables in `list`s, so you can use common Prolog idioms.

```javascript
eq(list(1, 2, ...x), list(1, 2, 3, 4, 5)) // => x=list(3, 4, 5)
```

## Installation

```
npm install logicjs-list-spread
```

Currently you must import `register`, which overrides some functions in `logicjs`

```javascript
require('logicjs-list-spread/register')
```
