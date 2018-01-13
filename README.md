# Collection

Base collections, find intersections and diffs. Allows for explicit allowed type definitions.

## Getting started

### Installation

```
$ npm install --save @konfirm/collection
```

### Usage

```js
const Collection = require('@konfirm/collection');

const one = new Collection('a', 'b', 'c');
const two = new Collection('c', 'd', 'e');

//  create an intersection collection
const intersection = one.intersect(two);
console.log(intersection);  //  [ 'c' ];

//  create a difference collection
const difference = one.diff(two);
console.log(difference);  //  [ 'a', 'b', 'd', 'e' ]
```


## API
The `Collection` module extends [`Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array) and adds additional features.

### `Collection` (constructor)

Creates a new Collection from any number of elements or of the specified length in case the the only argument is a number.

```js
const Collection = require('@konfirm/collection');

//  empty
const one = new Collection();

//  provided items
const two = new Collection('a', 'b');

//  given length
const three = new Collection(10);
```

If the only argument passed to the `Collection` constructor is an integer (0 - 2^32-1), the value is treated a the length specification and creates a collection with empty slots (identical to [`Arrays`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array#Syntax)).
_NOTE: specifying a length does not in any way prevent the `Collection` to be limited to the length, it merely initializes the specified number of empty slots`


### `intersect(other, compare)`
Find the intersection (overlapping, common) elements of two collections

```js
const Collection = require('@konfirm/collection');

const one = new Collection('a', 'b', 'c');
const two = new Collection('c', 'd', 'e');

console.log(one.intersect(two));  //  [ 'c' ];
```

### `diff(other, compare)`
Find the elements from the Collection not present in the other

```js
const Collection = require('@konfirm/collection');

const one = new Collection('a', 'b', 'c');
const two = new Collection('c', 'd', 'e');

console.log(one.diff(two););  //  [ 'a', 'b' ]
console.log(two.diff(one););  //  [ 'd', 'e' ]
```

### `ALLOWED_TYPES`
A static readonly array specifying all of the allowed types for the collection. For the `Collection` module itself the array is empty, indicating any type of value is allowed.
The intended use for this member is to provide means in `Collection`-extends to easily ensure the only types within the collection are of a certain type.
Please refer to the [limiting allowed types](#limiting-allowed-types) section to learn how to control the allowed types.

### `isAllowed(potential)`
Determine whether the given value is of an allowed type as specified by the `ALLOWED_TYPES` value.
The `isAllowed` check is executed for all methods which add/change stored values, not for direct changes using the index assignment (e.g. `collection[0] = 'foo'` would still work on a collection only allowing for numbers)

## Extending
The `Collection` module is intended to be extended if its elements should be enforced to be of a certain type.

### Limiting allowed types
In order to limit the allowed types, the `ALLOWED_TYPES` member must be made to return the list of allowed types.

```js
const Collection = require('@konfirm/collection');

class DateCollection extends Collection {
	static get ALLOWED_TYPES() {
		return super.ALLOWED_TYPES.concat(Date);
	}
}

const datesOnly = new DateCollection();

//  this works
datesOnly.push(new Date('2018-01-13'));

//  this throws an Error
datesOnly.push('foo');
```

## Licence

MIT License

Copyright (c) 2018 Konfirm

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
