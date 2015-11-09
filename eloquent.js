function existy(x) {
  return x != null;
}

function truthy(x) {
  return (x !== false) && existy(x);
}

function power(base, exponent) {
  if (!existy(exponent)) exponent = 2;
  var result = 1;
  for (var count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
}
//3.2 Recursion
function isEven(n) {
  if (!existy(n) || n < 0) return 'use natural numbers please';
  if (n === 0) return true;
  else if (n === 1) return false;
  else return isEven(n - 2);
}

//3.3 Bean counting
function countBs(str) {
  var re = /[B]/g;
  var hits = str.match(re);
  return hits.length;
}

function countChars(str, char) {
  var re = new RegExp(char, 'g');
  return str.match(re).length;
}

var bs = 'BBC';
var ks = 'kakkerlak';

//4.2 Reversing an Array
function revArr(arr) {
  var result = [];
  var len = arr.length;
  for (var i = len - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}

function revArrInPlace(arr) {
  return arr.reverse();
}
var av = [1, 2, 3, 4, 5];

//4.3 A List
function prepend(value, list) {
  return {value: value, rest: list};
}

function arrToList(arr) {
  function _toList(list) {
    if (arr.length === 0) {
      return list;
    } else {
      return _toList(prepend(arr.pop(), list));
    }
  }

  return _toList(prepend(arr.pop(), null));
}

function listToArr(list) {
  function _toArr(arr, node) {
    if (!existy(node.rest)) {
      arr.push(node.value);
      return arr;
    } else {
      arr.push(node.value);
      return _toArr(arr, node.rest);
    }
  }

  return _toArr([], list);
}

function nth(list, index) {
  if (index === 0) {
    return existy(list) && list.value ? list.value : undefined;
  } else {
    return nth(list.rest, --index);
  }
}

//4.4 Deep Comparision
function deepEqual(x, y) {
  if (x === y) {
    return true;
  }

  if (!existy(x) || typeof x != 'object' || !existy(y) || typeof y != 'object') {
    return false;
  }

  var xKeys = Object.keys(x).length,
    yKeys = Object.keys(y).length;

  for (var k in x) {
    if (!(y.hasOwnProperty(k)) || !deepEqual(x[k], y[k])) {
      return false;
    }
  }

  return xKeys == yKeys;
}

//5.1 flattening (requires external data set)
var arrays = [[1, 2, 3], [4, 5], [6]];

function flatten(ars) {
  return ars.reduce(function(prev, cur) {
    return prev.concat(cur);
  });
}

console.log(flatten(arrays));

//5.2 Mother-child age difference
function ageDif(mother, child) { return child.born - mother.born; }

function mothers(p) {
  return existy(byName[p.mother]);
}

function ageAtBirth(p) { return ageDif(byName[p.mother], p); }

var ages = ancestry.filter(mothers).map(ageAtBirth);

console.log(average(ages));

//5.3 Historical life expectancy

function age(p) { return p.died - p.born; }

var groupBy = function(arr, fn) {
  var result = {};
  arr.forEach(function(person) {
    var key = fn(person);
    if (hasOwnProperty.call(result, key)) {
      result[key].push(age(person));
    } else {
      result[key] = [age(person)];
    }
  });
  return result;
};

var byCentury = groupBy(ancestry, function(person) {
  return Math.ceil(person.died / 100);
});

Object.keys(byCentury).forEach(function(k) {
  byCentury[k] = average(byCentury[k]);
});

for (var r in byCentury) {
  console.log(r + ': ' + byCentury[r]);
}

//6.1 A Vector Type

function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(v) {
  //sum vectors
  return new Vector(this.x + v.x, this.y + v.y);
};

Vector.prototype.minus = function(v) {
  //differ vectors
  return new Vector(this.x - v.x, this.y - v.y);
};

Object.defineProperty(Vector.prototype, 'length', {
  get: function() {
    //calc vector length
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
});

//6.2 Another Cell
function StretchCell(i, w, h) {
  this.inner = i;
  this.width = w;
  this.height = h;
}

StretchCell.prototype.minHeight = function() {
  return Math.max(this.height, this.inner.minHeight());
};

StretchCell.prototype.minWidth = function() {
  return Math.max(this.width, this.inner.minWidth());
};

StretchCell.prototype.draw = function() {
  return this.inner.draw(this.minWidth(), this.minHeight());
};

//6.3 Sequence Interface

function Sequence(arr) {
  this._sequence = arr;
}

Object.defineProperty(Sequence.prototype, '_isDone', {
  get: function() {
    return this._sequence.length === 0;
  }
});

Sequence.prototype.next = function() {
  if (!this._isDone) {
    return this._sequence.shift();
  }
  return false;
};

function ArraySeq(arr) {
  Sequence.call(this, arr);
}

ArraySeq.prototype = Object.create(Sequence.prototype);

function RangeSeq(from, to) {
  var range = [];
  for (var i = from; i <= to; i++) {
    range.push(i);
  }
  Sequence.call(this, range);
}

RangeSeq.prototype = Object.create(Sequence.prototype);

function logFive(seq) {
  for (var i = 0; i < 5; i++) {
    if (seq._isDone) {
      break;
    }
    console.log(seq.next());
  }
}

//10.1 Month Names

var month = function() {
  var names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June	',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  function name(n) {
    return names[n];
  }

  function number(name) {
    return names.indexOf(name);
  }

  return {
    name: name,
    number: number
  };
}();


