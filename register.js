const logic = require('logicjs')
const unify = logic.unify 
logic.unify = function (a, b, frame) {
  if (frame===false) return false
  a = frame.walk(a)
  b = frame.walk(b)
  if (logic.is_logic_list(a) && logic.is_logic_list(b)) {
    if (a.length === 0) {
      if (b.length === 0) return frame
      else if (has_type(b[0], 'list_spread'))
        return logic.unify(logic.list(...b.slice(1)), logic.list(), logic.unify(b[0].variable, a, frame))
    } else if (is_list_spread(a[0])) {
      if (
        a.length === 1 &&
        b.length === 1 &&
        is_list_spread(b[0])
      )
        return logic.unify(a[0].variable, b[0].variable, frame)
      else if (a.length === 1)
        return logic.unify(a[0].variable, b, frame)
      else {
        throw new Error('list spread must be at the end of the list')
        // TODO if unify could return a stream of frames, there would be several solutions here:
        // logic.unify(a.slice(1), b, logic.unify(a[0].variable, logic.list(), frame))
        // and
        // const part = logic.list(logic.lvar(), ...logic.lvar())
        // logic.unify(logic.list(...part, a.slice(1)), b, logic.unify(a[0].variable, part, frame))
        // TODO or support spreads not at the end iff there is only one spread in the list
      }
    } else {
      if (b.length === 0) {
        return false
      } else if (is_list_spread(b[0])) {
        return logic.unify(b, a, frame)
      } else {
        return logic.unify(logic.list(...a.slice(1)), logic.list(...b.slice(1)), logic.unify(a[0], b[0], frame))
      }
    }
  } else return unify(a, b, frame)
}

const lvar = logic.lvar
logic.lvar = function (name) {
  const variable = lvar(name)
  variable[Symbol.iterator] = function*() {
    yield list_spread(variable)
  }
  return variable
}
const list_spread = logic.list_spread = function (variable) {
  return { type: 'list_spread', variable }
}
function has_type(obj, type) {
  return (typeof obj==='object') && (typeof obj.type!=='undefined') && obj.type===type
}
const is_list_spread = logic.is_list_spread = function(v) {
  return has_type(v, 'list_spread')
}
