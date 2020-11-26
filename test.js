const { describe, it } = require('tinymocha')
const assert = require('assert').strict
require('./register')
const { lvar, eq, run, list, is_list_spread } = require('logicjs')

describe('logicjs-list-spread', () => {
  it('can check type', () => {
    assert.ok(is_list_spread(list(...lvar())[0]))
  })
  const x = lvar()
  const y = lvar()
  function check(a, b, expected) {
    it(JSON.stringify([a,b]), () => {
      assert.deepEqual(run(eq(a, b), x), expected)
    })
  }
  check(list(x, y), list(3, lvar()), [3])
  check(list(list(), list(list())), list(list(), list(list())), [undefined])
  check(list(), x, [list()])
  check(list(), list(x), [])
  check(list(), list(...x), [list()])
  check(list(...x), list(), [list()])
  check(list(...x), list(...y), [y])
  check(list(...y), list(...x), [undefined])
  check(list(1), list(...x), [list(1)])
  check(list(...x), list(1), [list(1)])
  check(list(1, 2, 5), list(...x), [list(1, 2, 5)])
  check(list(...x), list(1, 2, 5), [list(1, 2, 5)])
  check(list(1, 2, 5), list(2, ...x), [])
  check(list(1, 2, 5), list(1, ...x), [list(2, 5)])
  check(list(1, 2, 5), list(x, ...y), [1])
  check(list(1, 2, 5), list(y, ...x), [list(2, 5)])
  check(list(1, 2, 5), list(y, y, ...x), [])
  check(list(2, 2, 5), list(y, y, ...x), [list(5)])
  check(list(1, 2, 5), list(1, 2, 5, ...x), [list()])
})
