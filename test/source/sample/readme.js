/* global source, describe, it, expect */

const Collection = source('collection');
const DateCollection = require('../../extends/date-collection');

describe('README samples', () => {
	it('proves Usage', (next) => {
		const one = new Collection('a', 'b', 'c');
		const two = new Collection('c', 'd', 'e');

		//  create an intersection collection
		const intersection = one.intersect(two);
		expect(intersection).to.equal([ 'c' ]);

		//  create a difference collection
		const difference = one.diff(two);
		expect(difference).to.equal([ 'a', 'b' ]);

		next();
	});

	it('proves Constructor', (next) => {
		//  empty
		const one = new Collection();
		expect(one).to.be.length(0);

		//  provided items
		const two = new Collection('a', 'b');
		expect(two).to.be.length(2);

		//  given length
		const three = new Collection(10);
		expect(three).to.be.length(10);

		next();
	});

	it('proves Intersect', (next) => {
		const one = new Collection('a', 'b', 'c');
		const two = new Collection('c', 'd', 'e');

		//  create an intersection collection
		expect(one.intersect(two)).to.equal([ 'c' ]);

		next();
	});

	it('proves Diff', (next) => {
		const one = new Collection('a', 'b', 'c');
		const two = new Collection('c', 'd', 'e');

		expect(one.diff(two)).to.equal([ 'a', 'b' ]);
		expect(two.diff(one)).to.equal([ 'd', 'e' ]);

		next();
	});

	it('proves type limit example', (next) => {
		const datesOnly = new DateCollection();

		expect(datesOnly.push(new Date('2018-01-13'))).to.equal(1);
		expect(() => datesOnly.push('foo')).to.throw(Error, /^Not allowed/);

		next();
	});
});
